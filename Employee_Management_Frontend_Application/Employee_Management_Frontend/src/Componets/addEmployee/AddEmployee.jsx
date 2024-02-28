import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddEmployeeDetailsSchema } from "./AddEmployeeDetailsSchema";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import {
  EmployeeCountryName,
  EmployeeDesignation,
  Employee_Gender,
  Server_Error_Message,
} from "../../../public/UtilData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  employeeManagement_base_URL,
  employeeManagement_employeeDetails_postEmployeeDetails_URL,
} from "../../../public/ApiUrl";
import { Employee_Image_Cloud_URL } from "../../../public/ApiUrl";
function AddEmployee() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !sessionStorage.getItem("isLoggedIn") ||
      sessionStorage.getItem("isLoggedIn") === "false"
    ) {
      navigate("/login");
    }
  }, []);

  const [imageData, setImageData] = useState();
  const [imageUrl, setImageUrl] = useState();
  const employeeIntialValue = {
    employeeId: "",
    employeeFirstName: "",
    employeeLastName: "",
    employeeMobileNo: "",
    employeeEmail: "",
    employeeCountry: "",
    employeeDesignation: "",
    employeeAddressCity: "",
    employeeSalaryPerMonth: "",
    employeeGender: "",
    employeeImageUrl: "",
  };
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: employeeIntialValue,
      onSubmit: (values, action) => {
        for (let i = 0; i < 10; i++) {
          upload();
        }
        values.employeeImageUrl = imageUrl;
        sessionStorage.setItem("employeeImageUrl", imageUrl);
        values.employeeEmail = sessionStorage.getItem("registrationEmail");
       
        axios
          .post(
            employeeManagement_base_URL +
              employeeManagement_employeeDetails_postEmployeeDetails_URL,
            values
          )
          .then(() => {
            sessionStorage.setItem("employeeImageUrl", values.employeeImageUrl);
            toast.success(
              "Employee Added Successfully with Employee Id:" +
                values.employeeId
            );
            setImageUrl({});
            action.resetForm();
          })
          .catch((error) => {
            
            if (
              error.response.data.exceptionMessage ===
              "Employee With Employee Id " +
                values.employeeId +
                " Already exists"
            ) {
              toast.warning(
                "Employee With Employee Id: " +
                  values.employeeId +
                  " Already exists"
              );
            } else if (
              error.response.data.exceptionMessage ===
              "Employee Already With Email Id: " +
                sessionStorage.getItem("registrationEmail")
            ) {
              toast.warning(
                "Employee Already Exists With Email Id: " +
                  sessionStorage.getItem("registrationEmail")
              );
            } else {
              toast.warning(Server_Error_Message);
            }
          });
      },
      validationSchema: AddEmployeeDetailsSchema,
    });
  const upload = () => {
    const data = new FormData();
    data.append("file", imageData);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dwnlcx35q");
    fetch(Employee_Image_Cloud_URL, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleImageChange = (event) => {
    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      setImageData(event.target.files[0]);
    } else {
      toast.error("Invalid image file");
    }
  };
  return (
    <div style={{ margin: "5px" }}>
      <Container style={{ marginLeft: "400px", display: "flex" }}>
        <Row>
          <Col>
            <Card
              style={{
                marginTop: "80px",
                width: "60rem",
                //  textAlign: 'center',
                height: "500px",
                marginLeft: "-220px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  Add Employee
                </Card.Title>
                <Card.Img src=""></Card.Img>
                <Card.Text>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col>
                        <div style={{ paddingBottom: "10px" }}>
                          <label> Id</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            onBlur={handleBlur}
                            type="number"
                            value={
                              values.employeeId > 0
                                ? values.employeeId
                                : !values.priviousProjectId
                                ? ""
                                : 0
                            }
                            onChange={handleChange}
                            name="employeeId"
                          ></input>
                          {errors.employeeId && touched.employeeId ? (
                            <Alert
                              style={{
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeId}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div style={{ paddingBottom: "10px" }}>
                          <label> Phone Number</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            onBlur={handleBlur}
                            type="text"
                            value={values.employeeMobileNo}
                            onChange={handleChange}
                            name="employeeMobileNo"
                          ></input>
                          <br></br>
                          {errors.employeeMobileNo &&
                          touched.employeeMobileNo ? (
                            <Alert
                              style={{
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeMobileNo}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div style={{ paddingBottom: "10px" }}>
                          <label> First Name</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            type="text"
                            onBlur={handleBlur}
                            value={values.employeeFirstName}
                            onChange={handleChange}
                            name="employeeFirstName"
                          ></input>
                          <br></br>
                          {errors.employeeFirstName &&
                          touched.employeeFirstName ? (
                            <Alert
                              style={{
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeFirstName}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div style={{ paddingBottom: "10px" }}>
                          <label>Last Name</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            onBlur={handleBlur}
                            type="text"
                            value={values.employeeLastName}
                            onChange={handleChange}
                            name="employeeLastName"
                          ></input>
                          <br></br>
                          {errors.employeeLastName &&
                          touched.employeeLastName ? (
                            <Alert
                              style={{
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeLastName}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div style={{ paddingBottom: "10px" }}>
                          <label>Address City</label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            type="text"
                            value={values.employeeAddressCity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="employeeAddressCity"
                          ></input>
                          <br></br>
                          {errors.employeeAddressCity &&
                          touched.employeeAddressCity ? (
                            <Alert
                              style={{
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeAddressCity}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div style={{ paddingBottom: "10px" }}>
                          <label>Designation</label>
                          <Form.Select
                            style={{ width: "400px" }}
                            name="employeeDesignation"
                            value={values.employeeDesignation}
                            onChange={handleChange}
                          >
                            {EmployeeDesignation.map((employeeDesg, index) => (
                              <option
                                key={index}
                                onBlur={handleBlur}
                                value={employeeDesg}
                              >
                                {employeeDesg}
                              </option>
                            ))}
                            {errors.employeeDesignation ? (
                              <Alert
                                style={{
                                  marginTop: "2px",
                                  paddingBottom: "30px",
                                  height: "40px",
                                  width: "400px",
                                }}
                                variant="danger"
                              >
                                {errors.employeeDesignation}
                              </Alert>
                            ) : null}
                          </Form.Select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div style={{ paddingBottom: "10px" }}>
                          <label>Salary Per month </label>
                          <br></br>
                          <input
                            style={{ width: "400px" }}
                            type="number"
                            value={values.employeeSalaryPerMonth}
                            onChange={handleChange}
                            name="employeeSalaryPerMonth"
                            onBlur={handleBlur}
                          ></input>
                          <br></br>
                          {errors.employeeSalaryPerMonth &&
                          touched.employeeSalaryPerMonth ? (
                            <Alert
                              style={{
                                marginTop: "2px",
                                paddingBottom: "30px",
                                height: "40px",
                                width: "400px",
                              }}
                              variant="danger"
                            >
                              {errors.employeeSalaryPerMonth}
                            </Alert>
                          ) : null}
                        </div>
                      </Col>
                      <Col>
                        <div style={{ paddingBottom: "10px" }}>
                          <label>Country</label>
                          <Form.Select
                            style={{ width: "400px" }}
                            name="employeeCountry"
                            value={values.employeeCountry}
                            onChange={handleChange}
                          >
                            {EmployeeCountryName.map((CountryName, index) => (
                              <option
                                key={index}
                                onBlur={handleBlur}
                                value={CountryName}
                              >
                                {CountryName}
                              </option>
                            ))}
                            {errors.employeeCountry ? (
                              <Alert
                                style={{
                                  marginTop: "2px",
                                  paddingBottom: "30px",
                                  height: "40px",
                                  width: "400px",
                                }}
                                variant="danger"
                              >
                                {errors.employeeCountry}
                              </Alert>
                            ) : null}
                          </Form.Select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Row>
                          <Col>
                            <div
                              style={{
                                paddingBottom: "10px",
                                marginLeft: "0px",
                              }}
                            >
                              Gender
                            </div>
                            <Form.Select
                              style={{ width: "400px" }}
                              name="employeeGender"
                              value={values.employeeGender}
                              onChange={handleChange}
                            >
                              {Employee_Gender.map((gender, index) => (
                                <option
                                  key={index}
                                  onBlur={handleBlur}
                                  value={gender}
                                >
                                  {gender}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col>
                          <h6
                              style={{ marginLeft: "0px", paddingTop: "5px" }}
                            >
                              Image
                            </h6>
                            <input
                           
                              onChange={handleImageChange}
                              style={{ marginLeft: "0px" }}
                              type="file"
                            ></input>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {" "}
                            <Button
                              variant="danger"
                              style={{
                                width: "150px", marginTop:'10px'
                              }}
                              onClick={() => {
                                navigate(-1);
                              }}
                              disabled={false}
                            >
                              Cancel
                            </Button>
                          </Col>
                          <Col></Col>
                          <Col></Col>
                          <Col></Col>
                          <Col>
                            <div>
                              <Button
                                style={{ width: "150px", margin: "2px" }}
                                type="submit"
                              >
                                Add
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default AddEmployee;
