import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="site-header">
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
      <button className="connect-wallet" type="button">[connect wallet]</button>
    </header>
  );
}
