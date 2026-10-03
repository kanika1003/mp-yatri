import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";

import Home from "./pages/home";
import Explore from "./pages/explore";
import Destination from "./pages/destination";
import TripPlanner from "./pages/tripplanner";
import Itinerary from "./pages/itinerary";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/explore"
          element={<Explore />}
        />

        <Route
          path="/destination/:id"
          element={<Destination />}
        />

        <Route
          path="/planner"
          element={<TripPlanner />}
        />

        <Route
          path="/itinerary"
          element={<Itinerary />}
        />

      </Routes>
    </>
  );
}

export default App;