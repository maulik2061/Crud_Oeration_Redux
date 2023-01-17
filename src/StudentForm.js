import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { form, removeData } from "./Redux/Action/Action";
import { Table } from "react-bootstrap";
const StudentForm = () => {
  const [information, setInformation] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    hobby: [],
    semester: "",
    password: "",
    confirmPassword: "",
    edit: false,
  });
  const [validation, setValidation] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    Hobby: "",
    Semester: "",
    Password: "",
    ConfirmPassword: "",
  });
  const dispatch = useDispatch();
  const userValue = useSelector((state) => state.reduxCrud);
  const handleSaveUserInformation = () => {
    const error = { ...validation };
    if (information.firstName === "") {
      error.FirstName = "FirstName Is Required";
    }
    if (information.lastName === "") {
      error.LastName = "LastName Is Required";
    }
    if (information.gender === "") {
      error.Gender = "Gender Is Compulsury";
    }
    if (information.hobby.length === 0) {
      error.Hobby = "At Least One hobby Is Compulsury";
    }
    if (information.semester === "") {
      error.Semester = "Semester Is Required";
    }
    if (information.password === "") {
      error.Password = "Password Is Required";
    }
    if (information.confirmPassword === "") {
      error.ConfirmPassword = "Confirm Password Is Required";
    }
    if (information.confirmPassword !== information.password) {
      error.ConfirmPassword = "Password And ConfirmPassword Is Not Same";
    }
    setValidation(error);
    if (
      information.firstName !== "" &&
      information.lastName !== "" &&
      information.gender !== "" &&
      information.semester !== "" &&
      information.hobby.length !== 0 &&
      information.password !== "" &&
      information.confirmPassword !== "" &&
      information.confirmPassword === information.password
    ) {
      let editId = localStorage.getItem("editID");
      if (information.edit) {
        let myData = userValue[editId - 1];
        myData.FirstName = information.firstName;
        myData.LastName = information.lastName;
        myData.Gender = information.gender;
        myData.Hobby = information.hobby;
        myData.Semester = information.semester;
        myData.Password = information.password;
        myData.ConfirmPassword = information.confirmPassword;
      } else {
        dispatch(
          form({
            payload: {
              FirstName: information.firstName,
              LastName: information.lastName,
              Gender: information.gender,
              Hobby: information.hobby,
              Semester: information.semester,
              Password: information.password,
              ConfirmPassword: information.confirmPassword,
            },
          })
        );
      }
      setInformation({
        ...information,
        firstName: "",
        lastName: "",
        gender: "",
        hobby: [],
        semester: "",
        password: "",
        confirmPassword: "",
        edit: false,
      });
    }
  };
  useEffect(() => {
    if (information.firstName !== "") {
      setValidation({ ...validation, FirstName: "" });
    }
    if (information.lastName !== "") {
      setValidation({ ...validation, LastName: "" });
    }
    if (information.gender !== "") {
      setValidation({ ...validation, Gender: "" });
    }
    if (information.semester !== "") {
      setValidation({ ...validation, Semester: "" });
    }
    if (information.hobby.length !== 0) {
      setValidation({ ...validation, Hobby: "" });
    }
    if (information.password !== "") {
      setValidation({ ...validation, Password: "" });
    }
    if (information.confirmPassword !== "") {
      setValidation({ ...validation, ConfirmPassword: "" });
    }
  }, [information]);
  const handleOnChange = (e) => {
    debugger;
    const { name, value } = e.target;
    setInformation({ ...information, [name]: value });
  };
  const handleDeleteData = (id) => {
    debugger;
    dispatch(
      removeData({ payload: userValue.filter((item) => item.Id !== id) })
    );
  };

  const handleOnCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      let checkedValue = {
        ...information,
        hobby: [...information.hobby, value],
      };
      setInformation(checkedValue);
    } else {
      let unCheckValue = {
        ...information,
        hobby: information.hobby.filter((item) => item !== value),
      };
      setInformation(unCheckValue);
    }
  };
  const handleEditData = (id) => {
    debugger;
    localStorage.setItem("editID", id);
    const myData = userValue.filter((item) => item.Id === id);
    console.log(
      "🚀 ~ file: StudentForm.js:64 ~ handleEditData ~ myData",
      myData
    );
    let myUserValue = myData[0];
    console.log(
      "🚀 ~ file: StudentForm.js:65 ~ handleEditData ~ myUserValue",
      myUserValue
    );
    setInformation({
      ...information,
      firstName: myUserValue.FirstName,
      lastName: myUserValue.LastName,
      gender: myUserValue.Gender,
      hobby: myUserValue.Hobby,
      semester: myUserValue.Semester,
      password: myUserValue.Password,
      confirmPassword: myUserValue.ConfirmPassword,
      edit: true,
    });
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <h3>StudentForm Information</h3>
      </div>
      <Form.Group as={Row} className="d-flex justify-content-center">
        <Col sm="2">
          <Form.Label>First Name</Form.Label>
        </Col>
        <Col sm="5">
          <Form.Control
            type="text"
            placeholder="Enter Your First Name"
            name="firstName"
            value={information.firstName}
            onChange={handleOnChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center py-1">
        <Col sm="2"></Col>
        <Col sm="5">
          {<span style={{ color: "red" }}>{validation.FirstName}</span>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center">
        <Col sm="2">
          <Form.Label>Last Name</Form.Label>
        </Col>
        <Col sm="5">
          <Form.Control
            type="text"
            placeholder="Enter Your Last Name"
            name="lastName"
            value={information.lastName}
            onChange={handleOnChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center">
        <Col sm="2"></Col>
        <Col sm="5">
          {<span style={{ color: "red" }}>{validation.LastName}</span>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center py-1">
        <Col sm="2">
          <Form.Label>Gender</Form.Label>
        </Col>
        <Col sm="3">
          <Form.Check
            type="radio"
            label="Male"
            name="gender"
            id="Male"
            value={"Male"}
            checked={information.gender === "Male"}
            onChange={handleOnChange}
          />
        </Col>
        <Col sm="2">
          <Form.Check
            type="radio"
            label="Female"
            name="gender"
            id="Female"
            value={"Female"}
            checked={information.gender === "Female"}
            onChange={handleOnChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center">
        <Col sm="2"></Col>
        <Col sm="5">
          {<span style={{ color: "red" }}>{validation.Gender}</span>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center">
        <Col sm="2">
          <Form.Label>Hobby</Form.Label>
        </Col>
        <Col sm="1">
          <Form.Check
            type="checkbox"
            label="Cricket"
            id="cricket"
            name="hobby"
            value="Cricket"
            checked={
              information.hobby.filter((item) => item === "Cricket").length ===
              1
                ? true
                : false
            }
            onChange={handleOnCheckboxChange}
          />
        </Col>
        <Col sm="1">
          <Form.Check
            type="checkbox"
            label="Kabaddi"
            id="kabaddi"
            name="hobby"
            value="Kabaddi"
            checked={
              information.hobby.filter((item) => item === "Kabaddi").length ===
              1
                ? true
                : false
            }
            onChange={handleOnCheckboxChange}
          />
        </Col>
        <Col sm="1">
          <Form.Check
            type="checkbox"
            label="Chess"
            id="chess"
            name="hobby"
            value="Chess"
            checked={
              information.hobby.filter((item) => item === "Chess").length === 1
                ? true
                : false
            }
            onChange={handleOnCheckboxChange}
          />
        </Col>
        <Col sm="2">
          <Form.Check
            type="checkbox"
            label="Footboll"
            id="footboll"
            name="hobby"
            value="Footboll"
            checked={
              information.hobby.filter((item) => item === "Footboll").length ===
              1
                ? true
                : false
            }
            onChange={handleOnCheckboxChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center">
        <Col sm="2"></Col>
        <Col sm="5">
          {<span style={{ color: "red" }}>{validation.Hobby}</span>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center py-1">
        <Col sm="2">
          <Form.Label>Semester</Form.Label>
        </Col>
        <Col sm="5">
          <Form.Select
            name="semester"
            value={information.semester}
            onChange={handleOnChange}
          >
            <option value="" selected disabled>
              Select Your Semester
            </option>
            <option value="sem 1">Sem 1</option>
            <option value="sem 2">Sem 2</option>
            <option value="sem 3">Sem 3</option>
            <option value="sem 4">Sem 4</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center">
        <Col sm="2"></Col>
        <Col sm="5">
          {<span style={{ color: "red" }}>{validation.Semester}</span>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center py-1">
        <Col sm="2">
          <Form.Label>Password</Form.Label>
        </Col>
        <Col sm="5">
          <Form.Control
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={information.password}
            onChange={handleOnChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center">
        <Col sm="2"></Col>
        <Col sm="5">
          {<span style={{ color: "red" }}>{validation.Password}</span>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center py-1">
        <Col sm="2">
          <Form.Label>Confirm Password</Form.Label>
        </Col>
        <Col sm="5">
          <Form.Control
            type="password"
            placeholder="Enter Your Confirm Password"
            name="confirmPassword"
            value={information.confirmPassword}
            onChange={handleOnChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="d-flex justify-content-center">
        <Col sm="2"></Col>
        <Col sm="5">
          {<span style={{ color: "red" }}>{validation.ConfirmPassword}</span>}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="py-2">
        <Col sm="6"></Col>
        <Col sm="2">
          <Button onClick={handleSaveUserInformation}>
            {information.edit ? "Update" : "Submit"}
          </Button>
        </Col>
      </Form.Group>
      {userValue.length > 0 && (
        <>
          <Table striped bordered hover className="container my-2">
            <thead>
              <tr>
                <td>Id</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Gender</td>
                <td>Hobby</td>
                <td>Semester</td>
                <td>Password</td>
                <td>ConfirmPassword</td>
                <td>Action</td>
              </tr>
            </thead>
            {userValue.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{item.Id}</td>
                    <td>{item.FirstName}</td>
                    <td>{item.LastName}</td>
                    <td>{item.Gender}</td>
                    <td>{item.Hobby.join(",")}</td>
                    <td>{item.Semester}</td>
                    <td>{item.Password}</td>
                    <td>{item.ConfirmPassword}</td>
                    <td>
                      <Button
                        className="mx-2"
                        onClick={() => handleEditData(item.Id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="mx-2"
                        onClick={() => handleDeleteData(item.Id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </>
      )}
    </>
  );
};

export default StudentForm;
