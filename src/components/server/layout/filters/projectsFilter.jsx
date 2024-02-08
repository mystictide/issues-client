"use client";

import { useRouter } from "next/navigation";

export default function ProjectsFilter({ filter }) {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    router.push(
      `/projects/?keyword=${e.target.keyword.value}&sortby=${
        e.target.sortBy.value
      }&isActive=${!e.target.isActive.checked}`
    );
  };

  return (
    <div className="bg flex-column sidebar filter">
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
          <select
            id="sortBy"
            name="sortBy"
            defaultValue={filter.sortby ?? "desc"}
          >
            <option className="default" value="default" disabled>
              ...sort by
            </option>
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
          <label className="relative checkbox flex-row flex-start no-select">
            Archived
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              defaultValue={!filter.IsActive}
            />
          </label>
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
  );
}
