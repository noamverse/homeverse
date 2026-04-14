import "./globals.css";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata = {
  title: {
    default: "HOME",
    template: "%s | HOME",
  },
  description:
    "HOME is a premium global media platform built around the idea that life is a family, not a marketplace.",
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
