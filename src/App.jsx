import { useState } from 'react';


function App() {
  // State untuk input kota
  const [city, setCity] = useState('');
  // State untuk data cuaca
  const [weather, setWeather] = useState(null);
  // State untuk loading
  const [loading, setLoading] = useState(false);
  // State untuk error
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=id`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Kota tidak ditemukan');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message || 'Gagal mengambil data cuaca');
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    // Logic pencarian akan ditambahkan nanti
    console.log('Searching for:', city);
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
              className="flex-1 px-4 py-3 rounded-full border-none outline-none text-gray-700 shadow-lg focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-green-600 transition-colors"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;