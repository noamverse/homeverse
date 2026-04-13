import "./globals.css";

export const metadata = {
  title: "HOME | Investment Fee Analyzer",
  description:
    "A polished fee impact calculator for HOME, structured as a deployable Next.js project for Vercel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
