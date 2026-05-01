// TODO: Replace all placeholder content with real stories as they are published.
// The first story in the array renders as the featured story on the Stories index.
// Remaining stories populate the curated collection and reading paths.

export const stories = [

  // ── FEATURED STORY ───────────────────────────────────────────────────────────
  {
    slug: "placeholder-story-featured",
    kind: "dispatch",
    title: "[Featured Story Title]",
    publishedDate: "2026-04-21",
    readTime: "8 min read",
    category: "DISPATCH",
    byline: "By Noam Polinger",
    excerpt:
      "A defining editorial dispatch from the HOME ecosystem — framing the emotional climate around serious work. This placeholder will be replaced with the first real story.",
    heroImage: "/images/stories/placeholder.jpg",
    body: [
      "This is a placeholder for the opening paragraph of the featured story. The editorial voice of HOME is unhurried, warm, and precise — writing that holds its own weight without performing urgency.",
      "A second paragraph would carry the argument forward. Not a thesis statement, but a pressure — a feeling the reader recognizes before they can name it.",
      "The third paragraph would deepen the frame. Evidence, observation, a detail gathered from somewhere real.",
      "A fourth paragraph might widen the aperture — from the particular to the pattern. This is where HOME essays tend to find their altitude.",
      "A closing paragraph that lands without resolving. Something to carry. A question more than an answer.",
    ],
  },

  // ── CURATED COLLECTION ───────────────────────────────────────────────────────
  {
    slug: "placeholder-story-reflection-one",
    kind: "reflection",
    title: "[Founder Story Title]",
    publishedDate: "2026-04-16",
    readTime: "7 min read",
    category: "REFLECTION",
    byline: "By Noam Polinger",
    excerpt:
      "A founder portrait about the rooms institutions create and the moral texture of welcome.",
    heroImage: "/images/stories/placeholder.jpg",
    body: [
      "This is a placeholder for the first paragraph of a founder reflection. A close portrait — not a profile, but a reckoning with what it means to build a room for others.",
      "A second paragraph where the founder's inner life becomes visible. The doubt they don't talk about in public. The thing that keeps them at the table.",
      "A third paragraph that asks: what kind of institution do they want to be? Not as a values statement, but as a daily practice.",
      "A closing paragraph that earns the reader's care rather than demanding it.",
    ],
  },
  {
    {
  slug: "the-shift-from-prompting-ai-to-operating-intelligence",
  kind: "essay",
  title: "The Shift From Prompting AI to Operating Intelligence",
  publishedDate: "2026-05-02",
  readTime: "5 min read",
  category: "ESSAY",
  byline: "By Noam Polinger",
  excerpt:
    "Why the future belongs to builders who can architect intelligence, not just prompt it.",
  heroImage: "/images/stories/ai-prompting-story.png",
  body: [
    "Everyone thinks the AI revolution is about asking better questions. It is not. That was the obvious layer. The first floor of a building most people will never finish climbing.",

    "You open the model. You type. It answers. You feel the magic. Then you ask a follow-up and realize the model doesn't carry the room with it. You build something for users and they sit watching a spinner for twenty seconds before the answer lands all at once. You ask for clean structured output and you get an apology, a paragraph, and a code block. You test a prompt once, ship it, and real humans destroy it the next morning with the kind of messy, sideways, beautifully chaotic input that no script ever predicted.",

    "That moment is the door, and most people never walk through it. The ones who do stop seeing AI as a product and start seeing it for what it actually is.",

    "AI is not the product. The world AROUND the AI is the product.",

    "This is the same lesson I keep relearning in everything I build. The model is never the thing. The environment you put it in is the thing. The relationships, the rules, the rituals, the boundaries, the taste — that is what makes intelligence usable. Without that, you have a brilliant mind sitting in a featureless white box, useful for parlor tricks, basic searches, and not much else.",

    "The future does not belong to people who know how to prompt. It belongs to people who know how to operate intelligence.",

    "A serious AI product is built on the basics — keys, models, messages, token limits. But even the basics are deeper than the syntax. The key is permission; the model is the mind you're calling; The message is intent. The limit is the boundary of response. None of it is magic. All of it is architecture.",

    "If you want continuity, you build memory. If you want speed, you stream. If you want safety, you keep the keys on the server, never in the hands of a user who didn't ask to carry them. If you want consistent answers, you lower the temperature. If you want clean output, you don't ask politely — you design the room so the model has no choice but to give it to you.",

    "This is where most people misread the era. They think quality is a function of the model's intelligence. It isn't. It is a function of the environment the intelligence is placed inside.",

    "The prompt matters. BUT, the prompt is not enough. A prompt that worked once has proven almost nothing. Real users are chaos. They misspell, contradict, abandon, return. The only way to know whether a prompt actually works is to evaluate it under fire. Generate test cases. Run them. Grade the output. Ask not just for a score but for the reasoning behind the score. Find where the system breaks. Build it back stronger.",

    "That is the line between playing with AI and building with it.",

    "But the deeper shift happens the moment the model stops being a text generator and becomes an agent. By itself, a language model can only think. It can't read your files, touch your code, query your database, click through an interface, send a message, or do anything in the world. For that, it needs tools. Tools are how intelligence gets hands.",

    "And the second intelligence has hands, the entire design problem changes.",

    "Now you are not writing prompts. You are designing permissions. You are designing feedback loops. You are deciding what the model can see, what it can touch, what it can change, and what it must never go near. You are doing the work of a builder, an architect, and a parent all at once.",

    "This is why MCP — the Model Context Protocol — is not just another acronym in the alphabet soup. It is a standard. A clean way to plug intelligence into the world without rebuilding the wiring every single time. Tools do things. Resources reveal information. Prompts carry reusable instructions. A document is a resource. A 'summarize this' button is a tool. A pre-tested formatting instruction is a prompt. Three categories. The beginning of an architecture.",

    "And once you go deeper — into Claude Code, into project-level memory, and into hooks that intercept what the model is allowed to read before it reads it — you stop being someone who uses AI and start being someone who governs it. Plan mode for breadth. Thinking mode for depth. Memory files at different scopes. Custom commands that turn repeated work into ritual. Hooks that protect the things that should never be touched.",

    "Now it becomes governance. The more powerful intelligence becomes, the more important boundaries become. Not because we distrust it. Because serious builders respect power.",

    "This is the real story right now. It’s not chatbots or prompt hacks. And it’s not 'ten ways to get better answers from your AI.' The real story is the shift from prompting models to operating intelligent systems.",

    "The winners of this era will understand that every AI product is a living stack of decisions: context, memory, streaming, security, temperature, files, caching, tools, evals, resources, prompts, permissions, hooks, feedback loops. The model is the mind. The architecture is the body. And without a body, the mind cannot move through the world.",

    "The next great companies will not be built by people who simply ask AI to do things. They will be built by people who give AI a world to operate inside. A world with rules. A world with memory. A world with tools. A world with standards. A world with taste. A world with boundaries. A world where intelligence is not a party trick but infrastructure.",

    "That is the new builder literacy. Not 'can you use Claude?' Everyone can use Claude. Anyone can build anything now. The real question is whether you can design the environment in which Claude becomes useful, reliable, fast, safe, measurable, and excellent.",

    "That is the line. Between consumer and creator. Between prompt user and system architect. Between playing with intelligence and building with it.",

    "The revolution is not that AI can answer us. The revolution is that we can finally build operating systems around intelligence itself. And the people who understand that early are not chasing the future. They're already living in it.",
  ],
},

  {
    slug: "placeholder-story-essay-one",
    kind: "essay",
    title: "[Essay Title]",
    publishedDate: "2026-04-09",
    readTime: "9 min read",
    category: "ESSAY",
    byline: "By Noam Polinger",
    excerpt:
      "An essay on relationship, belonging, and the refusal of audience logic.",
    heroImage: "/images/stories/placeholder.jpg",
    body: [
      "This is a placeholder for the opening of an essay. The essay form at HOME is slower and more exploratory than a dispatch — it earns its length.",
      "A second paragraph where the argument begins to form. Not a claim, but a pressure — a thing the writer is trying to hold in language.",
      "A third paragraph that admits a complication. Good essays don't resolve too easily.",
      "A fourth paragraph that opens up rather than closes down. The reader is trusted.",
      "A closing paragraph that leaves the essay open — a door rather than a wall.",
    ],
  },
  {
    slug: "placeholder-story-reflection-two",
    kind: "reflection",
    title: "[Long-form Portrait Title]",
    publishedDate: "2026-04-08",
    readTime: "10 min read",
    category: "REFLECTION",
    byline: "By Noam Polinger",
    excerpt:
      "A long-horizon piece about patronage, time, and protecting institutions that deserve to deepen.",
    heroImage: "/images/stories/placeholder.jpg",
    body: [
      "This is a placeholder for the opening of a long-form reflection. Long-horizon pieces at HOME take their time. They trust the reader to stay.",
      "A second paragraph that establishes the stakes — not dramatically, but clearly. Something is being protected here. Something matters.",
      "A third paragraph that introduces an unexpected angle. The piece has found its real subject.",
      "A fourth paragraph where the argument reaches its deepest point. The reader is somewhere they didn't expect to be.",
      "A closing paragraph that settles rather than summarizes. The reader leaves with more than they arrived with.",
    ],
  },

];

export default stories;
