import { NavLink, Outlet } from "react-router-dom";
import LagoonMotif from "./LagoonMotif";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/methods", label: "Methods" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="brand" end>
            <LagoonMotif className="brand-mark" strokeWidth={2.2} />
            <span>
              GIAP<span className="brand-sub">.chilika</span>
            </span>
          </NavLink>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-col">
            <div className="eyebrow">GIAP</div>
            <p className="footer-text">
              Geospatial Intelligence & Analytics Platform for coastal lagoon monitoring —
              GIS, remote sensing, and statistical analysis in one interface.
            </p>
          </div>
          <div className="footer-col">
            <div className="eyebrow">Coverage</div>
            <p className="footer-text mono">19.5°N–19.9°N &nbsp;·&nbsp; 85.1°E–85.6°E</p>
            <p className="footer-text mono">Chilika Lagoon, Odisha, India</p>
          </div>
          <div className="footer-col">
            <div className="eyebrow">Methods</div>
            <p className="footer-text">DSAS · GEE band math · Supervised ML classification</p>
          </div>
        </div>
        <div className="container footer-bottom mono">
          <span>© {new Date().getFullYear()} GIAP</span>
          <span>Data shown on this site is schematic/placeholder pending live pipeline integration</span>
        </div>
      </footer>
    </>
  );
}
