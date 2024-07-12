"use client";
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholder-vanish";
import { useRouter, usePathname } from "next/navigation";

function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const placeholders = [
    "Search of the price you want Ex: BTC",
    "Search of the price you want Ex: SOL",
    "Search of the price you want Ex: ETH",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    router.push(`/market/${value}`);
  };
  return (
    <div className=" h-[200px] flex justify-center items-center">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default SearchBar;
