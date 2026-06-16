"use client";

import { useState } from "react";

export default function ReceptionDesk({ desk }) {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.elements._gotcha?.value) return; // honeypot tripped

    setStatus("submitting");
    try {
      const res = await fetch("/api/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag: desk.tag, ...values }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="reception-desk" aria-label="Reception desk">
        <div className="room-section">
          <div className="reception-desk__inner">
            <p className="reception-desk__status reception-desk__status--ok">
              {desk.confirmation}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reception-desk" aria-label="Reception desk">
      <div className="room-section">
        <div className="reception-desk__inner">
          <p className="reception-desk__eyebrow">{desk.eyebrow}</p>
          <h2 className="reception-desk__heading">{desk.heading}</h2>

          <form className="reception-desk__form" onSubmit={handleSubmit}>
            <div className="reception-desk__field reception-desk__field--honeypot" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this empty</label>
              <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </div>

            {desk.fields.map((field) => (
              <div className="reception-desk__field" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={handleChange(field.name)}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={handleChange(field.name)}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="reception-desk__submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : desk.submitLabel}
            </button>

            {status === "error" && (
              <p className="reception-desk__status reception-desk__status--error">
                Something went wrong. Write to us directly —{" "}
                <a href="mailto:hello@homeverse.family">hello@homeverse.family</a>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
