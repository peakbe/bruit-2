document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'VOTRE_CLE_API_OPENWEATHER';
    const openSkyApiKey = 'VOTRE_CLE_API_OPENSKY';

    // Fonction pour récupérer la météo
    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=EBCI&appid=${apiKey}&units=metric`);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Erreur lors de la récupération de la météo:', error);
        }
    }

    // Fonction pour afficher la météo
    function displayWeather(data) {
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
            <h2>Météo à EBCI</h2>
            <p>Température: ${data.main.temp}°C</p>
            <p>Conditions: ${data.weather[0].description}</p>
            <p>Vent: ${data.wind.speed} m/s</p>
        `;
    }

    // Fonction pour récupérer les données des sonomètres
    async function fetchSonometers() {
        try {
            const response = await fetch(`https://api.opensky-network.org/api/sonometers?api_key=${openSkyApiKey}`);
            const data = await response.json();
            displaySonometers(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données des sonomètres:', error);
        }
    }

    // Fonction pour afficher les données des sonomètres
    function displaySonometers(data) {
        const sonometersDiv = document.getElementById('sonometers');
        sonometersDiv.innerHTML = '<h2>Sonomètres</h2>';
        data.forEach(sonometer => {
            sonometersDiv.innerHTML += `
                <div class="sonometer">
                    <h3>${sonometer.address}</h3>
                    <p>Latitude: ${sonometer.latitude}</p>
                    <p>Longitude: ${sonometer.longitude}</p>
                </div>
            `;
        });
    }

    // Appel des fonctions
    fetchWeather();
    fetchSonometers();
});
