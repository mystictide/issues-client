"use client";

import { manageRole } from "@/actions/manage/actions";
import { RoleClass } from "@/models/users/role";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RoleManager({ admin, user, data }) {
  const router = useRouter();
  const [name, setName] = useState(data?.Name ?? "");
  const [selected, setSelected] = useState(data?.Attributes ?? []);
  let Role = new RoleClass();

  const handleCheck = (e) => {
    if (!selected.includes(e.target.value)) {
      setSelected((prevState) => [...prevState, e.target.value]);
    } else {
      setSelected((prevState) => prevState.filter((a) => e.target.value !== a));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name && selected.length > 0) {
      Role.ID = data?.ID ?? 0;
      Role.CompanyID = admin ? admin.ID : user?.CompanyID;
      Role.Name = name;
      Role.Attributes = selected;
      const reqData = {
        entity: JSON.stringify(Role),
        token: admin?.Token ?? user?.Token,
      };
      let res = await manageRole(reqData);
      if (res?.ID > 0) {
        router.push("/settings/roles");
      } else {
        toast("Server error. Please try again.");
      }
    } else {
      toast("Please fill all necessary fields before submitting.");
    }
  };

  return (
    <>
      <h2 className="bg form-header flex-row flex-center flex-start">
        Creating a new Role
      </h2>
      <form className="flex-column" onSubmit={onSubmit}>
        <section className="bg content-main flex-column padding">
          <h4>Role name</h4>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={name ?? ""}
            placeholder="administrator, project manager, developer, tester..."
            onChange={(e) => setName(e.target.value)}
            className="w-half"
          />
          <h4>Level of access</h4>
          {Role?.Attributes?.map((attr) => (
            <section key={attr.ID} className="flex-row flex-start">
              <label className="relative checkbox flex-row flex-center no-select">
                {attr.Value}
                <input
                  type="checkbox"
                  defaultValue={attr.ID}
                  onChange={handleCheck}
                  defaultChecked={
                    data?.Attributes?.includes(attr.ID) ? true : false
                  }
                />
              </label>
            </section>
          ))}
          {selected.length < 1 ? (
            <label className="text-small error">
              At least one access level must be selected
            </label>
          ) : (
            ""
          )}
        </section>
        <button type="submit" className="bg large">
          Submit
        </button>
      </form>
    </>
  );
}
