"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";

export default function RolesFilter({ filter }) {
  const router = useRouter();
  const [filterHidden, setFilterHidden] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    router.push(`/settings/roles/?keyword=${e.target.keyword.value}`);
  };

  return (
    <>
      <button
        className="bg padding w-full m-view"
        onClick={() => setFilterHidden((prevState) => !prevState)}
      >
        Search & Filter
      </button>
      <section
        className={`sidebar-view flex-row flex-center ${
          filterHidden ? "hidden" : ""
        }`}
      >
        <div className="bg flex-column sidebar filter">
          <div className="manage flex-row flex-center">
            <a
              className="w-full h-full flex-row flex-center no-select manage"
              aria-label="add new role"
              href="/settings/roles/manage/"
            >
              <BsPlusSquareFill />
              <h1>New Role</h1>
            </a>
          </div>
          <section className="w-full h-full">
            <h5 className="tb-body text-center padding no-select">
              Search & Filter
            </h5>
            <form className="flex-column" onSubmit={onSubmit}>
              <input
                type="text"
                id="keyword"
                name="keyword"
                defaultValue={filter.keyword ?? ""}
                placeholder="...search by name"
              />
              <button
                aria-label="search"
                type="submit"
                className="flex-row flex-center h-full w-full padding"
              >
                Search
              </button>
            </form>
          </section>
        </div>
      </section>
    </>
  );
}
