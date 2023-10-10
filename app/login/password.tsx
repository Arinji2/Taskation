"use client";

import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

export default function PasswordFields() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {" "}
      <div className="w-full h-full flex flex-col items-start justify-center gap-2">
        <label htmlFor="password" className="text-2xl text-black font-bold">
          Password
        </label>
        <div className="h-fit w-full flex flex-row items-center justify-center gap-2">
          <input
            className="w-full h-10 px-2 rounded-md outline-1 bg-gray-200 outline-gray-200 font-medium"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
            className="h-10 w-20  p-2 text-lg flex flex-col items-center justify-center bg-gray-200 outline-gray-200 rounded-md"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>
    </>
  );
}
