import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  // useParams is used to get the id from the URL if needed
  const { id } = useParams();

  // useNavigate is used to programmatically navigate to different routes
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          const employee = response.data;
          setFirstName(employee.firstName);
          setLastName(employee.lastName);
          setEmail(employee.email);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, [id]);

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      // Simple email regex for validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        errorsCopy.email = "";
      } else {
        errorsCopy.email = "Please enter a valid email address";
        valid = false;
      }
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpadateEmployee(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const employee = {
      firstName,
      lastName,
      email,
    };
    // If id exists, update the employee, otherwise create a new one
    if (id) {
      updateEmployee(id, employee)
        .then((response) => {
          console.log(response.data);
          navigator("/employees");
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    } else {
      createEmployee(employee).then((response) => {
        console.log(response.data);
        navigator("/employees");
      }).catch((error) => {
        console.error("Error creating employee:", error);
      });
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container-fluid content-wrapper">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control${
                    errors.firstName ? " is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control${
                    errors.lastName ? " is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control${errors.email ? " is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-sm btn-success"
                onClick={saveOrUpadateEmployee}
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
