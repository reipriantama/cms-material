import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Header.module.css";
import { logout } from "../../../store/Auth";
import { useNavigate, createSearchParams } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Inner from "../InnerBar/Inner";

const Header = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth.email);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  

  const toggleHamburger = () => {
    setIsHamburgerActive(!isHamburgerActive);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChangeName = (event) => {
    setName(event.target.value.toLowerCase());
  };

  const handleSearch = async () => {
    console.log("Searching for:", name);
    navigate({
      pathname: "/cars",
      search: createSearchParams({
        name: name,
      }).toString(),
    });
  };

  return (
    <Navbar expand="lg" className="fixed-top shadow-sm bg-white">
      <div>{isHamburgerActive && <Inner hamburger={false} />} </div>
      <Container>
        <img
          className={styles.logo}
          src={`${process.env.PUBLIC_URL}/Assets/Dashboard/Logo.png`}
          alt="logo"
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
          <div
            className={styles.hamburgerMenu}
            isActive={(match) => {
              if (match) {
                setIsHamburgerActive(true);
              } else {
                setIsHamburgerActive(false);
              }
              return match !== null;
            }}
          >
            <RxHamburgerMenu
              onClick={toggleHamburger}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleChangeName}
              />
              <Button
                role="button"
                className={styles.searchButton}
                variant="outline-primary"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Form>
            <Nav.Link href="#link">{userEmail}</Nav.Link>
            <NavDropdown id="basic-nav-dropdown">
              <NavDropdown.Item
                href="#action/3.1"
                onClick={handleLogout}
                role="logout"
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
