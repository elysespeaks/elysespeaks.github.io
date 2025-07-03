import { useEffect, useState } from 'react';

export default function Research() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/content/research.md')
      .then(res => res.text())
      .then(md => import('marked').then(m => setHtml(m.marked.parse(md))));
  }, []);

  return (
    <main className="prose mx-auto p-4" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
