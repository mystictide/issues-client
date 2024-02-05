"use server";

import { FaEdit } from "react-icons/fa";
import Pager from "../../ui/pager";

export default async function UsersList({ users }) {
  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        List of Users
      </h2>
      <Pager data={users} url={"/settings/users"} />
      <section className="table flex-column">
        <div className="bg">
          <ul className="flex-row w-full">
            <li className="h-full tb-75 padding">Name</li>
            <li className="h-full functions padding">Role</li>
            <li className="h-full functions padding">Functions</li>
          </ul>
        </div>
        <div className="tb-body flex-column">
          <ul className="w-full">
            {users.data?.map((user) => (
              <li key={user.ID} className="flex-row w-full">
                <a
                  className="flex-row flex-start padding tb-75 tb-link"
                  aria-label="manage users"
                  href={`/settings/users/manage/${user.ID}`}
                >
                  {user.FirstName} {user.LastName}
                </a>
                <div className="flex-row flex-start functions no-select">
                  {user.Role.Name}
                </div>
                <div className="flex-row flex-start functions">
                  <a
                    className="flex-row flex-center interactive"
                    aria-label="manage users"
                    href={`/settings/users/manage/${user.ID}`}
                  >
                    <FaEdit />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
