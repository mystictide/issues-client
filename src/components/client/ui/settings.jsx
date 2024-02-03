"use client";

import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { TbHierarchy3 } from "react-icons/tb";

export default function Settings() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button
        aria-label="settings"
        className="flex-row icon"
        onClick={() => setActive((prev) => !prev)}
      >
        <FaGear />
      </button>
      {active ? (
        <div className="dropdown bg flex-column">
          <section className="w-full h-full">
            <ul className="list flex-column flex-center">
              <li className="h-full w-full">
                <a
                  className="flex-row flex-center h-full w-full padding"
                  aria-label="manage roles"
                  href="/settings/roles"
                >
                  <TbHierarchy3 /> Manage Roles
                </a>
              </li>
              <li className="h-full w-full">
                <a
                  className="flex-row flex-center h-full w-full padding"
                  aria-label="manage users"
                  href="/settings/users"
                >
                  <FaUsers /> Manage Users
                </a>
              </li>
            </ul>
          </section>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
