import { readCookie } from "@/assets/js/helpers";
import { cookies } from "next/headers";
import "../assets/css/main.scss";

export const metadata = {
  metadataBase: new URL("https://issues.herrguller.cc"),
  title: {
    default: "ISSUES",
    template: "%s / ISSUES",
  },
  description: "Project Management",
  keywords: "project management, issue tracker, bug tracker",
  authors: [{ name: "Furkan Güler", url: "https://herrguller.cc" }],
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const settings = readCookie(cookieStore, "settings");
  const theme = settings
    ? settings.theme
      ? settings.theme
      : "light"
    : "light";

  return (
    <html lang="en">
      <body data-theme={theme} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
