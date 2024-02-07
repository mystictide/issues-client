"use client";

import { checkExistingEmail } from "@/actions/auth/actions";
import { manageUser } from "@/actions/manage/actions";
import { UserClass } from "@/models/users/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { toast } from "react-toastify";

export default function UserManager({ admin, user, data, roles }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: data?.FirstName ?? "",
    lastName: data?.LastName ?? "",
    email: data?.Email ?? "",
    role: data?.Role.ID ?? 0,
    password: data?.Password ?? "",
  });
  const { firstName, lastName, email, role, password } = formData;
  const [formValidation, setFormValidation] = useState({
    vPassword: data ? false : true,
  });
  const [emailExists, setEmailExists] = useState(false);
  const { vPassword } = formValidation;
  let UserData = new UserClass();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!data) {
      const validatePassword = setTimeout(() => {
        if (password.length > 6) {
          setFormValidation((prevState) => ({
            ...prevState,
            vPassword: false,
          }));
        } else {
          setFormValidation((prevState) => ({
            ...prevState,
            vPassword: true,
          }));
        }
      }, 2000);
      return () => clearTimeout(validatePassword);
    }
  }, [data, password]);

  useEffect(() => {
    const validateMail = setTimeout(async () => {
      if (email.length > 0 && email !== data?.Email) {
        let reqData = { email, company: false };
        let res = await checkExistingEmail(reqData);
        setEmailExists(res);
      }
    }, 2000);
    return () => clearTimeout(validateMail);
  }, [data, email, setEmailExists]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && role > 0) {
      UserData.ID = data?.ID ?? 0;
      UserData.Company = { ID: admin ? admin.ID : user?.CompanyID };
      UserData.FirstName = firstName;
      UserData.LastName = lastName;
      UserData.Email = email;
      UserData.Password = password;
      UserData.Role = { ID: role };
      const reqData = {
        entity: JSON.stringify(UserData),
        token: admin?.Token ?? user?.Token,
      };
      let res = await manageUser(reqData);
      if (res?.ID > 0) {
        router.push("/settings/users");
      } else {
        toast("Server error. Please try again.");
      }
    } else {
      toast("Please fill all necessary fields before submitting.");
    }
  };

  return (
    <>
      <section className="flex-row relative">
        <a
          className="interactive h-full flex-row flex-center flex-start return"
          aria-label="go back"
          href="/settings/roles/"
        >
          <TiArrowBack />
          Go back
        </a>
        <h2 className="bg form-header flex-row flex-center">
          Creating a new User
        </h2>
      </section>
      <form className="flex-column w-full" onSubmit={onSubmit}>
        <section className="bg content-main self-center w-half flex-column padding">
          <h4>First Name</h4>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={firstName ?? ""}
            placeholder="John"
            onChange={onChange}
          />
          <h4>Last Name</h4>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={lastName ?? ""}
            placeholder="Doe"
            onChange={onChange}
          />
          <h4>Email Address</h4>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
          />
          {emailExists ? (
            <label className="text-small error">
              Email address already registered
            </label>
          ) : (
            ""
          )}
          <h4>Password</h4>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
          />
          {vPassword ? (
            <label className="text-small error">
              Password requires more than 6 characters
            </label>
          ) : (
            ""
          )}
          <h4>User Role</h4>
          <select
            id="role"
            name="role"
            defaultValue={data?.Role ?? "default"}
            onChange={onChange}
          >
            <option value="default" disabled>
              Select a role
            </option>
            {roles?.map((role) => (
              <option key={role.ID} value={role.ID}>
                {role.Name}
              </option>
            ))}
          </select>
          {role < 1 ? (
            <label className="text-small error">
              User must be given a role
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
