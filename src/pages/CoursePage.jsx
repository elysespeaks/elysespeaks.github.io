import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PasswordGate from '../components/PasswordGate';
import { marked } from 'marked';
import parse from 'html-react-parser';
import '../styles/course.css';
import SyllabusContent from '../components/SyllabusContent';


/*  Built‑in tab list (key = markdown filename) */
const tabs = [
  { key: 'description', label: 'Course description' },
  { key: 'syllabus',    label: 'Syllabus' },
  { key: 'contact',     label: 'Contact' },
  { key: 'grading',     label: 'Grading' },
  { key: 'links',       label: 'Useful links' },
];

// Helper – first try /content/{courseID}/…, then fall back to /content/archive/{courseID}/…
function fetchCourseFile(courseID, file) {
  const primary  = `/content/${courseID}/${file}`;
  const fallback = `/content/archive/${courseID}/${file}`;

  // fetch the file only if it really is Markdown (not the SPA HTML fallback)
  const getIfMarkdown = url =>
    fetch(url).then(async res => {
      if (!res.ok) return null;                // network / 404 error
      const text = await res.text();           // dev server 404s still return 200 + index.html
      return text.trim().startsWith('<')       // HTML → not our Markdown
        ? null
        : text;
    });

  // try live folder first; if that fails, fall back to archive
  return getIfMarkdown(primary).then(
    text => (text !== null ? text : getIfMarkdown(fallback))
  );
}


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
   fetchCourseFile(courseId, 'password.md')
  .then(pass => setRequiredPass(pass))          // null → no gate
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
    fetchCourseFile(courseId, 'title.md')
  .then(t => {
    if (!t) return courseId;                    // nothing found anywhere
    return t.replace(/^#+\s*/, '').trim();      // strip leading “# ”
  })
  .then(setTitle)
  .catch(() => setTitle(courseId));

  }, [courseId]);

  /* fetch tab content whenever courseId or active changes */
/* fetch tab content whenever courseId or active changes */
useEffect(() => {
  if (!courseId) return;

  fetchCourseFile(courseId, `${active}.md`)
    .then(md => setHtml(md || '# Coming soon'))
    .catch(() => setHtml('# Content unavailable.'));
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
  <article>
    {active === 'syllabus'
      ? <SyllabusContent markdown={html} headingHtml={`<h2>Syllabus</h2>`} />
      : parse(`<h2>${tabs.find(t => t.key === active).label}</h2>` + marked.parse(html))
    }
  </article>
</main>

      </div>
    </div>
  );
}
