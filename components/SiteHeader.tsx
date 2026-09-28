import Image from "next/image";
import type { ReactNode } from "react";

export function SiteHeader({ search }: { search?: ReactNode }) {
  return (
    <header className={`site-header${search ? " site-header-with-search" : ""}`}>
      <a href="/board" aria-label="Pump home" className="logo-link">
        <Image src="/pump-logo.png" alt="Pump" width={25} height={25} />
      </a>
      <nav className="social-links" aria-label="Social links">
        <div>
          <span>[twitter]</span>
          <span>[support]</span>
        </div>
        <span>[telegram]</span>
      </nav>
      {search}
      <button className="connect-wallet" type="button">[connect wallet]</button>
    </header>
  );
}
