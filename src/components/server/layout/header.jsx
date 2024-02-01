"use server";

import Logo from "@/assets/img/issues.svg";
import { readCookie } from "@/assets/js/helpers";
import SetTheme from "@/components/client/ui/setTheme";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Header({ page }) {
  const cookieStore = cookies();
  const user = await readCookie(cookieStore, "auth");
  const settings = await readCookie(cookieStore, "settings");

  return (
    <nav className="bg flex w-full flex-row flex-end">
      <a
        className="flex-row flex-center logo no-select"
        aria-label="Home"
        href="/"
      >
        <Image alt="issues logo" src={Logo} />
        <h1>ISSUES</h1>
      </a>
      <section className="h-full">
        <ul className="flex-row h-full nav-list flex-center">
          <li className={page === "dashboard" ? "active" :""}>
            <a aria-label="Dashboard" href="/">
              Dashboard
            </a>
          </li>
          <li className={page === "projects" ? "active" :""}>
            <a aria-label="Projects" href="/projects">
              Projects
            </a>
          </li>
          <li className={page === "issues" ? "active" :""}>
            <a aria-label="Issues" href="/issues">
              Issues
            </a>
          </li>
          <li className={page === "clients" ? "active" :""}>
            <a aria-label="Clients" href="/clients">
              Clients
            </a>
          </li>
          <li className={page === "settings" ? "active" :""}>
            <a aria-label="Settings" href="/settings">
              Settings
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h5>
          {user.FirstName} {user.LastName}
        </h5>
        <h6 className="text-center">Administrator</h6>
      </section>
      <SetTheme theme={settings.theme} />
    </nav>
  );
}
