import dotenv from 'dotenv';
dotenv.config();

export const getWeather = async (req, res) => {
    const location = req.params.location;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!location) {
        return res.status(400).json({ success: false, message: "Location is required" });
    }
    if (!apiKey) {
        return res.status(500).json({ success: false, message: "Weather API key is not configured" });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
        
        // Using global fetch
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: data.message || "Failed to fetch weather data"
            });
        }

        // Return only the exact data we need to keep payload small
        res.status(200).json({
            success: true,
            data: {
                temp: Math.round(data.main.temp),
                feels_like: Math.round(data.main.feels_like),
                condition: data.weather[0].main,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                city: data.name,
                country: data.sys.country
            }
        });
    } catch (err) {
        console.error("Weather API error:", err);
        res.status(500).json({ success: false, message: "Failed to connect to weather service" });
    }
};
