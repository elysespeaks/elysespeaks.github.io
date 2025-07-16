import { FaRegFilePdf, FaLink } from "react-icons/fa";

const baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  borderRadius: "8px",
  background: "#f8f9fa",
  color: "#333",
  boxShadow: "0 1px 3px rgba(0,0,0,0)",
  transition: "transform 0.2s, box-shadow 0.2s, color 0.2s",
  textDecoration: "none",
  marginRight: "0.5rem"
};

const hoverIn = (e) => {
  e.currentTarget.style.transform = "scale(1.05)";
  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.25)";
};

const hoverOut = (e) => {
  e.currentTarget.style.transform = "scale(1)";
  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0)";
};

// 🟥 PDF icon link
export function PDFIconLink({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...baseStyle, color: "#e63946" }} // red accent
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      title="Open PDF"
    >
      <FaRegFilePdf size={16} />
    </a>
  );
}

// 🔗 Generic chain-style link
export function ChainIconLink({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...baseStyle, color: "#03A9F4" }} // blue accent
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      title="Open Link"
    >
      <FaLink size={14.5} />
    </a>
  );
}

// ✅ Optionally, you can export them together
export default function LinkIconsExample() {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <PDFIconLink href="/files/example.pdf" />
      <ChainIconLink href="https://example.com" />
    </div>
  );
}
