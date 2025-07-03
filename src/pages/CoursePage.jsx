// src/pages/CoursePage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { marked } from "marked";
import "../styles/course.css";

const tabs = [
  { key: "description", label: "Course description" },
  { key: "syllabus",    label: "Syllabus" },
  { key: "contact",     label: "Contact" },
  { key: "grading",     label: "Grading" },
  { key: "links",       label: "Useful links" },
];

export default function CoursePage() {
  const { courseId } = useParams();
  const [title, setTitle] = useState(courseId);
  const [active, setActive] = useState("description");
  const [html,   setHtml]  = useState("<p>Loading…</p>");

  /* fetch course title once */
  useEffect(() => {
    fetch(`/content/${courseId}/title.md`)
      .then(r => r.ok ? r.text() : courseId)
      .then(t => setTitle(t.replace(/^#+\s*/, "").trim()))
      .catch(() => setTitle(courseId));
  }, [courseId]);

  /* fetch tab content */
  useEffect(() => {
    fetch(`/content/${courseId}/${active}.md`)
      .then(r => r.ok ? r.text() : "# Coming soon")
      .then(md => {
        const heading = `<h2>${tabs.find(t => t.key === active).label}</h2>`;
        setHtml(heading + marked.parse(md));
      })
      .catch(() => setHtml("<p>Content unavailable.</p>"));
  }, [courseId, active]);

  return (
    <div className="course-layout">
      {/* full-width title bar */}
      <header className="course-header">
        <h1>{title}</h1>
      </header>

      {/* side+main grid */}
          <div className="course-body" >
        <nav className="course-nav" style={{ marginTop: '1.6rem' }} >
          {tabs.map(t => (
            <button
              key={t.key}
              className={
                "course-tile" + (active === t.key ? " is-active" : "")
              }
              onClick={() => setActive(t.key)}
            >
              <span className="tile-label">{t.label}</span>
            </button>
          ))}
        </nav>

        <main className="course-main" style={{marginLeft: '2rem', marginTop: '1rem'}}>
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </main>
      </div>
    </div>
  );
}
