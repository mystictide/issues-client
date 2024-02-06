"use client";

import { useRouter } from "next/navigation";

export default function IssuesFilter({ filter }) {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    router.push(`/settings/issues/?keyword=${e.target.keyword.value}`);
  };

  return (
    <div className="bg flex-column sidebar filter">
      <section className="w-full h-full">
        <h5 className="tb-body text-center padding no-select">Search & Filter</h5>
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
  );
}
