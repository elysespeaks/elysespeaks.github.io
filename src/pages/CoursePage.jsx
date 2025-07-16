import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PasswordGate from '../components/PasswordGate';
import { marked } from 'marked';
import parse from 'html-react-parser';
import '../styles/course.css';

/*  Built‑in tab list (key = markdown filename) */
const tabs = [
  { key: 'description', label: 'Course description' },
  { key: 'syllabus',    label: 'Syllabus' },
  { key: 'contact',     label: 'Contact' },
  { key: 'grading',     label: 'Grading' },
  { key: 'links',       label: 'Useful links' },
];

export default function CoursePage() {
  /* ────────── router param ────────── */
  const { courseId } = useParams();

  /* ────────── password‑gate state ────────── */
  const [requiredPass, setRequiredPass] = useState(null);
  const [unlocked,     setUnlocked]     = useState(
    () => localStorage.getItem(`${courseId}-unlocked`) === '1'
  );

  /* check localStorage again if courseId changes */
  useEffect(() => {
    setUnlocked(localStorage.getItem(`${courseId}-unlocked`) === '1');
  }, [courseId]);

  /* fetch password.md only if not already unlocked */
  useEffect(() => {
    if (unlocked) return;
    fetch(`/content/${courseId}/password.md`)
      .then(r => (r.ok ? r.text() : null))
      .then(pass => setRequiredPass(pass))        // null → no gate
      .catch(() => setRequiredPass(null));
  }, [courseId, unlocked]);

  /* ────────── optional blue tint per course ────────── */
  useEffect(() => {
    if (courseId) {
      document.body.classList.add('blue-course');
    } else {
      document.body.classList.remove('blue-course');
    }
    return () => document.body.classList.remove('blue-course');
  }, [courseId]);

  /* ────────── title / tabs / content state ────────── */
  const [title, setTitle]   = useState(courseId || '');
  const [active, setActive] = useState(tabs[0].key);
  const [html,   setHtml]   = useState('<p>Loading…</p>');

  /* fetch course title once */
  useEffect(() => {
    if (!courseId) return;
    fetch(`/content/${courseId}/title.md`)
      .then(r => (r.ok ? r.text() : courseId))
      .then(t => setTitle(t.replace(/^#+\s*/, '').trim()))
      .catch(() => setTitle(courseId));
  }, [courseId]);

  /* fetch tab content whenever courseId or active changes */
  useEffect(() => {
    if (!courseId) return;
    fetch(`/content/${courseId}/${active}.md`)
      .then(r => (r.ok ? r.text() : '# Coming soon'))
      .then(md => {
        const heading = `<h2>${tabs.find(t => t.key === active).label}</h2>`;
        setHtml(heading + marked.parse(md));
      })
      .catch(() => setHtml('<p>Content unavailable.</p>'));
  }, [courseId, active]);

  /* ────────── show gate first, if needed ────────── */
  if (!unlocked && requiredPass) {
    return (
      <PasswordGate
        courseId={courseId}
        requiredPassword={requiredPass}
        onUnlock={() => setUnlocked(true)}
      />
    );
  }

  /* ────────── layout ────────── */
  return (
    <div className="course-layout">
      <div className="course-body">
        {/* LEFT column */}
        <aside className="course-aside">
          <h1 className="course-title">{title}</h1>

          <nav className="course-nav">
            {tabs.map(t => (
              <button
                key={t.key}
                className={
                  'course-tile' + (active === t.key ? ' is-active' : '')
                }
                onClick={() => setActive(t.key)}
              >
                <span className="tile-label">{t.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* RIGHT column */}
        <main className="course-main">
          <article>{parse(html)}</article>
        </main>
      </div>
    </div>
  );
}
