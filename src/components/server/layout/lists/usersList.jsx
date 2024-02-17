"use server";

import { FaEdit } from "react-icons/fa";
import Pager from "../../ui/pager";

export default async function UsersList({ admin, user, users }) {
  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        List of Users
      </h2>
      <Pager data={users} url={"/settings/users"} />
      <section className="table flex-column">
        <div className="bg">
          <ul className="flex-row w-full">
            <li className="h-full tb-60 padding">Name</li>
            <li className="h-full tb-25 padding">Role</li>
            {admin || user.Role.Attributes.some((r) => [1, 2].includes(r)) ? (
              <li className="h-full functions padding">Functions</li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="tb-body flex-column">
          <ul className="w-full">
            {users.data?.map((item) => (
              <li key={item.ID} className="flex-row w-full">
                <a
                  className="flex-row flex-start padding tb-60 tb-link"
                  aria-label="manage users"
                  href={`/settings/users/manage/${item.ID}`}
                >
                  {item.FirstName} {item.LastName}
                </a>
                <div className="flex-row flex-start no-select tb-25">
                  {item.Role.Name}
                </div>
                {admin ||
                user.Role.Attributes.some((r) => [1, 2].includes(r)) ? (
                  <div className="flex-row flex-start functions">
                    <a
                      className="flex-row flex-center interactive"
                      aria-label="manage users"
                      href={`/settings/users/manage/${item.ID}`}
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
