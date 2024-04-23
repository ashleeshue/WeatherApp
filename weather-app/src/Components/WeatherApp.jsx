import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import "./WeatherApp.css"; // Custom CSS for WeatherApp styling

const WeatherApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const API_KEY = 'bf0f4b955f7b097b3c6172ad08d91a67';
      const API_Page = `https://api.openweathermap.org`
      const API_URL = `${API_Page}/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}&units=imperial`;

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("City not found. Please enter a valid city name.");
      }

      const data = await response.json();
      setWeatherData((prevData) => [...prevData, data]); // Add new data to the array
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
    setSearchTerm(""); // Clear the search term after search
  };

  const handleRemoveCard = (index) => {
    setWeatherData((prevData) => prevData.filter((_, i) => i !== index));
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
        {weatherData.map((data, index) => (
          <Col key={index}>
            <Card className="weather-card">
              <Card.Body>
                <Card.Title className="card-title">{data.name}</Card.Title>
                <Card.Text>Temperature: {data.main.temp}°F</Card.Text>
                <Card.Text>Weather: {data.weather[0].description}</Card.Text>
                <Card.Text>Wind Speed: {data.wind.speed} miles/hr</Card.Text>
                <Card.Text>Humidity: {data.main.humidity}%</Card.Text>
                <Button variant="danger" onClick={() => handleRemoveCard(index)}>Remove</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WeatherApp;
