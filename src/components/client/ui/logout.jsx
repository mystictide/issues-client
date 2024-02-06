"use client";

import { logout } from "@/actions/auth/actions";
import { FaSignOutAlt } from "react-icons/fa";

export default function Logout() {
  return (
    <button
      aria-label="sign out"
      className="flex-row icon"
      onClick={() => logout()}
    >
      <FaSignOutAlt />
    </button>
  );
}
