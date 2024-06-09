document.getElementById('getWeatherButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '708882574ad46d40addc411c39a767df'; 
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const temperature = data.main.temp;
                    document.getElementById('result').innerHTML = `
                        <p>The current temperature in ${location} is ${temperature}°C.</p>
                        <div>${suggestDiet(temperature)}</div>
                    `;
                } else {
                    document.getElementById('result').innerHTML = '<p>Sorry, could not retrieve the weather information. Please check the location and try again.</p>';
                }
            })
            .catch(error => {
                document.getElementById('result').innerHTML = '<p>Sorry, there was an error. Please try again later.</p>';
            });
    });
    
    function suggestDiet(temperature) {
        const temperatureRanges = [10, 20, 30];
        const dietSuggestions = [
            {
                breakfast: "Piping hot parathas with butter or stuffed parathas, and masala chai.",
                lunch: "Warm dal tadka with rice or roti and a side of vegetable curry.",
                dinner: "Hot soup with naan or chapati, and paneer curry.",
                snacks: "Hot pakoras or samosas with chai."
            },
            {
                breakfast: "Idli with sambar and coconut chutney, or poha.",
                lunch: "Aloo gobi with chapati or rajma chawal.",
                dinner: "Vegetable pulao with raita or roti with a mixed vegetable curry.",
                snacks: "Bhel puri or sev puri."
            },
            {
                breakfast: "Masala dosa or upma with coconut chutney.",
                lunch: "Chole with bhature or biryani with raita.",
                dinner: "Light khichdi with curd or roti with a light vegetable curry.",
                snacks: "Fruit chaat or dahi puri."
            },
            {
                breakfast: "Fresh fruits, yogurt, and a light smoothie.",
                lunch: "Salad with a variety of vegetables and a light dressing or cold pasta salad.",
                dinner: "Light cucumber and tomato sandwich or a bowl of chilled gazpacho.",
                snacks: "Watermelon slices or cucumber sticks."
            }
        ];
    
        const index = bisect(temperatureRanges, temperature);
        const suggestion = dietSuggestions[index];
    
        return `
            <div class="card"><strong>Breakfast:</strong> ${suggestion.breakfast}</div>
            <div class="card"><strong>Lunch:</strong> ${suggestion.lunch}</div>
            <div class="card"><strong>Dinner:</strong> ${suggestion.dinner}</div>
            <div class="card"><strong>Snacks:</strong> ${suggestion.snacks}</div>
        `;
    }
    
    function bisect(arr, x) {
        let low = 0;
        let high = arr.length;
    
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid] <= x) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
    
        return low;
    }
    