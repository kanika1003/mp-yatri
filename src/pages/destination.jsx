import { Link, useParams } from "react-router-dom";

import {
  MapPin,
  Clock,
  CalendarDays,
  ArrowLeft,
  Navigation,
  Plus,
} from "lucide-react";

import MapView from "../components/MapView";
import Weather from "../components/Weather";

import destinations from "../data/destinations";

function Destination() {
  const { id } = useParams();

  const destination = destinations.find(
    (item) => item.id === id
  );

  if (!destination) {
    return (
      <div className="page">
        <div className="no-results">
          <MapPin size={42} />

          <h2>Destination not found</h2>

          <p>
            This destination is not available yet.
          </p>

          <Link
            to="/explore"
            className="primary-btn"
          >
            <ArrowLeft size={18} />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page destination-page">

      {/* HERO IMAGE */}

      <div className="destination-hero-image">

        <img
          src={destination.image}
          alt={destination.name}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <div className="destination-overlay">

          <span className="place-category">
            {destination.category}
          </span>

          <p className="small-title">
            {destination.city.toUpperCase()}, MADHYA PRADESH
          </p>

          <h1>
            {destination.name}
          </h1>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="destination-content">

        <div className="destination-main">

          <p className="small-title">
            ABOUT DESTINATION
          </p>

          <h2>
            Discover {destination.name}
          </h2>

          <p className="destination-description">
            {destination.description}
          </p>

          {/* INFO */}

          <div className="destination-info-grid">

            <div className="info-card">
              <CalendarDays size={24} />

              <div>
                <span>Best Time</span>

                <strong>
                  {destination.bestTime}
                </strong>
              </div>
            </div>

            <div className="info-card">
              <Clock size={24} />

              <div>
                <span>Suggested Duration</span>

                <strong>
                  {destination.duration}
                </strong>
              </div>
            </div>

            <div className="info-card">
              <MapPin size={24} />

              <div>
                <span>Location</span>

                <strong>
                  {destination.location}
                </strong>
              </div>
            </div>

          </div>

          {/* THINGS TO DO */}

          <div className="things-section">

            <p className="small-title">
              EXPERIENCES
            </p>

            <h2>
              Things to Do
            </h2>

            <div className="things-list">

              {destination.thingsToDo.map(
                (thing, index) => (
                  <div
                    className="thing-item"
                    key={index}
                  >

                    <span>
                      {index + 1}
                    </span>

                    <p>
                      {thing}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

          {/* WEATHER */}

          <Weather city={destination.city} />

          {/* MAP */}

          <MapView
            destination={destination.city}
          />

        </div>

        {/* SIDEBAR */}

        <aside className="destination-sidebar">

          <div className="action-card">

            <h3>
              Plan your visit
            </h3>

            <p>
              Add this destination to your travel
              plan and create your MP journey.
            </p>

            <Link
              to="/planner"
              className="primary-btn"
            >
              <Plus size={18} />
              Add to Trip
            </Link>

            <button
              className="secondary-btn"
              onClick={() =>
                alert(
                  `Opening map for ${destination.name}`
                )
              }
            >
              <Navigation size={18} />
              View on Map
            </button>

          </div>

          <Link
            to="/explore"
            className="back-link"
          >
            <ArrowLeft size={17} />
            Back to Explore
          </Link>

        </aside>

      </div>

    </div>
  );
}

export default Destination;