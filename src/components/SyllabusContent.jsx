// components/SyllabusContent.jsx
import { marked } from 'marked';
import parse, { domToReact } from 'html-react-parser';

// helper: recursively collect all plain text from an HTML‑parser node
function getNodeText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.data || '';
  if (node.children) return node.children.map(getNodeText).join('');
  return '';
}

/** Render syllabus Markdown and merge rows for “break”, “section”, and “due date”. */
export default function SyllabusContent({ markdown, headingHtml = '' }) {
  // 1. Convert raw Markdown → HTML
  const rawHtml = marked.parse(markdown);

  // 2. Parse HTML and transform special rows and links
  return parse(headingHtml + rawHtml, {
    replace(node) {
      // Always open all <a> links in a new tab
      if (node.name === 'a' && node.attribs && node.attribs.href) {
        return (
          <a
            {...node.attribs}
            href={node.attribs.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {domToReact(node.children)}
          </a>
        );
      }

      // Table row merging logic (existing)
      if (node.name === 'tr') {
        /* ───── gather real <td>/<th> cells in this row (skip stray #text) ───── */
        const cells = node.children.filter(
          ch => ch.type === 'tag' && (ch.name === 'td' || ch.name === 'th')
        );
        if (cells.length === 0) return;

        const firstCell = cells[0];

        /* cue lookup */
        const cueText = getNodeText(firstCell).trim().toLowerCase();
        let type = null;
        if (cueText.includes('section'))      type = 'courseSection';
        else if (cueText.includes('break'))   type = 'semesterBreak';
        else if (cueText.includes('due date')) type = 'dueDate';
        if (!type) return;                    // ordinary row → leave untouched

        /* text / markup from the SECOND cell becomes the merged content */
        const secondCell = cells[1];                        // may be undefined
        const mergedContent = secondCell
          ? domToReact(secondCell.children)
          : null;

        /* how many columns in this table? */
        const colCount =
          node.parent?.children
            ?.find(tr => tr.name === 'tr')         // first data row
            ?.children.filter(
              ch => ch.type === 'tag' && (ch.name === 'td' || ch.name === 'th')
            ).length || 1;

        /* build the single merged row */
        return (
          <tr className={type}>
            <td colSpan={colCount}>{mergedContent}</td>
          </tr>
        );
      }
      // For all other nodes, do not replace
      return undefined;
    },
  });

}
