import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { marked } from 'marked';

const tabs = [
  { key: 'description', label: 'Course Description' },
  { key: 'syllabus',    label: 'Syllabus' },
  { key: 'grading',     label: 'Grading' },
  { key: 'contact',     label: 'Contact' },
  { key: 'links',       label: 'Useful Links' },
];

export default function CoursePage() {
  const { courseId } = useParams();        // e.g. "ARHI13182"

  const [title, setTitle] = useState(courseId);
  const [active, setActive] = useState('description');
  const [html,   setHtml]   = useState('<p>Loading…</p>');

  /* 1️⃣  Fetch course title once */
  useEffect(() => {
    fetch(`/content/${courseId}/title.md`)
      .then(r => r.ok ? r.text() : courseId)
      .then(t => setTitle(t.replace(/^#+\s*/, '').trim()))  // strip leading '#'
      .catch(() => setTitle(courseId));
  }, [courseId]);

  /* 2️⃣  Fetch the selected tab every time it changes */
  useEffect(() => {
    fetch(`/content/${courseId}/${active}.md`)
      .then(r => r.ok ? r.text() : '# Coming soon')
      .then(md => setHtml(marked.parse(md)))
      .catch(() => setHtml('<p>Content unavailable.</p>'));
  }, [courseId, active]);

  return (
    <main style={{ padding: '1rem' }}>
      <h1>{title}</h1>

      {/* menu */}
      <nav style={{ marginBottom: '1rem' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              marginRight: '.5rem',
              padding: '.4rem .8rem',
              border: '1px solid #999',
              background: active === t.key ? '#0070f3' : '#eee',
              color: active === t.key ? '#fff' : '#000',
              cursor: 'pointer',
            }}>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Markdown-rendered content */}
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
