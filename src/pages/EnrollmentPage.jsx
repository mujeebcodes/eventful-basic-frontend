import axios from "axios";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import API_BASE_URL from "../config/config";
import { formatDate } from "../utils/helpers";

export const loader = async (enrollId) => {
  try {
    console.log(enrollId);
    const response = await axios.get(
      `${API_BASE_URL}/users/enrollments/${enrollId}`,
      { withCredentials: true }
    );
    const enrollment = response.data;
    console.log(enrollment);
    return enrollment;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const EnrollmentPage = () => {
  const enrollment = useLoaderData();

  return (
    <Container className="my-4">
      <h4 className="text-center">
        Kindly visit the Event Organizer's office on the event date to scan this
        QR code for event access
      </h4>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <Image src={enrollment.QRCode} alt="QR Code" fluid />
        </Col>
        <Col xs={12} md={6} className="mt-4">
          <h3 className="mb-3">Enrollment Details</h3>
          <p>
            <strong>Event Title:</strong> {enrollment.event.title}
          </p>
          <p>
            <strong>Enrollment Date:</strong>{" "}
            {formatDate(enrollment.enrollmentDate)}
          </p>
          <p>
            <strong>User:</strong>{" "}
            {`${enrollment.user.firstname} ${enrollment.user.lastname}`}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default EnrollmentPage;
