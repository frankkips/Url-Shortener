import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const[shortcode, setShortcode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [ogUrl, setOgUrl] = useState("")
  const [error, setError] = useState("");

  const handleRetreive = async () => {
    try{
      const response = await axios.get(`http://localhost:3000/shorten/${shortcode}`);
      setOgUrl(response.data.message);
    }catch(err){
      setError("Failed to shorten URL.",err);
    }
  }

  const handleShorten = async () => {
    setError("");
    setShortUrl("");

    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/shorten", { url });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten URL.",err);
    }
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Bit.ly</h1>
        <p className="text-gray-600">Enter your URL below</p>

        <input
          type="text"
          className="w-full p-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleShorten}
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Shortened URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {shortUrl}
            </a>
          </div>
        )}
        <p className="text-gray-600 mt-2">Enter Shortcode Below</p>
        <input 
        className="w-full p-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text" 
        value={shortcode}
        placeholder="ab309t"
        onChange={(e) => setShortcode(e.target.value)}
        />
        <button
        onClick={handleRetreive}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Retrive URL
        </button>

        {ogUrl && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Original URL:{" "}
            <a href={ogUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {ogUrl}
            </a>
          </div>
        )}

        {error && <p className="mt-3 text-red-500">{error}</p>}
      </div>
    </div>
    </>
  )
}

export default App
