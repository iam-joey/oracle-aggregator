"use client";
import {
  fetchDataForTop5FromBand,
  fetchDataForTop5FromPyth,
} from "@/utils/httpclient";
import React, { useEffect, useState } from "react";

function TokensTable() {
  const [combined, setCombined] = useState([]);
  const combineData = (pythData: any, bandData: any) => {
    return pythData.map((pythPrice: any, index: any) => {
      const bandPrice = bandData[index].price;
      const avgPrice = (
        (Number(pythPrice.price) + Number(bandPrice)) /
        2
      ).toFixed(2);

      return {
        symbol: pythPrice.symbol,
        priceFromBand: pythPrice.price,
        priceFromPyth: bandPrice,
        avgPrice,
      };
    });
  };
  const fetchData = async () => {
    const pythData = await fetchDataForTop5FromPyth();
    const bandData = await fetchDataForTop5FromBand();
    const combinedData = combineData(bandData, pythData);
    setCombined(combinedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className=" max-w-[950px] h-[380px] mx-auto rounded-lg  p-5
    "
    >
      <TableHeader />
      {combined.length === 0 ? (
        <Loading />
      ) : (
        combined.map((price: any, index: any) => (
          <TableRow
            key={index}
            symbol={price.symbol}
            priceFromPyth={price.priceFromPyth}
            priceFromBand={price.priceFromBand}
            avgPrice={price.avgPrice}
          />
        ))
      )}
    </div>
  );
}

export default TokensTable;

function TableHeader() {
  return (
    <div className="grid grid-cols-4 font-semibold text-gray-500 items-center text-2xl font-serif ">
      <div className="text-center h-12 self-center p-2 ">Token</div>
      <div className="text-center h-12 p-2 ">Price from Pyth</div>
      <div className="text-center h-12 p-2 ">Price from Band</div>
      <div className="text-center h-12 p-2 ">Avg Price</div>
    </div>
  );
}

const TableRow = ({ symbol, priceFromPyth, priceFromBand, avgPrice }: any) => (
  <div className="grid grid-cols-4  text-white items-center text-xl font-serif hover:bg-gray-500 my-2">
    <div className="text-center h-12 p-2 ">{symbol}</div>
    <div className="text-center h-12 p-2 ">{priceFromPyth}$</div>
    <div className="text-center h-12 p-2 ">{priceFromBand}$</div>
    <div className=" text-center h-12 p-2 ">{avgPrice}$</div>
  </div>
);
const Loading = () => {
  return (
    <div className=" h-[200px] flex items-center justify-center text-4xl font-semibold font-serif">
      Loading....
    </div>
  );
};
