"use server";

import { FaEdit } from "react-icons/fa";
import Pager from "../../ui/pager";

export default async function RolesList({ admin, user, roles }) {
  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        List of Roles
      </h2>
      <Pager data={roles} url={"/settings/roles"} />
      <section className="table flex-column">
        <div className="bg">
          <ul className="flex-row w-full">
            <li className="h-full tb-85 padding">Role Name</li>
            {admin || user.Role.Attributes.some((r) => [1].includes(r)) ? (
              <li className="h-full functions padding">Functions</li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="tb-body flex-column">
          <ul className="w-full">
            {roles.data?.map((role) => (
              <li key={role.ID} className="flex-row w-full">
                <a
                  className="flex-row flex-start padding tb-85 tb-link"
                  aria-label="manage roles"
                  href={`/settings/roles/manage/${role.ID}`}
                >
                  {role.Name}
                </a>
                {admin || user.Role.Attributes.some((r) => [1].includes(r)) ? (
                  <div className="flex-row flex-start functions">
                    <a
                      className="flex-row flex-center interactive"
                      aria-label="manage roles"
                      href={`/settings/roles/manage/${role.ID}`}
                    >
                      <FaEdit />
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
