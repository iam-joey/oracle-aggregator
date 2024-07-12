/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    pyth_url: "https://hermes.pyth.network/v2",
    band_url: "https://laozi1.bandchain.org/api/oracle/v1/request_prices",
  },
};

export default nextConfig;
