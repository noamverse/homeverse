// Set 'published: true' to make a feature appear on the live Featured page.
// Set 'published: false' (or omit) to keep it as a draft.

// ── OPTIONAL FIELDS (any subset may be added to any entry) ───────────────────
// These fields are supported by the Family modal and render with graceful
// fallbacks — existing entries without them display cleanly.
//
//   company:    ""          Display name of the person's company
//   companyUrl: ""          URL for the company link in the modal
//   superpower:       ""          One-line descriptor of their defining gift/craft
//   location:   ""          City or region
//   socials: {
//     instagram: "",        Full URL (e.g. "https://instagram.com/handle")
//     linkedin:  "",
//     x:         "",
//     website:   "",
//   }
//
// Fields made optional (existing entries work without them):
//   body, excerpt, pullQuote, readTime, byline, category
// A lightweight entry needs only: slug, type, name, heroImage, published: true

export const features = [

  // ── FOUNDER SPOTLIGHT ────────────────────────────────────────────────────────
  {
    slug: "placeholder-founder-spotlight",
    type: "founder",
    status: "featured",
    published: false,
    name: "[Founder Name]",
    title: "[Role], [Company]",
    publishedDate: "2026-04-21",
    readTime: "7 min read",
    category: "FOUNDER PROFILE",
    byline: "Profile by Noam Polinger",
    excerpt:
      "[Opening paragraph of the feature article — a few sentences that draw the reader into who this person is and why they are worth knowing. Keep the tone warm and editorial.]",
    pullQuote:
      "[A short resonant quote from the founder that captures their relational philosophy.]",
    heroImage: "/images/features/placeholder.jpg",
    body: [
      "This is a placeholder for the first paragraph of the feature. The editorial voice of HOME is warm, precise, and unhurried — a portrait that respects both the subject and the reader.",
      "A second paragraph would explore the founder's origin story: not the résumé version, but the real one. What made them start? What were they refusing to become?",
      "The third paragraph would turn toward the work itself — not what it does, but what it means. Why does this company exist at this moment, and why does it matter that a human being made it?",
      "A closing paragraph would leave the reader with something to carry. A tension, an image, a question. HOME features do not resolve neatly. They linger.",
    ],
  },

  // ── FOUNDER ROWS ─────────────────────────────────────────────────────────────
  {
  slug: "jose-virella",
  type: "founder",
  status: "standard",
  published: true,
  name: "Jose Virella",
  title: "The Man Behind the Lens",
  publishedDate: "2026-04-29",
  readTime: "6 min read",
  category: "FOUNDER",
  excerpt: "Jose's Superpower: The ability to see and bring to life the story within any human being.",
  pullQuote: "'I'm a steward, building with what I've been trusted with.'",
  heroImage: "/images/features/jose-virella-headshot.png",
  heroImageWide: "/images/features/jose-feature.png",
  company:    "Samson Videography",          
  companyUrl: "https://samsonvideography.com/",          
  superpower: "The ability to see and bring to life the story within any human being.",         
  location:   "Headquartered in Tampa, Florida",          
socials: {
     instagram: "https://www.instagram.com/joselvirella/",        
     linkedin:  "https://www.linkedin.com/in/jose-l-virella-1b46a436a/",
   },
  body: [
    "There is a particular kind of person you only recognize once you've spent time around them. Quiet at first. Reserved. Easy to potentially overlook in a room full of louder voices selling louder things. And then, slowly, you notice the work. You notice that every frame they shoot is composed like a sentence in a sermon. You notice that they don't have the most 'followers', don't 'brand' much, don't perform much — and yet the people they work with come back, and come back, and come back. You notice that they never once told you how good they are, because they didn't need to.",
    "Jose Virella is that person. He is the founder of Samson Videography — though calling Samson a videography company is a bit like calling a cathedral 'just a building'. Technically, it's true. Functionally it doesn't begin to describe the full story. Out of Tampa, Jose has been quietly building a body of work that has reached coaches, consultants, and ministry leaders across the country and the world, including some of the biggest names in their categories. He wouldn't tell you that part. He'd tell you he serves people who have a message and need help bringing it to life. Which is true. It is also a profound understatement.",
    "Ask him who he is, and he doesn't lead with the camera. 'I'm Jose,' he says. 'A man of God who seeks the Lord daily and carries a deep hunger to fund His Kingdom.' For Jose, the work and the faith are the same fabric, woven from the same thread. He frames his craft in the language of stewardship: he doesn't own his talent, he says. He's been trusted with it. Every project he takes on is, in his eyes, a small accounting of what he's done with what he's been given. That posture — almost monastic in its seriousness — is what makes the work hit the way it does. You can FEEL it before you can name it.",
    "The texture of his current season, in his own words, is 'quiet but intense.' There is, he says, a sense of being shaped in the unseen more than the seen. Of being refined. He describes a strange and beautiful inner combination: hunger and peace at once. The hunger of someone who knows there is more ahead. The peace of someone who is no longer trying to prove anything. At eighteen, he believed his quietness meant he lacked something. He has spent the years since learning that the quietness was never actually a deficit, because instead it was the room he was being built in.",
    "What he is building, on the surface, is a videography practice that serves leaders and creators who carry messages too important to leave underdeveloped. He talks about coaches and entrepreneurs and ministries who arrive at his door at the moment when there is a visible gap between their vision and their visibility — they know they are called to more, but they may lack the time, the structure, or the execution to translate that calling into something the world can actually see. Jose closes that gap. With speed, and efficiency. With a refusal to compromise on what he calls the level he knows he's called to operate at.",
    "But what he is really building is something larger, and it is worth saying out loud because Jose may not always say it himself. He is building infrastructure for people whose work matters. He is building the visual and narrative scaffolding that allows leaders to be properly seen — not in the empty sense of attention, but in the substantive sense of message, weight, and reach. He is building, in his words,'systems and people I've trained helping fund Kingdom work globally, with resources flowing into churches, missions, and leaders who are actually changing lives.' Read that sentence again. That is the founding statement of an institution, not a freelancer's vision.",
    "He is dangerous in his industry — though he wouldn't use that word — because he refuses the central lie of his field. The lie is that content is about volume. That the answer is always more, faster, louder, shinier. Jose has experienced otherwise. He does not need to chase the trends. He does not flood feeds with fluff. He thinks about the message and the identity behind the person before he ever picks up a camera, and the camera is only ever an instrument of that message. Most people in his industry are technicians, Jose is a translator. The work feels different on the screen because it was treated differently in the making.",
    "Ask him what he refuses to compromise on, and the answer is immediate: integrity and excellence. He has walked away from money rather than produce work he doesn't stand behind. He has chosen to lose opportunities rather than violate HIS world-class standard. There is, in him, an old-fashioned conviction about craftsmanship — the kind of conviction that built guilds and apprenticeships and named saints after their tools. He talks about discipline that holds when no one is watching. He talks about excellence as obedience. These are not the words of someone optimizing a personal brand. They are the words of someone who believes the work is being witnessed by something larger than an algorithm.",
    "Of all the things in the interview, one line stays with you longest. Jose says he is 'still in the process of becoming.' He says he doesn't see himself as someone who has it all figured out. He frames it as humility, and it is. But it is also, quietly, the most accurate thing anyone could say about a person at the beginning of something significant. The people who arrive at altitude already declaring themselves arrived rarely go further. The people who keep saying I am still becoming are usually the ones who are just getting started. And between you and I, Jose is MUCH further along than he will ever give himself credit for.",
    "If Jose's work fully succeeds (and it will) — if the seed of what he is building reaches its full size — the picture is enormous. A studio that becomes an institution. A global practice that documents the work of leaders whose messages deserve to be properly carried into the world. A network of trained craftspeople who multiply the standard he holds. Resources flowing back into the causes and people he cares about. A quiet empire, which is the only kind worth building. He would not describe it in those words. But the architecture is already there in his answers, in his DNA, hiding in plain sight, waiting for someone to point at it and say: that is what you're actually doing.",
    "When asked what came up reading the line life is a family, not a marketplace, Jose said it reminded him that everything he is building should be rooted in relationship, stewardship, and genuine care for people. That he never wants to lose sight of humanity in the process of building business. That he wants to serve people first, with integrity and respect, rather than viewing them through the lens of exchange. It is the cleanest articulation of HOME's mission we have heard from someone outside our walls. It is also, simply, how Jose actually works. Ask anyone who has ever sat across from him on a project. The relational posture isn't a marketing position. It's the man.",
    "There is something to learn from people like Jose, especially in a season where the loudest voices win the most attention and the most attention is mistaken for the most value. The quiet ones — the disciplined ones, the ones who refine in private and refuse to compromise in public — are often the ones whose work outlasts the cycle. They are building institutions while the rest of the industry builds singular storefronts. And one day, the people who paid attention only to the storefronts will look up and notice the skyline has changed, and they will not quite be able to name when it happened.",
    "Jose Virella is one of the people changing the skyline. He may not always see it yet. That's fine. The work sees it. The people he serves see it. And anyone who reads this, and then watches what he does over the next decade, will see it too.",
  ]
},

  {
  slug: "ted-koontz",
  type: "founder",
  status: "standard",
  published: true,
  name: "Ted Koontz",
  title: "The Quiet Operator",
  publishedDate: "2026-04-29",
  readTime: "5 min read",
  category: "FOUNDER",
  excerpt: "Ted's Superpower: The ability to keep going, to never give up, to never quit, ever.",
  pullQuote: "'You can be anything—but only if you're willing to do what most won't. Hard work isn't optional. It's the price of becoming.'",
  heroImage: "/images/features/ted-koontz.png",
  heroImageWide: "/images/features/ted-koontz-feature.png",
  company:    "Red's Team Sports",          
  companyUrl: "https://redsteamsports.com/?srsltid=AfmBOopsx87hEGFp95qFsa_OO9-vHXVDsGxvGe9Y5vxZkXXiBcezoBJW",          
  superpower: "The ability to keep going, to never give up, to never quit, ever.",         
  location:   "Headquartered in Tampa, Florida",          
socials: {
     instagram: "https://www.instagram.com/redsteamsports",        
     linkedin:  "https://www.linkedin.com/in/tfkoontz",
   },
  body: [
    "Ted Koontz prefers to be underestimated. He says it like it's a strategy, but listen long enough and you realize it's also a temperament — a way of moving through the world that has, until now, kept him quietly building one of the more impressive vertically integrated operations you've now heard of. Apparel, signs, awards, branded merchandise. Multiple companies under one umbrella, all of them growing, none of them needing to yell to the masses. Ted says he's 'just a guy.' He says it the way men who have built things from nothing tend to say it — with a smile and a confidence that knows better.",
    "Ted is approaching sixty. He has grandchildren. He has worked his way up from a kid who paid his own way through college, did his time enlisted and as an officer, and never once let himself believe the floor was solid until the day he hit his first million, and even then… He keeps going. 'I knew in the back of my head I could always go back to the corporate world if I had to,' he says of those early years. 'Once I hit the million mark I knew I was going to be okay, and then there's never been a doubt since.' That sentence is the whole shape of him. Belief, then certainty, then the long quiet work of compounding.",
    "What changed isn't the work. What changed is that he's letting himself talk about it.",
    "Ask him what he's actually building and he won't give you a drawn out mixture of titles and words. He'll tell you, plainly, that he's building a one-stop shop for customers who deserve better service than they're getting — high-quality products and services that make his clients' brands look great. The sentence is unadorned. There is no missionary language, or transformation rhetoric, no claims about saving the world. 'At the end of the day, we aren't curing cancer or sending a rocket ship into space,' he says. His customers want quality, on time, with someone they can call when something goes sideways. Consistency + excellence. That's it. And somehow, in an industry he describes as full of mom-and-pops being slowly crushed by consolidating vendors and Wall Street's recent discovery of his sector, that humility is exactly what makes him dangerous.",
    "His philosophy is zigging when everyone else is zagging, a foundation that forges the top 1% of entrepreneurs who understand that intuition, imagination, and creativity are what create real PROGRESS. He shares this philosophy with his team the way a professional sports coach says it — part philosophy, half instruction. Ted is constitutionally allergic to satisfaction. New things: always. Reinvention: always. The market shifts and he shifts with it, sometimes ahead of it. 'Too many people get comfortable and they slowly fall away in my opinion.' He has watched it happen. He is determined not to be one of them, and he won't be.",
    "There is a pillar he learned early and has never let go of: don't lie, don't cheat, don't steal, and don't tolerate others who do. It is the kind of operating principle that sounds like a Hallmark line until you watch a man actually live by it for decades. When you ask what he refuses to compromise on, this is the answer. Everything else is negotiable. This is not.",
    "The person he says is most irreplaceable is not technically on the team at all, and yet she's THE most important member. It's his wife. She is, in his words, the key behind the success in reality. Everyone needs someone who can call them out for their foolishness, he says — love them in spite of their failures, kick them in the butt when they need it. The way he talks about her is the way men of his generation talk about the people who actually held the whole thing together while the world gave them the credit. A trait that we see dwindling in today's younger generations. There's a particular kind of honesty in it. He knows. And he wants you to know that he knows.",
    "Ted is not overly religious, but his faith is strong, as evidenced by his values and his operations, and in the last year or so he has become more open about it. This is part of the lifting of the head. He doesn't need to preach to people. He just also no longer needs to pretend that he doesn't believe.",
    "When you ask what success looks like in ten years, he doesn't talk about valuation. He has a number  — but he immediately undercuts it with a question. At what cost? He wants his customers cared for before anything else. He wants his staff to feel that the company cares about them. He wants his family together. He wants to continue developing the younger generation so he can step into the role he's earned: mentor. 'I think that would be called success.' It is one of the most quietly radical definitions of the word you'll hear from a founder with his level of experience.",
    "There is something he had to unlearn to get here. The intensity that built the first million doesn't necessarily serve the next decade. He has been working, he says, on keeping his cool, staying composed, and not taking things so seriously. It is the kind of admission most men in his position would never make on the record, and yet something we can all better institute better within ourselves. He has no fear in talking about his experiences casually, almost as an aside, the way someone tells you about the weather.",
    "When the phrase life is a family, not a marketplace is put in front of him, he doesn't flinch. Family, for him, is everything — and not in the airbrushed sense. 'Family isn't always perfect or clean or even always loving,' he says. 'But family means we will pull together and forget our issues when we have to.' He has three of them, by his own count. The one he was born into. The staff he's built. The customers he's chosen to keep close. He cares about their success, he says, as much as he cares about his own. In his category of business — one that has been ground down by transactional pricing and commoditized fulfillment, THIS is the moat. He is in the relationship business. He tells his team this constantly. BUILD RELATIONSHIPS. Be problem solvers. He lights up when a client calls and asks if he can help them with something outside the original scope. That's the work. That's the whole point.",
    "So why come into the light now, after four decades of preferring the shadows? His answer is honest in a way that is rare in features like this one. 'In all honesty, this is all new to me.' He has kept his head down. He hasn't asked for or sought attention, contrary to today's 'attention-based' transactional society. He has never really worried about being seen. But he feels, finally, that the work and the impact are good enough to be talked about — and that maybe the community deserves to know that there are still operators out there who give a damn. 'If you aren't using us,' he says, 'then you probably aren't being treated as well as you could be.' It's the closest thing to a sales line he'll deliver in the entire conversation, and he says it almost reluctantly, as if the marketing department made him. Because in all honesty he doesn't need to say it, you'll see the difference from the moment you shake Ted's hand.",
    "What Ted Koontz reminds us — and what HOME exists in part to honor — is that there is a generation of operators who built quietly, served loyally, impacted us greatly, and never asked for the spotlight, and that the world is poorer for not having heard from them. He is one of the last of a particular kind: a man who came up the long way, kept his word, took care of the people in his orbit, and is now, in the season of grandchildren and reflection, ready to share what he's learned. Not because he needs anything. Because there is a lifetime of wisdom worth passing on.",
    "He will tell you he prefers to be underestimated. We are choosing not to oblige him. We estimate Ted to be one of the pillars of American business, and his success serves as an example to the world of what is possible.",
  ]
},
  
    {
  slug: "jade-rouby",
  type: "founder",
  status: "standard",
  published: true,
  name: "Jade Rouby",
  title: "L'Affranchie",
  publishedDate: "2026-05-12",
  readTime: "6 min read",
  category: "FOUNDER",
  excerpt: "Jade’s Superpower: The ability to think beyond, to envision and imagine what is possible and pull that out of others.",
  pullQuote: "'I'm not careful. I have an absolute, measured conviction that this mission is mine. Not because I chose it — because it chose me.'",
  heroImage: "/images/features/jade-rouby.png",
  heroImageWide: "/images/features/jade-rouby-feature.png",
  company:    "Feroce AI",          
  companyUrl: "https://app.feroceai.com/",          
  superpower: "The ability to think beyond, to envision, and imagine what is possible and pull that out of others.",         
  location:   "Headquartered in San Francisco, CA",          
socials: {
     instagram: "https://www.instagram.com/jaderouby/",        
     linkedin:  "https://www.linkedin.com/in/jade-rouby-podcast-ceo",
   },
  body: [
"There is a particular thing Jade Rouby said that the rest of this conversation has to be read against. A mentor she respected told her the next step for her first company was to sign contracts at corporate dinners. And something inside her, she says, went completely quiet.",
"That sentence is the whole story. Most twenty-three-year-old founders would have heard the advice, swallowed the quiet, and gone to the dinner. Jade Rouby dissolved the company.",
"Jade is French. She is twenty-three. And she lives in San Francisco now, in a season she describes as running on a tightrope with no net below and the most breathtaking view above. She moved to a country that does not yet know her name, with almost nothing, and decides every morning to show up anyway. The texture of her life right now, she says, is 'the constant tension between fear and faith' — not knowing where she'll sleep next month, while pitching the future of preventive health to investors who've seen it all. It is, in her own words, beautiful and brutal. It is the hardest thing she's ever done. And yet, she would not trade it for anything.",
"What Jade is building is called Feroce AI. The pitch-deck version is an innovative pocket health copilot — an AI agent that takes your sleep, your meals, your blood work, and tells you, in real time, where the bottleneck is in your life and what to do about it. The version she'd tell you at brunch is gentler and more accurate. Feroce, she says, is not something you download, it is something you become. To be feroce about your life. To stop waiting for the system to notice you before you notice yourself. Powerful, and profound.",
"The deck version explains a market. The brunch version explains a person.",
"Jade lost her mother to cancer. She lost her brother to cancer. Both times, she says, she could not stop thinking the same question: 'what if we had caught it earlier?' What if someone, or something, had been paying attention before it was too late? Preventive health was not accessible to them, and it is still not accessible to most people. She does not say this with the practiced cadence of a founder who has rehearsed her origin story, or spent years being trained in investor vernacular. She says it the way someone says something they have lived inside of for years. 'I'm not building Feroce because of a market opportunity. I refuse to let that be someone else's story.'", 
"This is the part the rest of the world will need a few years to understand about her. There is a difference between a founder who has identified a problem, and a founder who has been carved by one. The first is competent. The second is inevitable. Jade does not yet seem to know which one she is. She talks about herself like someone who is sometimes still auditioning for the role — 'I have to rebuild myself more than once,' she says; 'I'm still scared,' she says; 'every day, of disappointing people I love, of running out of money, of building something that doesn't matter.'  These feelings are natural for anyone who is transforming the world. But Jade doesn't need to audition for anybody. She got the part the day her conviction stopped being a choice.",
"What makes her dangerous, in her own assessment, is that she has nothing to lose. No safety net. No plan B. No way back. Most founders in her space, she observes, are smart, well-funded, careful. 'I'm not careful.' It is the single most accurate diagnostic any founder has ever offered about themselves. Carefulness is what happens when you still believe there is a softer life waiting on the other side of failure. Jade does not believe this. She has been on the other side of failure already, more than once, at an age when most of her peers have not yet lost anything that cannot be replaced. The version of her life that included a softer landing has already been lived and survived. What remains is the part she actually wants.",
"She talks, with unusual clarity for someone her age, about what she has had to unlearn in order to build what she is building. 'The hardest thing…' she says, 'was the belief that you can do everything alone.' Asking for help felt like admitting she wasn't enough. Reaching out felt like weakness. Depending on anyone felt dangerous. She is starting to understand that every breakthrough she has had — every door, every problem solved — came from letting someone in. There is something underneath this admission that is worth noticing. Most founders unlearn self-reliance because they finally trust other people. Jade is unlearning it because she has decided that the mission is bigger than her. These are not the same thing. The second is rarer, and it is what makes someone able to build something that outlives them.",
"The user she and Feroce AI serve is not a demographic. She refuses, with a kind of editorial precision, to describe them that way. 'My users aren't a demographic, they're a feeling.' The person who wakes up tired after eight hours of sleep and doesn't know why. The one who feels something is off but every doctor calls their results normal. The young professional, too busy, too overwhelmed, too disconnected to even book an appointment. 'They do not hate their health,' she says. 'They just don't understand it.' They've stopped trying to because every tool they have found either talks down to them, drowns them in data, or hands them generic advice that was never meant for them. What brings them to Feroce is a quiet frustration. The feeling that they deserve better than guessing. That their body has been trying to tell them something, and no one has helped them listen.",
"It is one of the more humane descriptions of a consumer that has been written in a long time. It is also, not coincidentally, a description of the girl she used to be — before she decided she was the person who would build the thing she needed.",
"On the question of family, Jade is honest in a way that most founders do not yet have the language for. Family is ambiguous for her, she says. She has one, and yet feels she never had one. She lost most of them. The ones who remain never quite taught her what the word was supposed to mean. So she built her own. First with herself — 'with my own presence toward myself' — and then with her friends. Now, she suspects, life is the practice of building your own family. Not running transactions on a marketplace. Giving love to every person, to improve the world together. Relational culture, in her business, looks like this: she knows her users by name. When someone signs up for Feroce, she does not see a metric or a unit of MRR. She sees a person who trusted her with something deeply personal. She does not believe in professional distance. She believes in showing up fully and creating space for others to do the same.",
"Read those two paragraphs back to back. The girl who never quite had a family is building a company designed to receive people the way she wished she had been received. The wound and the work are the same shape. This is not a coincidence, nor is it branding. This is the structure of every important company that has ever existed.",
"There is a sentence she dropped near the end of the conversation, almost in passing, the way people do when they don't yet realize they are speaking the truest thing in the conversation: 'If you're reading this and you feel too small, too young, too foreign, too different, too anything, please don't wait for permission. I'm 23, French, alone in the US, building in a category most people thought was impossible. None of that should have worked on paper. But here I am.'", 
"Jade Rouby does not yet know how rare and special she is. She does not yet know that the people who win at the scale she is going to win at are almost always the ones who lived more in their first quarter-century than most people live in a lifetime, who lost early and refused to be made small by the losing, who arrived in a strange city with almost nothing because the version of life that included a safety net had already disqualified itself as a place worth returning to. She does not yet know that the things she lists as her worries, worries we all have had in our lifetimes — too young, too foreign, too intense, too different — are not bugs in her positioning. They are the entire reason she will build what she is going to build. The world cannot be saved from inside the consensus that broke it. It is saved by people who do not fit it. Jade is one of those individuals. Feroce is one of those companies.",
"The image she carries for herself as her vision, she describes, is of a mother taking the stage one day and saying to her: 'Thank you. Because of your product, you saved my son.' That is what she is building toward. A world where no one has to lose someone they love to something that could have been prevented. Her mother and brother did not have that. The next generation, she has decided, will.",
"There is a particular thing that happens when you meet someone whose conviction is older than their company. You stop talking to them like a founder and start talking to them like a person who has already arrived somewhere the rest of us are still walking toward. The mistake the world will make about Jade Rouby is to call her promising, or to alienate her because she doesn’t fit the mold. The accurate word to describe Jade is inevitable. She has not yet caught up to her own trajectory. She will. The conversation she had with that mentor — the one that went completely quiet inside her — was not the moment she chose the path. It was the moment the path became impossible to leave.",
"If there was one line Jade would want attributed to her, if this feature were the only thing anyone ever read about her, is one sentence: 'You are the writer of your own story.' It is the kind of line that gets diluted by overuse in a culture that loves to print it on tote bags. In her mind, returned to its actual weight, it means something different. It means: I lost the people who would have written it for me. I refused the version that other people tried to hand me. I moved across an ocean to write the one that is mine. And if you are reading this and feel like the pen is too heavy, pick it up anyway. There is no permission coming. There never was.",
"That is the part the eighteen-year-old Jade could not have imagined. Not the company, not the city, not the courage. The realization that the permission she spent years waiting for was never going to arrive — because it was hers to give all along.",
"Jade Rouby is going to win. In fact, she’s already won. She does not yet know it the way she is going to know it. That is fine. The people who win the largest are almost always the last to find out, because they are too busy doing the work to look up. The rest of us, the ones lucky enough to be paying attention this early, get to watch it happen.",
"Welcome to the part where the story turns.",

  ]
},

  {
  slug: "cleandy-gomez",
  type: "founder",
  status: "standard",
  published: true,
  name: "Cleandy Gomez",
  title: "The Machine",
  publishedDate: "2026-06-24",
  readTime: "5 min read",
  category: "FOUNDER",
  excerpt: "Cleandy’s Superpower: Super speed and efficiency.",
  pullQuote: "'Strong opinions, loosely held. Fortune favors the bold.'",
  heroImage: "/images/features/cleandy-gomez.png",
  heroImageWide: "/images/features/cleandy-gomez-feature.png",
  company: "Pomodoro Capital Group",
  companyUrl: "https://pomodoroinvests.com/",
  superpower: "Super speed and efficiency across all facets of business and life.",
  location: "Headquartered in Tampa, Florida",
  socials: {
    instagram: "https://www.instagram.com/cleandyg/",
    linkedin: "https://www.linkedin.com/in/cleandy-gomez-84676b129/",
  },
  body: [],
},
  
  // ── COMPANY SPOTLIGHT ────────────────────────────────────────────────────────
  {
    slug: "placeholder-company-spotlight",
    type: "company",
    status: "featured",
    published: false,
    name: "[Company Name]",
    title: "[Sector] · [Tagline]",
    publishedDate: "2026-04-20",
    readTime: "7 min read",
    category: "COMPANY SPOTLIGHT",
    byline: "Profile by Noam Polinger",
    excerpt:
      "[Opening paragraph of the feature — what this company is building, why it stands apart, and why HOME is amplifying it now. Editorial tone, not promotional.]",
    pullQuote:
      "[A short resonant line that captures the company's relational signature.]",
    heroImage: "/images/features/placeholder.jpg",
    body: [
      "This is a placeholder for the first paragraph of the company feature. The editorial voice here is warm and discerning — a portrait that explains not just what a company does, but why it matters.",
      "A second paragraph would explore the founding moment: the gap they saw, the assumption they refused to make, the bet they placed on people over process.",
      "The third paragraph would look at traction — not as metrics, but as evidence of resonance. Who came first? Why did they stay?",
      "A closing paragraph would situate the company inside a larger shift — the move from transactional to relational, from extractive to generative.",
    ],
  },

  // ── COMPANY ROWS ─────────────────────────────────────────────────────────────
  {
    slug: "placeholder-company-one",
    type: "company",
    status: "standard",
    published: false,
    name: "[Company Name]",
    title: "[Sector] · [Tagline]",
    publishedDate: "2026-04-14",
    readTime: "5 min read",
    category: "COMPANY SPOTLIGHT",
    byline: "Profile by Noam Polinger",
    excerpt:
      "[One-line description of the company and what makes it worth knowing.]",
    pullQuote: "[A resonant one-line quote about this company.]",
    heroImage: "/images/features/placeholder.jpg",
    body: [
      "Placeholder first paragraph for this company feature. A quiet company doing something important.",
      "A second paragraph about their model: not just how they make money, but how they make sense.",
      "A closing paragraph with an image that sticks.",
    ],
  },
  {
    slug: "placeholder-company-two",
    type: "company",
    status: "standard",
    published: false,
    name: "[Company Name]",
    title: "[Sector] · [Tagline]",
    publishedDate: "2026-04-08",
    readTime: "6 min read",
    category: "IN CONVERSATION",
    byline: "Profile by Noam Polinger",
    excerpt:
      "[One-line description of the company and what makes it worth knowing.]",
    pullQuote: "[A resonant one-line quote about this company.]",
    heroImage: "/images/features/placeholder.jpg",
    body: [
      "Placeholder first paragraph for this company feature. A conversation with the founders about the thing they almost didn't build.",
      "A second paragraph where the company's theory of belonging becomes clear.",
      "A closing paragraph that earns the reader's attention rather than demanding it.",
    ],
  },
  {
    slug: "placeholder-company-three",
    type: "company",
    status: "standard",
    published: false,
    name: "[Company Name]",
    title: "[Sector] · [Tagline]",
    publishedDate: "2026-04-02",
    readTime: "5 min read",
    category: "BUILDER",
    byline: "Profile by Noam Polinger",
    excerpt:
      "[One-line description of the company and what makes it worth knowing.]",
    pullQuote: "[A resonant one-line quote about this company.]",
    heroImage: "/images/features/placeholder.jpg",
    body: [
      "Placeholder first paragraph for this company feature. Builders in a space where no one expected a builder.",
      "A second paragraph on the category they are creating rather than entering.",
      "A closing paragraph on the room they are trying to make for others.",
    ],
  },
  {
    slug: "placeholder-company-four",
    type: "company",
    status: "standard",
    published: false,
    name: "[Company Name]",
    title: "[Sector] · [Tagline]",
    publishedDate: "2026-03-25",
    readTime: "5 min read",
    category: "NEW THIS WEEK",
    byline: "Profile by Noam Polinger",
    excerpt:
      "[One-line description of the company and what makes it worth knowing.]",
    pullQuote: "[A resonant one-line quote about this company.]",
    heroImage: "/images/features/placeholder.jpg",
    body: [
      "Placeholder first paragraph for this company feature. New this week — a company we found through relationship, not a pitch deck.",
      "A second paragraph explaining what makes this company relational at its core.",
      "A closing paragraph that leaves the reader with something to watch.",
    ],
  },

];

export default features;
