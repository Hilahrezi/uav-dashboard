function scrollToSection(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
}


const ctx = document.getElementById('batteryChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line', // Grafik garis
    data: {
        labels: ['0m', '5m', '10m', '15m', '20m', '25m'], // Waktu terbang
        datasets: [{
            label: 'Voltase Baterai (V)',
            data: [25.2, 24.8, 24.0, 23.5, 22.8, 21.5], // Data simulasi turun
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.2)',
            borderWidth: 2,
            tension: 0.4
        }]
    },
    options: {
        responsive: true
    }
});

const weatherDisplay = document.getElementById('weather-data');

async function getWeatherData() {
    try {
        // 1. Tentukan Koordinat (Contoh: Yogyakarta)
        const lat = -7.5755;
        const lon = 110.8243;

        // 2. Request ke API
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const response = await fetch(url);
        const data = await response.json();

        // 3. Ambil data yang kita butuhkan saja
        const windSpeed = data.current_weather.windspeed;
        const temperature = data.current_weather.temperature;

        // 4. Logika Keamanan Terbang (Simple AI Logic)
        let statusTerbang = '';
        let warnaStatus = '';

        if (windSpeed > 20) {
            statusTerbang = 'BERBAHAYA UNTUK TERBANG ⚠️';
            warnaStatus = 'red';
        } else {
            statusTerbang = 'AMAN UNTUK TERBANG ✅';
            warnaStatus = 'green';
        }

        // 5. Update Tampilan HTML
        weatherDisplay.innerHTML = `
            <div style="font-size: 1.2rem; margin: 10px 0;">
                <p>Kecepatan Angin: <strong>${windSpeed} km/h</strong></p>
                <p>Suhu: <strong>${temperature}°C</strong></p>
                <p style="color: ${warnaStatus}; font-weight: bold; margin-top: 10px;">${statusTerbang}</p>
            </div>
        `;

    } catch (error) {
        weatherDisplay.innerHTML = "<p>Gagal mengambil data cuaca.</p>";
    }
}

// Jalankan fungsi
getWeatherData();