// LectureContent.tsx — рендер блоков контента
import React from 'react';
import type { ContentBlock } from '../../course/types';
import './LectureContent.css';

interface Props {
  blocks: ContentBlock[];
}

const LectureContentRenderer: React.FC<Props> = ({ blocks }) => {
  if (blocks.length === 0) {
    return (
      <div className="lecture-content-empty">
        <div className="lecture-content-empty-icon">📝</div>
        <p>Содержимое лекции пока пусто.</p>
      </div>
    );
  }

  return (
    <div className="lecture-content">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            if (block.level === 2) return <h2 key={i}>{block.text}</h2>;
            if (block.level === 3) return <h3 key={i}>{block.text}</h3>;
            return <h4 key={i}>{block.text}</h4>;

          case 'paragraph':
            return <p key={i}>{block.text}</p>;

          case 'list':
            return block.ordered ? (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );

          case 'note':
            return (
              <div
                key={i}
                className={`lecture-content-note ${block.variant}`}
              >
                {block.variant === 'warning' ? '⚠️ ' : 'ℹ️ '}
                {block.text}
              </div>
            );

          case 'highlight':
            return (
              <div key={i} className="lecture-content-highlight">
                {block.text}
              </div>
            );

          case 'image':
            return (
              <div key={i} className="lecture-content-image">
                <img src={block.url} alt={block.alt} />
                {block.alt && (
                  <div className="lecture-content-caption">{block.alt}</div>
                )}
              </div>
            );

          case 'svg':
            return (
              <div key={i} className="lecture-content-svg">
                <p style={{ color: '#7a8566', fontSize: '0.85rem' }}>
                  [SVG: {block.svgId}]
                </p>
              </div>
            );
          case 'html':
            return (
              <div
                key={i}
                className="lecture-content-html"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default LectureContentRenderer;