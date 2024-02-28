import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Github_Account_URL,
  Github_logo_URL,
  Hr_Management_URL,
  Instagram_Account_URL,
  Instagram_logo_URL,
  Leetcode_Account_URL,
  Leetcode_logo_URL,
  Linkdin_Account_URL,
  Linkdin_logo_URL,
  Manager_Management_URL,
  Project_Management_URL,
  Senior_Manager_Management_URL,
  Team_Lead_Management_URL,
  Twitter_Account_URL,
  Twitter_logo_URL,
} from "../../../public/ApiUrl";

function Footer() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <div
              style={{
                color: "green",
                fontWeight: "630",
                fontSize: "25px",
                marginTop: "50px",
              }}
            >
              Social Media
            </div>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <div style={{ marginRight: "5px" }}>
                  <a
                    href={Instagram_Account_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                      src={Instagram_logo_URL}
                      alt="Coding Beauty logo"
                    ></img>
                  </a>
                </div>
              </Col>
              <Col>
                <div>
                  <a
                    href={Linkdin_Account_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                      }}
                      src={Linkdin_logo_URL}
                      alt="Coding Beauty logo"
                    ></img>
                  </a>
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    backgroundColor: "black",
                    width: "32px",
                    height: "32px",
                    marginLeft: "20px",
                    borderRadius: "50%",
                  }}
                >
                  <a
                    href={Leetcode_Account_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                      }}
                      src={Leetcode_logo_URL}
                      alt="Coding Beauty logo"
                    ></img>
                  </a>
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    backgroundColor: "black",
                    width: "32px",
                    height: "32px",
                    marginLeft: "20px",
                    borderRadius: "50%",
                  }}
                >
                  <a
                    href={Twitter_Account_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                      }}
                      src={Twitter_logo_URL}
                      alt="Coding Beauty logo"
                    ></img>
                  </a>
                </div>
              </Col>
              <Col>
                {" "}
                <div
                  style={{
                    backgroundColor: "black",
                    width: "32px",
                    height: "32px",
                    marginLeft: "20px",
                    borderRadius: "50%",
                  }}
                >
                  <a href={Github_Account_URL} target="_blank" rel="noreferrer">
                    <img
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                      }}
                      src={Github_logo_URL}
                      alt="Coding Beauty logo"
                    ></img>
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <div
              style={{ color: "green", fontWeight: "630", fontSize: "25px",marginTop:'50px' }}
            >
              Company
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href="/aboutUs"
                style={{ color: "white", textDecoration: "none" }}
              >
                About Us
              </a>
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href="/contactUs"
                style={{ color: "white", textDecoration: "none" }}
              >
                Contact Us
              </a>
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href="/legal"
                style={{ color: "white", textDecoration: "none" }}
              >
                Legal
              </a>
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href="/carrers"
                style={{ color: "white", textDecoration: "none" }}
              >
                Carrers
              </a>
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href="/solution"
                style={{ color: "white", textDecoration: "none" }}
              >
                Solution
              </a>
            </div>
          </Col>
          <Col>
            <div
              style={{ color: "green", fontWeight: "630", fontSize: "25px",marginTop:'50px' }}
            >
              Company Management
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href={Hr_Management_URL}
                style={{ color: "white", textDecoration: "none" }}
              >
                Hr Management
              </a>
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href={Manager_Management_URL}
                style={{ color: "white", textDecoration: "none" }}
              >
                Manager Management
              </a>
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href={Team_Lead_Management_URL}
                style={{ color: "white", textDecoration: "none" }}
              >
                Team Lead Management
              </a>
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href={Senior_Manager_Management_URL}
                style={{ color: "white", textDecoration: "none" }}
              >
                Senior Manager Management
              </a>
            </div>
            <div style={{ margin: "15px" }}>
              <a
                href={Project_Management_URL}
                style={{ color: "white", textDecoration: "none" }}
              >
                Project Management
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
