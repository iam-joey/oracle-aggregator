"use client";
import NavBar from "@/components/NavBar";
import PriceView from "@/components/PriceView";
import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const { token } = useParams();
  return (
    <div className="text-white">
      <NavBar />
      <PriceView token={token as string} />
    </div>
  );
}

export default Page;
