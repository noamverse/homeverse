export const rooms = {
  belong: {
    slug: "belong",
    title: "Belong",
    eyebrow: "THE LIVING ROOM",
    welcome: "Come in. The fire's already going.",
    signature: "Come be received.",
    identityBody:
      "This is the room at golden hour — low light, gathered voices, a table that's already set. There's no performance here, nothing to prove. Just the strange relief of being seen without having to shrink.",
    exploration: [
      {
        label: "For",
        title: "Belonging",
        body: "Being received without shrinking. Without earning it first.",
      },
      {
        label: "Happens",
        title: "Gatherings",
        body: "Dinners, fellowship chapters, the kind of evenings that turn into family.",
      },
      {
        label: "Who belongs",
        title: "Anyone seeking it",
        body: "Anyone seeking to be truly received. Meet the family already here.",
        href: "/family",
      },
      {
        label: "Bring",
        title: "Just yourself",
        body: "Your presence is the invitation. That's the whole ask.",
      },
    ],
    desk: {
      eyebrow: "THE GUESTBOOK",
      heading: "Sign the guestbook.",
      tag: "belong",
      submitLabel: "Be received",
      confirmation: "You've been received. We'll be in touch.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "alive", label: "What makes you alive?", type: "textarea", required: false },
        { name: "city", label: "City (optional)", type: "text", required: false },
      ],
    },
  },
};
