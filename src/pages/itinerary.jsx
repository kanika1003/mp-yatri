import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Users,
  Wallet,
  MapPin,
  Trash2,
  ArrowLeft,
} from "lucide-react";

function Itinerary() {

  const [trip, setTrip] = useState(null);

  useEffect(() => {

    const savedTrip =
      localStorage.getItem("mpYatriTrip");

    if (savedTrip) {

      try {

        const parsedTrip =
          JSON.parse(savedTrip);

        setTrip(parsedTrip);

      } catch (error) {

        console.error(
          "Invalid saved trip",
          error
        );

      }
    }

  }, []);

  const deleteTrip = () => {

    localStorage.removeItem(
      "mpYatriTrip"
    );

    setTrip(null);
  };

  if (!trip) {

    return (

      <main className="page">

        <div className="no-results">

          <MapPin size={42} />

          <h2>
            No Saved Trip
          </h2>

          <p>
            You haven't saved a trip yet.
          </p>

          <Link
            to="/planner"
            className="primary-btn"
          >
            <ArrowLeft size={18} />
            Create Trip
          </Link>

        </div>

      </main>

    );
  }

  return (

    <main className="page itinerary-page">

      <section className="planner-header">

        <p className="small-title">
          SAVED JOURNEY
        </p>

        <h1>
          {trip.destination}
        </h1>

        <p>
          Your personalized MP YATRI itinerary.
        </p>

      </section>

      <section className="trip-summary">

        <div>
          <CalendarDays size={20} />
          <strong>
            {trip.days} Days
          </strong>
        </div>

        <div>
          <Users size={20} />
          <strong>
            {trip.travellers} Travellers
          </strong>
        </div>

        <div>
          <Wallet size={20} />
          <strong>
            {trip.budget}
          </strong>
        </div>

        <div>
          <MapPin size={20} />
          <strong>
            {trip.interest}
          </strong>
        </div>

      </section>

      <section className="itinerary-list">

        {trip.plan.map((day) => (

          <div
            className="itinerary-card"
            key={day.day}
          >

            <div className="day">
              Day {day.day}
            </div>

            <div>

              {day.places.map(
                (place, index) => (

                  <p key={index}>
                    📍 {place}
                  </p>

                )
              )}

            </div>

          </div>

        ))}

      </section>

      <div className="itinerary-actions">

        <Link
          to="/planner"
          className="primary-btn"
        >
          Plan Another Trip
        </Link>

        <button
          type="button"
          className="secondary-btn"
          onClick={deleteTrip}
        >
          <Trash2 size={18} />
          Delete Saved Trip
        </button>

      </div>

    </main>

  );
}

export default Itinerary;