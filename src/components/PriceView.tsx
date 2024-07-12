"use client";
import { fetchPriceFromBand, fetchPriceFromPyth } from "@/utils/httpclient";
import React, { useEffect, useState } from "react";

function PriceView({ token }: { token: string }) {
  const [data, setData] = useState({
    symbol: "",
    priceFromPyth: "",
    priceFromband: "",
    avgPrice: "",
  });
  const fetchData = async () => {
    const dataPyth = await fetchPriceFromPyth(token);
    const dataBand = await fetchPriceFromBand(token.toUpperCase());
    const avgPrice = (
      (Number(dataPyth[0].price) + Number(dataBand[0].price)) /
      2
    ).toFixed(2);
    setData({
      symbol: token,
      avgPrice: avgPrice,
      priceFromband: dataBand[0].price,
      priceFromPyth: dataPyth[0].price,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" h-[250px] p-3 max-w-[1100px] border mx-auto bg-slate-600 rounded-lg mt-6">
      <Header token={token} />
      <TableHeader />
      <TableRow
        avgPrice={data.avgPrice}
        priceFromBand={data.priceFromband}
        priceFromPyth={data.priceFromPyth}
        symbol={data.symbol}
      />
    </div>
  );
}

export default PriceView;

function Header({ token }: { token: string }) {
  return (
    <div className=" p-2 flex justify-center items-center text-4xl uppercase font-bold font-serif text-black border-b border-slate-700">
      {token}
    </div>
  );
}

function TableRow({
  symbol,
  priceFromPyth,
  priceFromBand,
  avgPrice,
}: {
  symbol: string;
  priceFromPyth: string;
  priceFromBand: string;
  avgPrice: string;
}) {
  return (
    <div className="grid grid-cols-4 text-black items-center text-xl font-serif my-2">
      <div className="text-center h-12 p-2">{symbol.toUpperCase() || "--"}</div>
      <div className="text-center h-12 p-2">{priceFromPyth || "--"}$</div>
      <div className="text-center h-12 p-2">{priceFromBand || "--"}$</div>
      <div className="text-center h-12 p-2">{avgPrice || "--"}$</div>
    </div>
  );
}
function TableHeader() {
  return (
    <div className="grid grid-cols-4 font-semibold text-gray-900 items-center text-2xl font-serif ">
      <div className="text-center h-12 self-center p-2 ">Token</div>
      <div className="text-center h-12 p-2 ">Price from Pyth</div>
      <div className="text-center h-12 p-2 ">Price from Band</div>
      <div className="text-center h-12 p-2 ">Avg Price</div>
    </div>
  );
}
