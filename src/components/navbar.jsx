import { Link, useLocation } from "react-router-dom";
import {
  Map,
  Compass,
  CalendarDays,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <span className="logo-mark">
          <Map size={19} />
        </span>

        <span>
          <strong>MP</strong> YATRI
        </span>
      </Link>

      <div className="nav-links">

        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "active"
              : ""
          }
        >
          Home
        </Link>

        <Link
          to="/explore"
          className={
            location.pathname === "/explore"
              ? "active"
              : ""
          }
        >
          <Compass size={15} />
          Explore
        </Link>

        <Link
          to="/planner"
          className={
            location.pathname === "/planner"
              ? "active"
              : ""
          }
        >
          <Sparkles size={15} />
          Trip Planner
        </Link>

        <Link
          to="/itinerary"
          className={
            location.pathname === "/itinerary"
              ? "active"
              : ""
          }
        >
          <CalendarDays size={15} />
          My Journey
        </Link>

      </div>

      <Link
        to="/planner"
        className="navbar-cta"
      >
        Plan My Trip
        <ArrowRight size={15} />
      </Link>

    </nav>
  );
}

export default Navbar;