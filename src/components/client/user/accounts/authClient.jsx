"use client";
import { useState } from "react";
import Login from "./login";
import Register from "./register";

export default function AuthClient() {
  const [regState, setRegState] = useState(false);

  return (
    <>
      {regState ? (
        <Register setRegState={setRegState} />
      ) : (
        <Login setRegState={setRegState} />
      )}
    </>
  );
}
