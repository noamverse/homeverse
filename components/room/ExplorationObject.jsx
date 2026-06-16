import Link from "next/link";

export default function ExplorationObject({ label, title, body, href }) {
  const content = (
    <>
      <p className="exploration-object__label">{label}</p>
      <h3 className="exploration-object__title">{title}</h3>
      <p className="exploration-object__body">{body}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="exploration-object">
        {content}
      </Link>
    );
  }

  return (
    <article className="exploration-object" tabIndex={0}>
      {content}
    </article>
  );
}
