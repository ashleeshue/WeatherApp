import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";

const WeatherApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data when component mounts
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
        const API_KEY = 'bf0f4b955f7b097b3c6172ad08d91a67';
        const API_Page = `https://api.openweathermap.org`
        const API_URL = `${API_Page}/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}`;
       
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("City not found. Please enter a valid city name.");
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const handleRemoveCard = () => {
    setWeatherData(null);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Weather App</h1>

      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group controlId="formCity">
          <Form.Label>Enter City Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row xs={1} md={2} lg={3} className="g-4">
        {weatherData && (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{weatherData.name}</Card.Title>
                <Card.Text>Temperature: {weatherData.main.temp}°C</Card.Text>
                <Card.Text>Weather: {weatherData.weather[0].description}</Card.Text>
                <Card.Text>Wind Speed: {weatherData.wind.speed} m/s</Card.Text>
                <Card.Text>Humidity: {weatherData.main.humidity}%</Card.Text>
                <Button variant="danger" onClick={handleRemoveCard}>Remove</Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default WeatherApp;
