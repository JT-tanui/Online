import React from 'react';
import styles from '../styles/Blog.module.css';

// Inline markup: `code` and **bold**. Parsed into React nodes rather than set
// as HTML, so post content can never inject markup into the page.
const INLINE = /(`[^`]+`|\*\*[^*]+\*\*)/g;

const renderInline = (text) => {
  if (!text) return null;

  return text.split(INLINE).map((piece, index) => {
    if (!piece) return null;

    if (piece.startsWith('`') && piece.endsWith('`') && piece.length > 2) {
      return (
        <code key={index} className={styles.inlineCode}>
          {piece.slice(1, -1)}
        </code>
      );
    }

    if (piece.startsWith('**') && piece.endsWith('**') && piece.length > 4) {
      return <strong key={index}>{piece.slice(2, -2)}</strong>;
    }

    return <React.Fragment key={index}>{piece}</React.Fragment>;
  });
};

// Headings get ids so individual sections are linkable.
const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const PostBody = ({ content = [] }) => (
  <div className={styles.postBody}>
    {content.map((block, index) => {
      switch (block.type) {
        case 'h2':
          return (
            <h2 key={index} id={slugify(block.text)} className={styles.h2}>
              {renderInline(block.text)}
            </h2>
          );

        case 'h3':
          return (
            <h3 key={index} id={slugify(block.text)} className={styles.h3}>
              {renderInline(block.text)}
            </h3>
          );

        case 'code':
          return (
            <pre key={index} className={styles.codeBlock} data-lang={block.lang || ''}>
              <code>{block.code}</code>
            </pre>
          );

        case 'note':
          return (
            <aside key={index} className={styles.note}>
              {renderInline(block.text)}
            </aside>
          );

        case 'ul':
          return (
            <ul key={index} className={styles.list}>
              {(block.items || []).map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ul>
          );

        case 'ol':
          return (
            <ol key={index} className={styles.list}>
              {(block.items || []).map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ol>
          );

        case 'p':
        default:
          return (
            <p key={index} className={styles.paragraph}>
              {renderInline(block.text)}
            </p>
          );
      }
    })}
  </div>
);

export default PostBody;
