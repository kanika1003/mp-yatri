import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Wallet,
  Users,
  MapPin,
  Sparkles,
  Save,
  ArrowRight,
} from "lucide-react";

const places = {
  Jabalpur: [
    "Bhedaghat",
    "Dhuandhar Falls",
    "Madan Mahal Fort",
    "Chausath Yogini Temple",
    "Bargi Dam",
    "Gwarighat",
  ],

  Bhopal: [
    "Upper Lake",
    "Lower Lake",
    "Van Vihar National Park",
    "Sanchi Stupa",
    "Bhimbetka",
    "Tribal Museum",
  ],

  Indore: [
    "Rajwada Palace",
    "Lal Bagh Palace",
    "Patalpani Waterfall",
    "Tincha Falls",
    "Khajrana Ganesh Temple",
    "Sarafa Bazaar",
  ],

  Ujjain: [
    "Mahakaleshwar Temple",
    "Mahakal Lok",
    "Kal Bhairav Temple",
    "Harsiddhi Temple",
    "Ram Ghat",
    "Mangalnath Temple",
  ],

  Gwalior: [
    "Gwalior Fort",
    "Jai Vilas Palace",
    "Tansen Tomb",
    "Gujari Mahal",
  ],

  Khajuraho: [
    "Khajuraho Temples",
    "Western Group of Temples",
    "Eastern Group of Temples",
    "Panna National Park",
  ],

  Pachmarhi: [
    "Bee Falls",
    "Dhoopgarh",
    "Jata Shankar Caves",
    "Pandav Caves",
    "Apsara Vihar",
  ],

  Orchha: [
    "Orchha Fort",
    "Ram Raja Temple",
    "Chaturbhuj Temple",
    "Orchha Chhatris",
  ],

  Mandu: [
    "Jahaz Mahal",
    "Hindola Mahal",
    "Hoshang Shah's Tomb",
    "Mandu Fort",
  ],
};

function TripPlanner() {
  const navigate = useNavigate();

  const [destination, setDestination] =
    useState("Jabalpur");

  const [days, setDays] =
    useState(3);

  const [budget, setBudget] =
    useState("Medium");

  const [travellers, setTravellers] =
    useState(2);

  const [interest, setInterest] =
    useState("All");

  const [plan, setPlan] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const generateTrip = () => {
    const destinationPlaces =
      places[destination];

    const generatedPlan = [];

    for (let i = 0; i < Number(days); i++) {
      const first =
        destinationPlaces[(i * 2) % destinationPlaces.length];

      const second =
        destinationPlaces[
          (i * 2 + 1) % destinationPlaces.length
        ];

      generatedPlan.push({
        day: i + 1,
        places: [first, second],
      });
    }

    setPlan(generatedPlan);

    setMessage(
      "Your personalized trip has been generated! 🎉"
    );
  };

  const saveTrip = () => {
    if (plan.length === 0) {
      setMessage(
        "Please generate your trip first."
      );
      return;
    }

    const trip = {
      destination,
      days: Number(days),
      budget,
      travellers: Number(travellers),
      interest,
      plan,
    };

    localStorage.setItem(
      "mpYatriTrip",
      JSON.stringify(trip)
    );

    setMessage(
      "Trip saved successfully! 🎉"
    );
  };

  const openItinerary = () => {
    const saved =
      localStorage.getItem("mpYatriTrip");

    if (!saved) {
      setMessage(
        "Please save your trip first."
      );
      return;
    }

    navigate("/itinerary");
  };

  return (
    <main className="page planner-page">

      <section className="planner-header">

        <p className="small-title">
          SMART TRAVEL PLANNER
        </p>

        <h1>
          Plan Your MP Journey
        </h1>

        <p>
          Create a personalized Madhya Pradesh
          itinerary in seconds.
        </p>

      </section>

      <section className="planner-box">

        {/* Destination */}

        <div className="planner-field">

          <label>
            <MapPin size={18} />
            Destination
          </label>

          <select
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
          >
            {Object.keys(places).map(
              (place) => (
                <option
                  key={place}
                  value={place}
                >
                  {place}
                </option>
              )
            )}
          </select>

        </div>

        {/* Days */}

        <div className="planner-field">

          <label>
            <CalendarDays size={18} />
            Number of Days
          </label>

          <select
            value={days}
            onChange={(e) =>
              setDays(Number(e.target.value))
            }
          >
            <option value={1}>1 Day</option>
            <option value={2}>2 Days</option>
            <option value={3}>3 Days</option>
            <option value={4}>4 Days</option>
            <option value={5}>5 Days</option>
            <option value={6}>6 Days</option>
            <option value={7}>7 Days</option>
          </select>

        </div>

        {/* Budget */}

        <div className="planner-field">

          <label>
            <Wallet size={18} />
            Budget
          </label>

          <select
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value)
            }
          >
            <option value="Budget">
              Budget
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Luxury">
              Luxury
            </option>
          </select>

        </div>

        {/* Travellers */}

        <div className="planner-field">

          <label>
            <Users size={18} />
            Travellers
          </label>

          <select
            value={travellers}
            onChange={(e) =>
              setTravellers(Number(e.target.value))
            }
          >
            <option value={1}>
              1 Traveller
            </option>

            <option value={2}>
              2 Travellers
            </option>

            <option value={3}>
              3 Travellers
            </option>

            <option value={4}>
              4 Travellers
            </option>

            <option value={5}>
              5 Travellers
            </option>
          </select>

        </div>

        {/* Interest */}

        <div className="planner-field">

          <label>
            <Sparkles size={18} />
            Interest
          </label>

          <select
            value={interest}
            onChange={(e) =>
              setInterest(e.target.value)
            }
          >
            <option value="All">
              Everything
            </option>

            <option value="Nature">
              Nature
            </option>

            <option value="Heritage">
              Heritage
            </option>

            <option value="Adventure">
              Adventure
            </option>

            <option value="Culture">
              Culture
            </option>

            <option value="Wildlife">
              Wildlife
            </option>
          </select>

        </div>

        {/* Generate */}

        <button
          type="button"
          className="primary-btn"
          onClick={generateTrip}
        >
          <Sparkles size={18} />
          Generate My Trip
        </button>

      </section>

      {/* MESSAGE */}

      {message && (
        <div className="planner-message">
          {message}
        </div>
      )}

      {/* GENERATED TRIP */}

      {plan.length > 0 && (

        <section className="generated-trip">

          <div className="generated-heading">

            <div>

              <p className="small-title">
                YOUR ITINERARY
              </p>

              <h2>
                {destination} Trip
              </h2>

            </div>

            <button
              type="button"
              className="secondary-btn"
              onClick={saveTrip}
            >
              <Save size={18} />
              Save Trip
            </button>

          </div>

          <div className="itinerary-list">

            {plan.map((day) => (

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

          </div>

          <button
            type="button"
            className="primary-btn"
            onClick={openItinerary}
          >
            View Saved Itinerary
            <ArrowRight size={18} />
          </button>

        </section>
      )}

    </main>
  );
}

export default TripPlanner;