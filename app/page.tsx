import { SiteHeader } from "@/components/SiteHeader";
import { Board } from "@/components/Board";
import { BoardFooter } from "@/components/BoardFooter";

export default function Home() {
  return <><SiteHeader /><main className="board-main"><Board /><BoardFooter /></main></>;
}
