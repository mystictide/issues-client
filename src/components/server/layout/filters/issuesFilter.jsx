"use client";

import { IssueClass } from "@/models/main/issue";
import { useRouter } from "next/navigation";

export default function IssuesFilter({ filter, projects }) {
  const router = useRouter();
  const entity = new IssueClass();

  const onSubmit = async (e) => {
    e.preventDefault();
    router.push(
      `/issues/?keyword=${e.target.keyword.value}&projectid=${handleDefault(
        e.target.project.value
      )}&type=${handleDefault(e.target.type.value)}&status=${handleDefault(
        e.target.status.value
      )}&priority=${handleDefault(e.target.priority.value)}&sortby=${
        e.target.sortBy.value
      }&isActive=${!e.target.isActive.checked}`
    );
  };

  const handleDefault = (value) => {
    return value === "default" ? "0" : value;
  };

  return (
    <div className="bg flex-column sidebar filter">
      <section className="w-full h-full">
        <h5 className="tb-body text-center padding no-select">
          Search & Filter
        </h5>
        <form className="flex-column" onSubmit={onSubmit}>
          {projects?.data ? (
            <select
              id="project"
              name="project"
              defaultValue={filter.projectid < 1 ? "default" : filter.projectid}
            >
              <option className="default" value="default" disabled>
                ...search by project
              </option>
              <option value="0">All Projects</option>
              {projects?.map((p) => (
                <option key={p.ID} value={p.ID}>
                  {p.Name}
                </option>
              ))}
            </select>
          ) : (
            ""
          )}

          <input
            type="text"
            id="keyword"
            name="keyword"
            defaultValue={filter.keyword ?? ""}
            placeholder="...search by name"
          />
          <select
            id="type"
            name="type"
            defaultValue={filter.type < 1 ? "default" : filter.type}
          >
            <option className="default" value="default" disabled>
              ...search by type
            </option>
            <option value="0">All Types</option>
            {entity.Type?.map((type) => (
              <option key={type.ID} value={type.ID}>
                {type.Value}
              </option>
            ))}
          </select>
          <select
            id="status"
            name="status"
            defaultValue={filter.status < 1 ? "default" : filter.status}
          >
            <option className="default" value="default" disabled>
              ...search by status
            </option>
            <option value="0">All States</option>
            {entity.Status?.map((s) => (
              <option key={s.ID} value={s.ID}>
                {s.Value}
              </option>
            ))}
          </select>
          <select
            id="priority"
            name="priority"
            defaultValue={filter.priority < 1 ? "default" : filter.priority}
          >
            <option className="default" value="default" disabled>
              ...search by priority
            </option>
            <option value="0">All Priorities</option>
            {entity.Priority?.map((priority) => (
              <option key={priority.ID} value={priority.ID}>
                {priority.Value}
              </option>
            ))}
          </select>
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
