// Writing. One entry per post, newest first.
//
// Content is structured blocks rather than Markdown on purpose: this site is a
// static export with no Markdown dependency, and adding one would put a build
// step between a typo and a live fix. Blocks render through PostBody.js.
//
// Inline markup inside `text`, handled by PostBody:
//   `code`   → inline code
//   **bold** → strong
//
// Block types: h2 · h3 · p · code · ul · ol · note

export const posts = [
  {
    slug: 'offline-first-deduplication',
    title: 'Six inspections, twelve records',
    subtitle:
      'What it actually takes to stop an offline queue from duplicating a day of fieldwork.',
    date: '2026-11-23',
    dateLabel: '23 November 2026',
    readingTime: '8 min read',
    tags: ['Offline-first', 'Postgres', 'SQLite', 'Idempotency', 'React Native'],
    description:
      'A caretaker logs six hive inspections with no signal. Naive sync produces twelve records. The two-layer idempotency pattern that fixes it, from a system in beta.',
    content: [
      {
        type: 'p',
        text: 'A caretaker walks an apiary with no mobile signal. He checks six hives over two days, photographs each one, marks each as fine, watch or problem. On the third day he walks back into coverage and his phone syncs.',
      },
      {
        type: 'p',
        text: 'If you write the obvious version of that sync, the owner opens the dashboard and sees twelve inspections. Or eight. Some number that is not six.',
      },
      {
        type: 'p',
        text: 'This is the part of offline-first that gets skipped. "Works offline" usually means "queues writes locally", and queueing is the easy half. The hard half is that the queue has to survive a network that fails **mid-request** — where the server committed the write and the response never came back. The phone cannot tell that apart from a request that never arrived, so it retries, and now the truth depends on which failure actually happened.',
      },
      {
        type: 'p',
        text: 'Here is how NyukiWatch handles it. It is a hive-monitoring system I build at Senvallas, currently in beta.',
      },

      { type: 'h2', text: 'The queue is a table, not an array' },
      {
        type: 'p',
        text: 'The outbox is a SQLite table on the device, not an in-memory list:',
      },
      {
        type: 'code',
        lang: 'sql',
        code: `create table if not exists outbox (
  id text primary key,
  kind text not null,
  payload_json text not null,
  photo_local_uri text not null,
  submitted_at text not null,
  attempts integer not null default 0,
  last_error text,
  state text not null default 'queued'
)`,
      },
      { type: 'p', text: 'Two things matter here.' },
      {
        type: 'p',
        text: '`state` moves `queued → uploading → committed`, or to `failed` with `attempts` incremented and `last_error` recorded. A row left in `uploading` when the app dies is recoverable on next launch, because the state is on disk. An in-memory queue loses that distinction and you retry blind.',
      },
      {
        type: 'p',
        text: 'And reads are `order by submitted_at asc`. The caretaker’s six inspections reach the server in the order he made them, not the order the network happened to allow.',
      },

      { type: 'h2', text: 'The key comes from the client' },
      {
        type: 'p',
        text: 'The outbox row’s primary key **is** the idempotency key. It is generated on the device at enqueue time and sent as a header:',
      },
      {
        type: 'code',
        lang: 'ts',
        code: `await createCheckIn({
  apiaryId: item.apiaryId,
  hiveId: item.hiveId,
  photoKey,
  status: item.status,
  submittedAt: item.submittedAt,
  idempotencyKey: item.id,
});`,
      },
      {
        type: 'p',
        text: 'This is the whole trick, and it has to be client-generated. A server-generated id is useless for deduplication, because the client only learns it from a response — and the case you are defending against is precisely the one where no response arrives.',
      },

      { type: 'h2', text: 'Two layers, because one is not enough' },
      { type: 'h3', text: 'Layer one: an application-level replay cache' },
      {
        type: 'code',
        lang: 'sql',
        code: `create table if not exists idempotency_keys (
  user_id uuid not null references users(id) on delete cascade,
  key text not null,
  request_hash text not null,
  response_status integer not null,
  response_body jsonb not null,
  created_at timestamptz not null default now(),
  primary key (user_id, key)
);`,
      },
      {
        type: 'p',
        text: 'It stores the **response**, not just the key. A replay with the same key and the same body gets the original response back, byte for byte, and no second row is written. The client cannot tell its retry from a first attempt, which is the point — it does not need to.',
      },
      {
        type: 'p',
        text: 'The `request_hash` earns its place in the failure case. Same key, **different** body means the client has reused a key for a different write, and that is a bug, not a retry. So it fails loudly:',
      },
      {
        type: 'code',
        lang: 'ts',
        code: `if (idempotent.request_hash !== requestHash) {
  throw new AppError("conflict", "Idempotency key was reused for a different request", 409);
}`,
      },
      {
        type: 'note',
        text: 'Silently returning the old response there would be the worst outcome available: the caretaker’s second inspection vanishes and everyone sees a success.',
      },

      { type: 'h3', text: 'Layer two: the database' },
      {
        type: 'code',
        lang: 'sql',
        code: `create unique index if not exists check_ins_idempotency_idx
  on check_ins (caretaker_id, client_idempotency_key)
  where client_idempotency_key is not null;`,
      },
      {
        type: 'p',
        text: 'A partial unique index, scoped per caretaker. If two requests with the same key race past the application check — two sync loops, or a retry overlapping a slow first attempt — Postgres refuses the second one. The application layer is the fast path; this is the one that is actually load-bearing. I would rather return a constraint violation than keep a duplicate.',
      },

      { type: 'h2', text: 'When it happened is not when it arrived' },
      { type: 'p', text: 'The check-in row keeps the two times apart:' },
      {
        type: 'code',
        lang: 'sql',
        code: `submitted_at timestamptz not null default now(),   -- when the caretaker recorded it
created_at   timestamptz not null default now(),   -- when the server stored it`,
      },
      {
        type: 'p',
        text: '`submitted_at` comes off the device. `created_at` is the server’s own clock. Three days can separate them and both are true.',
      },
      { type: 'p', text: 'Every read index is built on event time, not arrival time:' },
      {
        type: 'code',
        lang: 'sql',
        code: `create index check_ins_hive_time_idx      on check_ins (hive_id, submitted_at desc);
create index check_ins_caretaker_time_idx on check_ins (caretaker_id, submitted_at desc);`,
      },
      {
        type: 'p',
        text: 'Collapse those two columns into one and you lose the ability to answer "was this hive checked on Tuesday?" — which is the only question the owner actually asks.',
      },

      { type: 'h2', text: 'Media uploads get their own phase' },
      {
        type: 'p',
        text: 'A check-in carries a photo, and the photo is the expensive part. So it commits in two phases: upload the file, write the returned key back into the queued payload, **then** post the check-in.',
      },
      {
        type: 'code',
        lang: 'ts',
        code: `photoKey = upload.key;
runSql("update outbox set payload_json = ?, state = 'queued' where id = ?", [nextPayload, item.id]);`,
      },
      {
        type: 'p',
        text: 'A crash between the two does not re-upload. The row comes back as `queued` with `photoKey` already filled in, and the retry skips straight to the cheap call. On a metered connection in the field this is the difference between a sync that finishes and one that does not.',
      },

      { type: 'h2', text: 'What I would change' },
      {
        type: 'p',
        text: 'Writing this up made three things obvious that were not while I was building it.',
      },
      {
        type: 'p',
        text: '**`queued_at` is dead.** The column is declared on `check_ins` and selected in the insert’s `returning` clause — and never written. It is `NULL` on every row. I meant to capture the moment a submission entered the outbox, which would have given me the queue latency for free. Right now I cannot tell a check-in that synced instantly from one that sat on a phone for three days without comparing `submitted_at` to `created_at`, which conflates queue time with clock skew.',
      },
      {
        type: 'p',
        text: '**The key is a timestamp and a random number.** `${Date.now()}-${random}`, not a UUID. It is scoped per user by the primary key, which makes a collision very unlikely rather than impossible. There is no reason not to use UUIDv7 and I will change it.',
      },
      {
        type: 'p',
        text: '**`submitted_at` trusts the device clock.** A phone with a wrong date writes a wrong event time, and nothing downstream questions it. The honest fix is to record both the device clock and the clock offset observed at sync, so a bad timestamp is at least detectable later. I have not built that.',
      },

      { type: 'h2', text: 'The pattern travels' },
      {
        type: 'p',
        text: 'The same shape went into harvest records later without redesign — same client-supplied key, same partial unique index on `(recorded_by, client_idempotency_key)`. That reuse is the actual return on getting it right once.',
      },
      {
        type: 'p',
        text: 'And both paths have replay tests, which is the only way I would trust any of this: posting the same key twice and asserting the response does not change, and asserting a reused key with a different body gets a 409.',
      },

      { type: 'h2', text: 'The short version' },
      { type: 'p', text: 'If you are building for intermittent connectivity:' },
      {
        type: 'ol',
        items: [
          '**Generate the dedupe key on the client.** The server cannot help you here.',
          '**Store the response, not just the key.** A replay should be indistinguishable from a first attempt.',
          '**Reject a reused key with a different body.** Loudly. Do not swallow it.',
          '**Put a unique constraint behind the application check.** The race is real.',
          '**Keep event time and arrival time in separate columns.** Index on event time.',
          '**Commit expensive uploads in their own phase**, so a retry does not re-send them.',
        ],
      },
      {
        type: 'p',
        text: 'None of this is novel. All of it is the difference between six records and twelve.',
      },
    ],
  },
];

export const getPostBySlug = (slug) => posts.find((post) => post.slug === slug) || null;
