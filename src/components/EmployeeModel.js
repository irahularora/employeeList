import React, { useContext, useEffect, useRef, useState } from "react";
import { EmployeeContext } from "../context/employee";

const employeeInitValues = {
  name: "",
  email: "",
  gender: "male",
  dob: "",
  salary: "",
  joiningDate: "",
  contact: "",
  status: "active",
};

export default function EmployeeModel(props) {
  const context = useContext(EmployeeContext);
  const { createEmployee, updateEmployee } = context;
  const [employee, setEmployee] = useState(employeeInitValues);
  const refclose = useRef(null);

  useEffect(() => {
    if (props.model.isEdit) {
      var employeeDetails = props.model.user;
      employeeDetails.dob = FormatDate(employeeDetails.dob);
      employeeDetails.joiningDate = FormatDate(employeeDetails.joiningDate);
      if (employeeDetails.relievingDate) {
        employeeDetails.relievingDate = FormatDate(
          employeeDetails.relievingDate
        );
      }
      setEmployee(employeeDetails);
    } else {
      setEmployee(employeeInitValues);
    }
  }, [props.model]);

  const FormatDate = (dateString) => {
    const inputDate = new Date(dateString);

    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    var finalValue = value;
    if (type === "date") {
      finalValue = value;
    }
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: type === "checkbox" ? checked : finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var response;
    if (props.model.isEdit) {
      response = await updateEmployee(employee);
    } else {
      response = await createEmployee(employee);
    }
    if (!response.ok) {
      var jsonData = await response.json();
      props.showAlert(jsonData.errors[0].msg, "danger");
      return;
    }
    var msg = props.model.isEdit
      ? "Employee Updated Successfully"
      : "Employee Created Successfully";
    props.showAlert(msg, "success");
    refclose.current.click();
  };
  return (
    <div>
      {" "}
      <button
        ref={props.refer}
        type="button"
        style={{ display: "none" }}
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.model.isEdit ? "Update Employee" : "Create Employee"}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{
                  border: "none",
                  background: "white",
                  fontSize: "1.3rem",
                }}
              >
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group my-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={employee.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="gender">Gender</label>
                  <select
                    className="form-control"
                    name="gender"
                    value={employee.gender}
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="form-group my-3">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={employee.dob}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="salary">Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Salary"
                    name="salary"
                    value={employee.salary}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="joiningDate">Joining Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="joiningDate"
                    value={employee.joiningDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="relievingDate">Relieving Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="relievingDate"
                    value={employee.relievingDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="contact">Contact</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter Contact"
                    name="contact"
                    value={employee.contact}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={employee.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {props.model.isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
