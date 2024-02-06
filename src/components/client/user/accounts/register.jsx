"use client";
import { adminRegister, checkExistingEmail } from "@/actions/auth/actions";
import Logo from "@/assets/img/issues.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export default function Register({ setRegState }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formValidation, setFormValidation] = useState({
    vPassword: true,
  });
  const [emailExists, setEmailExists] = useState(false);
  const { name, email, password } = formData;
  const { vPassword } = formValidation;

  useEffect(() => {
    const validateMail = setTimeout(async () => {
      if (email.length > 0) {
        let reqData = {email, company: true}
        let res = await checkExistingEmail(reqData);
        setEmailExists(res);
      }
    }, 2000);
    return () => clearTimeout(validateMail);
  }, [email, setEmailExists]);

  useEffect(() => {
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
  }, [password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { id: 0, name, email, password };
    if (!vPassword && name.length > 0 && !emailExists) {
      await adminRegister(userData);
    }
  };

  return (
    <>
      <div className="flex-row flex-center logo no-select">
        <Image alt="issues logo" src={Logo} />
        <h1>ISSUES</h1>
      </div>
      <div className="bg padding radius w-400">
        <h1 className="text-center no-select">Sign up</h1>
        <form className="flex-column" onSubmit={onSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Company Name"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
          />
          {name.length < 1 ? (
            <label className="text-small error">
              Company name can not be empty
            </label>
          ) : (
            ""
          )}
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
          <div className="flex-column">
            {vPassword ||
            name.length < 1 ||
            emailExists ? (
              <BarLoader
                color="#74aa9f"
                height={10}
                loading
                speedMultiplier={0.6}
                width={335}
              />
            ) : (
              <button aria-label="sign up" type="submit" className="no-select">
                Sign up
              </button>
            )}
            <span
              className="function self-end text-small no-select"
              onClick={() => setRegState(false)}
            >
              ..or sign in
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
