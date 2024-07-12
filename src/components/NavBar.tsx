"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Back from "./Back";
import { useRouter } from "next/navigation";

function NavBar() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search submitted:", search);

    router.push(`/market/${search}`);
  };

  return (
    <div className="p-4 bg-slate-900 flex gap-56 items-center">
      <div className="p-3">
        <h1 className="text-2xl font-bold">
          <Back />
        </h1>
      </div>
      <div className="ml-56">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          />
        </form>
      </div>
    </div>
  );
}

export default NavBar;
