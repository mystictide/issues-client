"use server";

import Logo from "@/assets/img/issues.svg";
import { readCookie } from "@/assets/js/helpers";
import Logout from "@/components/client/ui/logout";
import SetTheme from "@/components/client/ui/setTheme";
import Settings from "@/components/client/ui/settings";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Header({ page }) {
  const cookieStore = cookies();
  const admin = await readCookie(cookieStore, "admin");
  const user = await readCookie(cookieStore, "auth");
  const settings = await readCookie(cookieStore, "settings");

  return (
    <nav className="bg flex-row flex-center">
      <div className="navbar flex w-full h-full flex-row flex-end">
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
            <li className={page === "dashboard" ? "active" : ""}>
              <a aria-label="Dashboard" href="/">
                Dashboard
              </a>
            </li>
            <li className={page === "projects" ? "active" : ""}>
              <a aria-label="Projects" href="/projects">
                Projects
              </a>
            </li>
            <li className={page === "issues" ? "active" : ""}>
              <a aria-label="Issues" href="/issues">
                Issues
              </a>
            </li>
          </ul>
        </section>
        <section>
          {user ? (
            <h5 className="text-center">
              {user.FirstName} {user.LastName}
            </h5>
          ) : (
            <h5 className="text-center">{admin.Name}</h5>
          )}
          {user ? (
            <h6 className="text-center">{user.Role.Name}</h6>
          ) : (
            <h6 className="text-center">Administrator</h6>
          )}
        </section>
        <section className="flex-row half-gap" style={{ position: "relative" }}>
          <Settings admin={admin} user={user} />
          <Logout />
          <SetTheme theme={settings?.theme ?? "light"} />
        </section>
      </div>
    </nav>
  );
}
