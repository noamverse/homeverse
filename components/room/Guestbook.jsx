"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Guestbook({ desk, hideTrigger = false, open: openProp, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = hideTrigger ? openProp : internalOpen;
  const setOpen = hideTrigger ? (onOpenChange ?? (() => {})) : setInternalOpen;
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const reduce = useReducedMotion();

  const handleChange = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
  };

  const handleToggle = (name, option) => {
    setValues((v) => {
      const current = Array.isArray(v[name]) ? v[name] : [];
      return {
        ...v,
        [name]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const toggleOpen = () => {
    navigator.vibrate?.(14);
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const honeypot = e.target.elements._gotcha?.value ?? "";
    if (honeypot) return; // client-side honeypot check

    setStatus("submitting");

    try {
      // Separate top-level fields (name, email, city) from answers
      const topKeys = new Set(desk.fields.filter((f) => f.top).map((f) => f.name));
      const topLevel = {};
      const answers = {};
      for (const [k, v] of Object.entries(values)) {
        if (topKeys.has(k)) topLevel[k] = v;
        else answers[k] = v;
      }

      const payload = {
        room: desk.tag,
        ...topLevel,
        answers,
        source: typeof window !== "undefined" ? window.location.pathname : null,
        _h: honeypot, // server-side honeypot check
      };

      const res = await fetch("/api/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "request failed");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const renderField = (field) => {
    if (field.type === "select") {
      const selected = values[field.name] ?? null;
      return (
        <div className="guestbook__pills">
          {field.options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`guestbook__pill${selected === opt ? " is-selected" : ""}`}
              onClick={() =>
                setValues((v) => ({ ...v, [field.name]: v[field.name] === opt ? null : opt }))
              }
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (field.type === "multiselect") {
      const selected = Array.isArray(values[field.name]) ? values[field.name] : [];
      return (
        <div className="guestbook__pills">
          {field.options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`guestbook__pill${selected.includes(opt) ? " is-selected" : ""}`}
              onClick={() => handleToggle(field.name, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          id={field.name}
          name={field.name}
          required={field.required}
          value={values[field.name] || ""}
          onChange={handleChange(field.name)}
        />
      );
    }

    return (
      <input
        type={field.type}
        id={field.name}
        name={field.name}
        required={field.required}
        value={values[field.name] || ""}
        onChange={handleChange(field.name)}
      />
    );
  };

  return (
    <div
      className={hideTrigger ? `guestbook${open ? " guestbook--modal" : ""}` : "guestbook depth-layer"}
      style={hideTrigger ? undefined : { "--depth": 0.75 }}
      onClick={hideTrigger ? (e) => e.target === e.currentTarget && toggleOpen() : undefined}
    >
      {!hideTrigger && (
        <button
          type="button"
          className={`guestbook__book${open ? " is-open" : ""}`}
          aria-label={open ? "Close the guestbook" : "Open the guestbook"}
          aria-expanded={open}
          onClick={toggleOpen}
        >
          <span className="guestbook__book-glow" aria-hidden="true" />
          <span className="guestbook__book-spine" aria-hidden="true" />
          <span className="guestbook__hint">{desk.eyebrow}</span>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="guestbook__panel"
            initial={{ opacity: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.97 }}
            transition={{ duration: reduce ? 0.2 : 0.5, ease: "easeOut" }}
          >
            {hideTrigger && (
              <button
                type="button"
                className="guestbook__dismiss"
                aria-label="Close the guestbook"
                onClick={toggleOpen}
              >
                &times;
              </button>
            )}

            {status === "success" ? (
              <p className="guestbook__status guestbook__status--ok">{desk.confirmation}</p>
            ) : (
              <form className="guestbook__form" onSubmit={handleSubmit}>
                <div className="guestbook__field guestbook__field--honeypot" aria-hidden="true">
                  <label htmlFor="_gotcha">Leave this empty</label>
                  <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                <h2 className="guestbook__heading">{desk.heading}</h2>

                {desk.fields.map((field) => (
                  <div className="guestbook__field" key={field.name}>
                    <label htmlFor={field.type !== "multiselect" ? field.name : undefined}>
                      {field.label}
                    </label>
                    {renderField(field)}
                  </div>
                ))}

                <div className="guestbook__actions">
                  <button
                    type="submit"
                    className="guestbook__submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending…" : desk.submitLabel}
                  </button>
                  <button type="button" className="guestbook__close" onClick={toggleOpen}>
                    Close
                  </button>
                </div>

                {status === "error" && (
                  <p className="guestbook__status guestbook__status--error">
                    Something went wrong. Write to us directly —{" "}
                    <a href="mailto:hello@homeverse.family">hello@homeverse.family</a>
                  </p>
                )}
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
