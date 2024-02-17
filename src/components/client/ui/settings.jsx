"use client";

import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { TbHierarchy3 } from "react-icons/tb";

export default function Settings({ admin, user }) {
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
              {admin || user.Role.Attributes.some((r) => [1].includes(r)) ? (
                <li className="h-full w-full">
                  <a
                    className="flex-row flex-center h-full w-full padding"
                    aria-label="manage roles"
                    href="/settings/roles"
                  >
                    <TbHierarchy3 /> Role List
                  </a>
                </li>
              ) : (
                ""
              )}
              <li className="h-full w-full">
                <a
                  className="flex-row flex-center h-full w-full padding"
                  aria-label="manage users"
                  href="/settings/users"
                >
                  <FaUsers /> User List
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
