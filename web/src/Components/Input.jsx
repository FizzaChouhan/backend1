import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import axios from 'axios';

function SearchInput() {
  const inputRef = useRef(null); // Initialize ref
  const [weatherData, setWeatherData] = useState(null); // State to store weather data

  const handleSearch = async () => {
    const searchValue = inputRef.current.value; // Access the input value
    if (searchValue.trim() === '') {
      alert('Please enter a city name.');
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=7d906e9f0351e638992abff228bd03f9&units=metric`
      );
      console.log('Weather Data:', response.data);
      setWeatherData(response.data); // Store API response in state
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(src/assets/download.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          padding: '30px',
          borderRadius: '15px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          width: '90%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            inputRef={inputRef}
            placeholder="Search for a city"
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px 0 0 25px',
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
                '& input': {
                  color: 'white',
                },
              },
            }}
          />
          <IconButton
            onClick={handleSearch}
            sx={{
              borderRadius: '0 25px 25px 0',
              padding: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        {weatherData && (
          <Box sx={{ marginTop: '20px', color: 'white' }}>
            <h3>Weather in {weatherData.name}</h3>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        style={{ marginRight: '10px' }}
      />
      <p>Condition: {weatherData.weather[0].description}</p>
    </Box>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Condition: {weatherData.weather[0].description}</p>
            <p>feels_like {weatherData?.main?.feels_like}</p>
            <p>humidity {weatherData?.main?.humidity}</p>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SearchInput;