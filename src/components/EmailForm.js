"use client";

import { useState } from "react";

export default function EmailForm() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, text }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Email sent successfully!");
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </label>
      <label>
        Subject:
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
      </label>
      <button type="submit">Send Email</button>
      {message && <p>{message}</p>}
    </form>
  );
}
