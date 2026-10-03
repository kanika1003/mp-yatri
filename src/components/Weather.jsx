import { useEffect, useState } from "react";

import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  Loader2,
} from "lucide-react";

const cityCoordinates = {
  Jabalpur: [23.1815, 79.9864],
  Bhopal: [23.2599, 77.4126],
  Indore: [22.7196, 75.8577],
  Ujjain: [23.1765, 75.7885],
  Gwalior: [26.2183, 78.1828],
  Khajuraho: [24.8318, 79.9199],
  Pachmarhi: [22.4676, 78.4331],
  Orchha: [25.3519, 78.6407],
  Mandu: [22.3448, 75.3957],
  Kanha: [22.3345, 80.6115],
  Bandhavgarh: [23.6877, 81.025],
};

function getWeatherText(code) {
  if (code === 0) return "Clear Sky";
  if ([1, 2, 3].includes(code)) return "Partly Cloudy";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55].includes(code)) return "Drizzle";
  if ([61, 63, 65].includes(code)) return "Rain";
  if ([80, 81, 82].includes(code)) return "Rain Showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";

  return "Weather Available";
}

function Weather({ city = "Jabalpur" }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      setWeather(null);

      const coordinates =
        cityCoordinates[city] || cityCoordinates.Jabalpur;

      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${coordinates[0]}` +
          `&longitude=${coordinates[1]}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
          `&daily=temperature_2m_max,temperature_2m_min` +
          `&timezone=auto`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();

        setWeather(data);
      } catch (err) {
        console.error("Weather Error:", err);
        setError("Weather service is temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <section className="weather-section">

      <div className="weather-header">
        <div>
          <p className="small-title">
            LIVE WEATHER
          </p>

          <h2>
            Weather in {city}
          </h2>

          <p>
            Current weather conditions for your destination.
          </p>
        </div>

        <CloudSun size={42} />
      </div>

      {loading && (
        <div className="weather-loading">
          <Loader2
            size={28}
            className="weather-spinner"
          />

          <span>
            Loading weather...
          </span>
        </div>
      )}

      {error && !loading && (
        <div className="weather-error">
          <CloudSun size={25} />

          <div>
            <strong>
              Weather unavailable
            </strong>

            <p>
              {error}
            </p>
          </div>
        </div>
      )}

      {weather && !loading && !error && (
        <div className="weather-card">

          <div className="weather-main">

            <div className="weather-icon">
              <CloudSun size={55} />
            </div>

            <div>
              <h3>
                {Math.round(
                  weather.current.temperature_2m
                )}
                °C
              </h3>

              <p>
                {getWeatherText(
                  weather.current.weather_code
                )}
              </p>

              <span>
                Feels like{" "}
                {Math.round(
                  weather.current.apparent_temperature
                )}
                °C
              </span>
            </div>

          </div>

          <div className="weather-details">

            <div className="weather-detail-item">
              <Thermometer size={20} />

              <div>
                <span>
                  Min / Max
                </span>

                <strong>
                  {Math.round(
                    weather.daily.temperature_2m_min[0]
                  )}
                  ° /{" "}
                  {Math.round(
                    weather.daily.temperature_2m_max[0]
                  )}
                  °
                </strong>
              </div>
            </div>

            <div className="weather-detail-item">
              <Droplets size={20} />

              <div>
                <span>
                  Humidity
                </span>

                <strong>
                  {weather.current.relative_humidity_2m}%
                </strong>
              </div>
            </div>

            <div className="weather-detail-item">
              <Wind size={20} />

              <div>
                <span>
                  Wind
                </span>

                <strong>
                  {weather.current.wind_speed_10m} km/h
                </strong>
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default Weather;