import { useState } from "react";

function App() {
  // State untuk input kota
  const [city, setCity] = useState("");
  // State untuk data cuaca
  const [weather, setWeather] = useState(null);
  // State untuk loading
  const [loading, setLoading] = useState(false);
  // State untuk error
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=id`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Kota tidak ditemukan");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message || "Gagal mengambil data cuaca");
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    // Validasi input
    if (!city.trim()) {
      setError("Silakan masukkan nama kota");
      return;
    }

    // Reset state
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          ⛅ Weather App
        </h1>

        {/* Search Input */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Masukkan nama kota..."
              value={city}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-full border-none outline-none text-gray-700 shadow-lg focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "🔄" : "🔍"}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-center text-white mb-6">
            <div className="animate-spin text-4xl mb-2">🌀</div>
            <p>Sedang mencari data cuaca...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-center text-white mb-6">
            <div className="text-4xl mb-2">❌</div>
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {weather && !loading && (
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            {/* Location Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {weather.name}, {weather.sys.country}
              </h2>
            </div>

            {/* Main Weather Info */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-20 h-20 mx-auto"
                />
                <p className="text-gray-600 capitalize font-medium">
                  {weather.weather[0].description}
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800">
                  {Math.round(weather.main.temp)}°C
                </div>
                <p className="text-gray-600 text-sm">
                  Terasa seperti {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">💧</div>
                <p className="text-sm text-gray-600">Kelembaban</p>
                <p className="font-bold text-gray-800">
                  {weather.main.humidity}%
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">💨</div>
                <p className="text-sm text-gray-600">Kec. Angin</p>
                <p className="font-bold text-gray-800">
                  {weather.wind.speed} m/s
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {!weather && !loading && !error && (
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="font-semibold mb-2">Selamat datang!</h3>
          <p className="text-sm opacity-90">
            Masukkan nama kota untuk melihat cuaca terkini
          </p>
          <p className="text-xs mt-2 opacity-80">
            Contoh: Jakarta, Surabaya, Medan
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
