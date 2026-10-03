import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  Search,
  MapPin,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";

import DestinationImage from "../components/DestinationImage";
import destinations from "../data/destinations";

function Explore() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [city, setCity] = useState("All");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(
      searchParams.get("category") || "All"
    );
    setCity("All");
  }, [searchParams]);

  const cities = [
    "All",
    ...new Set(
      destinations.map(
        (destination) => destination.city
      )
    ),
  ];

  const categories = [
    "All",
    ...new Set(
      destinations.map(
        (destination) => destination.category
      )
    ),
  ];

  const searchText = search
    .trim()
    .toLowerCase();

  const filteredDestinations =
    destinations.filter((destination) => {
      const name =
        destination.name.toLowerCase();

      const destinationCity =
        destination.city.toLowerCase();

      const destinationCategory =
        destination.category.toLowerCase();

      const matchesSearch =
        searchText === "" ||
        name.includes(searchText) ||
        destinationCity.includes(searchText) ||
        destinationCategory.includes(searchText);

      const matchesCategory =
        category === "All" ||
        destination.category === category;

      const matchesCity =
        city === "All" ||
        destination.city === city;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCity
      );
    });

  return (
    <main className="page explore-page">

      {/* HEADER */}
      <section className="explore-header">

        <div>

          <p className="small-title">
            DISCOVER MADHYA PRADESH
          </p>

          <h1>
            Explore Destinations
          </h1>

          <p>
            Discover heritage, nature, temples,
            waterfalls, wildlife and unforgettable
            experiences across Madhya Pradesh.
          </p>

        </div>

      </section>


      {/* SEARCH + CITY FILTER */}
      <section className="explore-controls">

        <div className="explore-search">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search destination or city..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        <div className="filter-group">

          <SlidersHorizontal size={18} />

          <select
            value={city}
            onChange={(event) =>
              setCity(event.target.value)
            }
          >

            {cities.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

      </section>


      {/* CATEGORY FILTERS */}
      <div className="category-filters">

        {categories.map((item) => (

          <button
            key={item}
            className={
              category === item
                ? "category-filter active"
                : "category-filter"
            }
            onClick={() =>
              setCategory(item)
            }
          >
            {item}
          </button>

        ))}

      </div>


      {/* RESULTS */}
      <section className="explore-results">

        <div className="results-heading">

          <div>

            <p className="small-title">
              DESTINATIONS
            </p>

            <h2>
              {filteredDestinations.length} Places Found
            </h2>

          </div>

        </div>


        {/* NO RESULTS */}
        {filteredDestinations.length === 0 ? (

          <div className="no-results">

            <MapPin size={42} />

            <h2>
              No destinations found
            </h2>

            <p>
              Try another destination, city
              or category.
            </p>

            <button
              className="primary-btn"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setCity("All");
              }}
            >
              Show All Destinations
            </button>

          </div>

        ) : (

          /* DESTINATION GRID */
          <div className="destination-grid">

            {filteredDestinations.map(
              (destination) => (

                <article
                  className="destination-card"
                  key={destination.id}
                >

                  {/* IMAGE */}

                  <div
                    className="destination-card-image"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "240px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >

                    <DestinationImage
                      destination={destination}
                      className="destination-card-photo"
                    />


                    {/* CATEGORY */}

                    <span className="place-category">
                      {destination.category}
                    </span>

                  </div>


                  {/* CONTENT */}

                  <div className="destination-card-content">

                    <p className="destination-city">
                      {destination.city}
                    </p>

                    <h3>
                      {destination.name}
                    </h3>

                    <p>
                      {destination.description}
                    </p>

                    <Link
                      to={`/destination/${destination.id}`}
                      className="card-link"
                    >
                      Explore Place

                      <ArrowRight size={17} />

                    </Link>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}

export default Explore;