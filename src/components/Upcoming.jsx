import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import API_BASE_URL from "../config/config";
import { useAppContext } from "../App";

const Upcoming = () => {
  const { upcomingEvents } = useAppContext();
  // const [upcomingEvents, setUpcomingEvents] = useState(
  //   JSON.parse(localStorage.getItem("upcoming")) || []
  // );
  // useEffect(() => {
  //   const fetchUpcoming = async () => {
  //     const response = await axios.get(`${API_BASE_URL}/events`);
  //     const upcomingEvents = response.data;
  //     console.log(upcomingEvents);
  //     localStorage.setItem("upcoming", JSON.stringify(upcomingEvents));
  //   };
  //   fetchUpcoming();
  // }, []);
  return (
    <Container style={{ maxWidth: "70%" }}>
      <h3>Upcoming Events</h3>
      <main>
        <Row xs={1} md={2} lg={3}>
          {upcomingEvents ? (
            upcomingEvents.map((event) => (
              <Col key={event.id}>
                <Card style={{ width: "18rem", marginBottom: "20px" }}>
                  <Link to={`/events/${event.id}`}>
                    <Card.Img variant="top" src={event.eventImg} />
                    <Card.Title>{event.title}</Card.Title>
                    <Row>
                      <Col>Category: {event.category}</Col>
                      <Col>Organizer: {event.organizer.organizationName}</Col>
                    </Row>
                    <Row>
                      <Col>When: {formatDate(event.when, 1)}</Col>
                      <Col>Venue: {event.venue}</Col>
                    </Row>
                  </Link>
                </Card>
              </Col>
            ))
          ) : (
            <p>No events scheduled</p>
          )}
        </Row>
      </main>
    </Container>
  );
};
export default Upcoming;
