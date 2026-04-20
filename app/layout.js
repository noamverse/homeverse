import "./globals.css";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata = {
  metadataBase: new URL("https://homeverse.family"),
  title: {
    default: "HOME — Life is a family, not a marketplace.",
    template: "%s — HOME",
  },
  description:
    "HOME is a relational ecosystem — a publishing platform, venture studio, gatherings community, and network of spaces for people building a world that feels more like family and less like a marketplace.",
  keywords: [
    "relational business",
    "belonging",
    "relational economy",
    "venture studio",
    "founder community",
    "relational investing",
    "HOME ecosystem",
    "Noam Polinger",
  ],
  authors: [{ name: "Noam Polinger" }],
  creator: "Noam Polinger",
  openGraph: {
    type: "website",
    url: "https://homeverse.family",
    title: "HOME — Life is a family, not a marketplace.",
    description:
      "A relational ecosystem. Built on one idea: life should feel more like a family, and less like a marketplace.",
    siteName: "HOME",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "HOME — Life is a family, not a marketplace.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOME — Life is a family, not a marketplace.",
    description:
      "A relational ecosystem. Built on one idea: life should feel more like a family, and less like a marketplace.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
