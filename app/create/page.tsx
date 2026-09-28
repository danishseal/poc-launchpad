import { SiteHeader } from "@/components/SiteHeader";
import { CreateCoinForm } from "@/components/CreateCoinForm";

export default function CreatePage() {
  return <><SiteHeader /><main className="create-page"><a href="/board" className="go-back">[go back]</a><CreateCoinForm /></main></>;
}
