// Research.jsx
import { useEffect, useState } from 'react';
import { marked } from 'marked';

export default function Research() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/content/Research.md')        // file lives in /public/content
      .then(res => res.text())
      .then(text => setHtml(marked.parse(text)));
  }, []);

  return (
    <main style={{ padding: '1rem', marginLeft: '1rem' }} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
