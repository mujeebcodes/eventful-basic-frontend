import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import { formatDate } from "../utils/helpers";
import API_BASE_URL from "../config/config";
import { toast } from "react-toastify";
import Enrollment from "../components/Enrollment";

export const loader = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/users/enrollments`, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);

    return redirect("/users/login");
  }
};

const UserDashBoard = () => {
  const { currentUser } = useAppContext();
  const enrollments = useLoaderData();
  const navigate = useNavigate();

  const handleCancelEnrollment = async (enrollmentId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/events/enrollment/${enrollmentId}`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      return navigate(`/users/${currentUser.id}/dashboard`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>{`${currentUser.firstname} ${currentUser.lastname}`}</h2>
        </Col>
        <Col>
          <h2>{currentUser.email}</h2>
        </Col>
      </Row>
      <Row>
        <h3>Your upcoming events</h3>
        {enrollments.map((enrollment) => {
          return (
            <Enrollment
              key={enrollment.id}
              enrollment={enrollment}
              handleCancelEnrollment={handleCancelEnrollment}
            />
          );
        })}
      </Row>
    </Container>
  );
};
export default UserDashBoard;