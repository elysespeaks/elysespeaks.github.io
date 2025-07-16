import { useState } from 'react';

/**
 * Simple modal‑style gate.
 * props:
 *   courseId          – string
 *   requiredPassword  – string  (null → gate not shown)
 *   onUnlock()        – callback when password was correct
 */
export default function PasswordGate({ courseId, requiredPassword, onUnlock }) {
  const [entry, setEntry]   = useState('');
  const [wrong, setWrong]   = useState(false);

  if (requiredPassword == null) return null;            // no gate needed

  const check = () => {
    if (entry.trim() === requiredPassword.trim()) {
      localStorage.setItem(`${courseId}-unlocked`, '1');
      onUnlock();
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="gate-overlay">
      <div className="gate-box">
        <h2>Please enter the course password (you'll only have to do this once per device):</h2>
        <input
          type="password"
          value={entry}
          onChange={e => setEntry(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && check()}
        />
        <button onClick={check}>Submit</button>
        {wrong && <p className="gate-error">Sorry, that’s not it. If you've forgotten the password, contact espeaks@nd.edu.</p>}
      </div>
    </div>
  );
}
