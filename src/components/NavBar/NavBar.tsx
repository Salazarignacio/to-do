import { Container, Nav, Button } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { PropTypes } from "./NavBar.types";

export function NavBardo(props: PropTypes) {
  const { openCloseModal } = props;
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand>Task Manager</Navbar.Brand>
        <Nav>
          <Button onClick={openCloseModal}>Crear Tarea</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
