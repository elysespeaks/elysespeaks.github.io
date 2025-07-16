// src/pages/Research.jsx
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import parse from 'html-react-parser';
import { PDFIconLink, ChainIconLink } from '../components/LinkIcons';
import './Research.css'; 

export default function Research() {
  const [rawHtml, setRawHtml] = useState('');

  useEffect(() => {
    fetch('/content/Research.md')
      .then(res => res.text())
      .then(text => {
        // ensure your marked is not sanitizing away custom tags:
        setRawHtml(marked.parse(text));
      });
  }, []);

  // parse the HTML string into React elements,
  // replacing our custom tags with real components
  const content = parse(rawHtml, {
    replace: (node) => {
      // only look at element nodes
      if (node.type === 'tag') {
        if (node.name === 'pdficonlink') {
          // <PDFIconLink href="…" />
          const href = node.attribs.href;
          return <PDFIconLink href={href} />;
        }
        if (node.name === 'chainiconlink') {
          const href = node.attribs.href;
          return <ChainIconLink href={href} />;
        }
      }
    }
  });

return (
  <main id="research-page" style={{ padding: '1rem', marginLeft: '1rem' }}>
    {content}
  </main>
);

}
