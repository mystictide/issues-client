"use client";

import { adminLogin, login } from "@/actions/auth/actions";
import Logo from "@/assets/img/issues.svg";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login({ setRegState }) {
  const [userLogin, setUserLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    let res;
    if (userLogin) {
      res = await login(userData);
    } else {
      res = await adminLogin(userData);
    }
    toast(res);
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const userData = { email: "demo@issues.com", password: "password" };
    let res = await adminLogin(userData);
    toast(res);
  };

  return (
    <>
      <div className="flex-row flex-center logo no-select">
        <Image alt="issues logo" src={Logo} />
        <h1>ISSUES</h1>
      </div>
      <section className="bg padding radius w-400 flex-row">
        <button
          className={userLogin ? "w-half" : "w-half active"}
          onClick={() => setUserLogin(false)}
        >
          Company
        </button>
        <button
          className={userLogin ? "w-half active" : "w-half"}
          onClick={() => setUserLogin(true)}
        >
          User
        </button>
      </section>
      <div className="bg padding radius w-400">
        <h1 className="text-center no-select">Sign in</h1>
        <section>
          <form className="flex-column" onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="enter your email address"
              onChange={onChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={onChange}
            />
            <div className="flex-column">
              <button aria-label="sign in" className="no-select" type="submit">
                Sign in
              </button>
              <span
                className="function self-end text-small no-select"
                onClick={() => setRegState(true)}
              >
                ..or sign up
              </span>
            </div>
          </form>
        </section>
      </div>
      <div className="bg padding radius w-400">
        <button
          aria-label="sign in"
          className="w-full text-large no-select"
          type="button"
          onClick={(e) => demoLogin(e)}
        >
          DEMO
        </button>
      </div>
    </>
  );
}
