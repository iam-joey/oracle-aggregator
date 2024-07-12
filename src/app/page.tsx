import SearchBar from "@/components/SearchBar";
import TokensTable from "@/components/TokensTable";
import { BackgroundBeams } from "@/components/ui/BackGroundBeams";

export default function Home() {
  return (
    <div className="text-white  h-screen">
      <BackgroundBeams />
      <SearchBar />
      <TokensTable />
    </div>
  );
}
