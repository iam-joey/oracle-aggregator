export interface PriceFeed {
  id: string;
  attributes: {
    asset_type: string;
    base: string;
    description: string;
    generic_symbol: string;
    publish_interval: string;
    quote_currency: string;
    symbol: string;
    weekly_schedule: string;
  };
}

export interface ParsedData {
  id: string;
  price: PriceData;
  ema_price: PriceData;
  metadata: MetadataData;
}

interface PriceData {
  price: string;
  conf: string;
  expo: number;
  publish_time: number;
}

interface MetadataData {
  slot: number;
  proof_available_time: number;
  prev_publish_time: number;
}

export interface PriceResult {
  symbol: string;
  multiplier: string;
  px: string;
  request_id: string;
  resolve_time: string;
}

export interface PriceResponse {
  price_results: PriceResult[];
}
