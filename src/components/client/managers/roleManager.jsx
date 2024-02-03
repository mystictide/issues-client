"use client";

import { RoleClass } from "@/models/users/role";
import { useState } from "react";

export default function RoleManager({ admin, user, data }) {
  const [selected, setSelected] = useState(data?.Attributes ?? []);
  let Role = new RoleClass(data);

  const onChange = (e) => {
    Role.Name = e.target.value;
  };

  const handleCheck = (e) => {
    let currentList = selected;
    if (!currentList.includes(e.target.value)) {
      currentList.push(e.target.value);
    } else {
      currentList.splice(currentList.indexOf(e.target.value), 1);
    }
    setSelected(currentList);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const reqData = { id: 0, companyid: 0, attributes };
    toast(res);
  };

  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        Creating a new Role
      </h2>
      <form className="flex-column" onSubmit={onSubmit}>
        <section className="bg flex-column padding">
          <input
            type="text"
            id="name"
            name="name"
            value={Role.Name ?? ""}
            placeholder="Role Name"
            onChange={onChange}
            className="w-half"
          />
          {Role?.Attributes?.map((attr) => (
            <section key={attr.ID} className="flex-row flex-start">
              <label className="relative checkbox flex-row flex-center no-select">
                {attr.Value}
                <input
                  type="checkbox"
                  defaultValue={attr.ID}
                  onChange={handleCheck}
                  defaultChecked={data?.Attributes?.includes(attr.ID) ? true : false}
                />
              </label>
            </section>
          ))}
        </section>
        <button type="submit" className="bg">
          Submit
        </button>
      </form>
    </>
  );
}
