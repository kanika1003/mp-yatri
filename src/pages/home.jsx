import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  MapPin,
  Sparkles,
  Map,
  CalendarDays,
  Compass,
  Trees,
  Landmark,
  Church,
  Mountain,
} from "lucide-react";
import { useState } from "react";

const featuredPlaces = [
  {
    id: "jabalpur-bhedaghat",
    name: "Bhedaghat",
    city: "Jabalpur",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "bhopal-upper-lake",
    name: "Upper Lake",
    city: "Bhopal",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "gwalior-fort",
    name: "Gwalior Fort",
    city: "Gwalior",
    category: "Heritage",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ujjain-mahakaleshwar",
    name: "Mahakaleshwar",
    city: "Ujjain",
    category: "Spiritual",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
  },
];

const categories = [
  {
    name: "Nature",
    icon: Trees,
    text: "Waterfalls, forests & landscapes",
  },
  {
    name: "Heritage",
    icon: Landmark,
    text: "Forts, palaces & monuments",
  },
  {
    name: "Spiritual",
    icon: Church,
    text: "Temples & sacred places",
  },
  {
    name: "Adventure",
    icon: Mountain,
    text: "Outdoor experiences",
  },
];

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      navigate("/explore");
      return;
    }

    navigate(`/explore?search=${encodeURIComponent(search)}`);
  };

  return (
    <main className="home-page">

      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="home-hero-content">

          <div className="hero-badge">
            <Sparkles size={15} />
            SMART TOURISM • MADHYA PRADESH
          </div>

          <h1>
            Discover
            <span>Madhya Pradesh</span>
            Your Way.
          </h1>

          <p>
            Explore incredible destinations, discover local
            experiences and create a personalized trip with
            MP YATRI.
          </p>


          {/* SEARCH */}

          <form
            className="home-search"
            onSubmit={handleSearch}
          >
            <Search size={21} />

            <input
              type="text"
              placeholder="Where do you want to go?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">
              Explore
              <ArrowRight size={17} />
            </button>
          </form>


          <div className="hero-actions">

            <Link
              to="/planner"
              className="primary-btn"
            >
              <Sparkles size={18} />
              Plan My Trip
            </Link>

            <Link
              to="/explore"
              className="hero-secondary-btn"
            >
              Explore Destinations
            </Link>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="home-hero-visual">

          <div className="hero-circle">

            <div className="hero-card hero-card-one">
              <MapPin size={17} />
              <div>
                <strong>Explore MP</strong>
                <span>50+ destinations</span>
              </div>
            </div>

            <div className="hero-card hero-card-two">
              <Sparkles size={17} />
              <div>
                <strong>Smart Planning</strong>
                <span>Personalized trips</span>
              </div>
            </div>

            <div className="hero-center">

              <Compass size={75} />

              <span>MP</span>
              <strong>YATRI</strong>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="home-features">

        <div className="feature-item">
          <Map size={25} />

          <div>
            <strong>Real-time Maps</strong>
            <span>Navigate destinations easily</span>
          </div>
        </div>

        <div className="feature-item">
          <Sparkles size={25} />

          <div>
            <strong>Smart Planning</strong>
            <span>Create personalized itineraries</span>
          </div>
        </div>

        <div className="feature-item">
          <CalendarDays size={25} />

          <div>
            <strong>Save Your Trip</strong>
            <span>Keep your travel plans organized</span>
          </div>
        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="home-section">

        <div className="home-section-heading">

          <div>
            <p className="small-title">
              FIND YOUR EXPERIENCE
            </p>

            <h2>
              What are you looking for?
            </h2>
          </div>

          <Link to="/explore">
            View All
            <ArrowRight size={17} />
          </Link>

        </div>


        <div className="home-category-grid">

          {categories.map((item) => {

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={`/explore?category=${item.name}`}
                className="home-category-card"
              >

                <div className="category-icon">
                  <Icon size={27} />
                </div>

                <h3>{item.name}</h3>

                <p>{item.text}</p>

                <ArrowRight size={18} />

              </Link>
            );
          })}

        </div>

      </section>


      {/* ================= FEATURED ================= */}

      <section className="home-section featured-section">

        <div className="home-section-heading">

          <div>
            <p className="small-title">
              PLACES TO DISCOVER
            </p>

            <h2>
              Popular destinations
            </h2>
          </div>

          <Link to="/explore">
            Explore All
            <ArrowRight size={17} />
          </Link>

        </div>


        <div className="featured-grid">

          {featuredPlaces.map((place) => (

            <Link
              key={place.id}
              to={`/destination/${place.id}`}
              className="featured-card"
            >

              <img
                src={place.image}
                alt={place.name}
              />

              <div className="featured-overlay">

                <span>
                  {place.category}
                </span>

                <h3>
                  {place.name}
                </h3>

                <p>
                  <MapPin size={14} />
                  {place.city}, Madhya Pradesh
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* ================= PLANNER CTA ================= */}

      <section className="home-planner-cta">

        <div>

          <p className="small-title">
            PLAN SMARTER
          </p>

          <h2>
            Your next MP adventure
            starts here.
          </h2>

          <p>
            Choose your destination, budget, duration and
            interests. MP YATRI will help you organize your journey.
          </p>

          <Link
            to="/planner"
            className="primary-btn"
          >
            Create My Itinerary
            <ArrowRight size={18} />
          </Link>

        </div>


        <div className="planner-cta-icon">
          <Compass size={100} />
        </div>

      </section>

    </main>
  );
}

export default Home;