import axios from "axios";
import { pyth_price_feeds } from "./data";
import { ParsedData, PriceFeed, PriceResponse } from "./type";

const pyth_network_url = process.env.pyth_url as string;

const band_url = process.env.band_url as string;

export const fetchPriceFromPyth = async (
  token: string
): Promise<
  [
    {
      id: string;
      price: string;
    }
  ]
> => {
  try {
    let tokenPriceFeedId = pyth_price_feeds.find(
      (item: PriceFeed) => item.attributes.base === token.toUpperCase()
    );
    if (!tokenPriceFeedId) {
      return [
        {
          id: "null",
          price: "null",
        },
      ];
    }
    //hermes.pyth.network/v2/updates/price/latest?ids[]=(&encoding=hex|base64)(&parsed=false)
    const url = `${pyth_network_url}/updates/price/latest?ids[]=${tokenPriceFeedId.id}`;
    const response = await axios.get(url);
    const data = response.data;
    const filteredResults = data.parsed.map((item: any) => ({
      id: item.id,
      price: (Number(item.price.price) * Math.pow(10, item.price.expo))
        .toFixed(2)
        .toString(),
    }));
    return filteredResults;
  } catch (error) {
    return [
      {
        id: "null",
        price: "null",
      },
    ];
  }
};

export const fetchPriceFromBand = async (
  token: string
): Promise<
  {
    symbol: string;
    price: string;
  }[]
> => {
  try {
    const url = `${band_url}?symbols=${token}`;
    const response = await axios.get(url);
    const data: PriceResponse = response.data;
    const filteredResults = data.price_results.map((item) => ({
      symbol: item.symbol,
      price: (Number(item.px) / Number(item.multiplier)).toFixed(2).toString(),
    }));
    return filteredResults;
  } catch (error) {
    return [
      {
        symbol: "null",
        price: "null",
      },
    ];
  }
};

export const fetchDataForTop5FromPyth = async (): Promise<
  | ParsedData[]
  | { id: string; price: string; ema_price: string; metadata: string }[]
> => {
  try {
    const ids = [
      "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43", //btc
      "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", //eth
      "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d", //sol
      "dcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c", //doge
      "5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52", //matic
    ];
    const pyth_url = `${pyth_network_url}/updates/price/latest?ids[]=${ids[0]}&ids[]=${ids[1]}&ids[]=${ids[2]}&ids[]=${ids[3]}&ids[]=${ids[4]}`;
    const response = await axios.get(pyth_url);
    const data = response.data;
    const filteredResults = data.parsed.map((item: any) => ({
      id: item.id,
      price: (Number(item.price.price) * Math.pow(10, item.price.expo))
        .toFixed(2)
        .toString(),
    }));

    return filteredResults;
  } catch (error) {
    return [
      {
        id: "null",
        price: "null",
        ema_price: "null",
        metadata: "null",
      },
    ];
  }
};

export const fetchDataForTop5FromBand = async () => {
  try {
    const url = `${band_url}?symbols=BTC&symbols=ETH&symbols=SOL&symbols=DOGE&symbols=MATIC`;
    const response = await axios.get(url);
    const data: PriceResponse = response.data;
    const filteredResults = data.price_results.map((item) => ({
      symbol: item.symbol,
      price: (Number(item.px) / Number(item.multiplier)).toFixed(2).toString(),
    }));

    return filteredResults;
  } catch (error) {
    return [
      {
        symbol: null,
        price: null,
      },
    ];
  }
};
