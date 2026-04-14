# HOME

HOME is a premium global media platform built with Next.js for deployment on Vercel.

## Local development

1. Run `npm install`
2. Run `npm run dev`
3. Open `http://localhost:3000`

## Main files

- `app/page.js` is the homepage
- `app/stories/page.js` is the entrepreneur features page
- `app/journal/page.js` is the writing page
- `app/news/page.js` is the news page
- `app/about/page.js` is the mission page
- `app/contact/page.js` is the contact page
- `app/articles/[slug]/page.js` renders individual article pages
- `lib/content.js` stores the article content and homepage content
- `components/` contains reusable UI sections
- `public/` stores images like the logo and article images

## How to add a new article

1. Open `lib/content.js`
2. Copy one of the existing article objects inside the `articles` array
3. Change:
   - `slug`
   - `title`
   - `category`
   - `section` (`stories`, `journal`, or `news`)
   - `author`
   - `date`
   - `readTime`
   - `excerpt`
   - `lead`
   - `image`
   - `content`
4. Save the file

The new article will automatically appear in its section page and have its own URL at `/articles/your-slug`.

## How to change text

- Homepage text is mainly in `components/home-page.jsx`
- About page text is in `app/about/page.js`
- Contact page text is in `app/contact/page.js`
- Section page descriptions are in:
  - `app/stories/page.js`
  - `app/journal/page.js`
  - `app/news/page.js`
- Article text is in `lib/content.js`

## How to update images

1. Put your new image inside the `public/` folder
2. In `lib/content.js`, set the article `image` field to the file path
3. Example:

```js
image: "/my-article-image.jpg"
```

For the logo, replace the file in `public/` and update the path in `components/site-header.jsx` if the filename changes.
