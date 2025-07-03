import "../styles/site.css";

export default function Home() {
  return (
    <main
    style={{
      padding: "1rem",
      marginLeft: "1rem",
      fontSize: "1.1rem",
      lineHeight: 1.4,        // ← relative (unitless) & roomier
    }}
  >
    <h1 style={{ marginBlock: "0 0.6rem" }}>Elyse Speaks</h1>
  
          <p></p>
    <p style={{ margin: "0 0 0.4rem" }}>Director of Undergraduate Studies</p>
  <p></p>
    <p style={{ margin: "0 0 0.4rem" }}>
      Department of Art, Art History and Design<br />
      University of Notre Dame<br />
      306 Riley Hall<br />
      Notre Dame, IN&nbsp;46556
    </p>
  <p></p>
    <p style={{ margin: "0 0 0.4rem" }}>
      <span className="muted">office</span><br />
      307 Decio<br />
      574&nbsp;631&nbsp;9673
    </p>
  <p></p>
    <p style={{ margin: 0 }}>
              <a href="mailto:espeaks@nd.edu">email</a><br />
              <a href="addlink">CV</a>
    </p>
  </main>
  
  );
}
