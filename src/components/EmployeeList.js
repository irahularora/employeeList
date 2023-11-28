import React, { useContext, useEffect, useRef, useState } from "react";
import { EmployeeContext } from "../context/employee";
import EmployeeModel from "./EmployeeModel";

export default function EmployeList(props) {
  const context = useContext(EmployeeContext);
  const { getEmployees, employees, deleteEmployee } = context;
  const [modelEmployee, setModelEmployee] = useState({
    isEdit: false,
    user: {},
  });
  const ref = useRef(null);

  useEffect(() => {
    getEmployees();
  }, []);

  const createEmploye = async () => {
    await setModelEmployee({
      isEdit: false,
      user: [],
    });
    ref.current.click();
  };

  const updateEmployee = async (emp) => {
    await setModelEmployee({
      isEdit: true,
      user: emp,
    });
    ref.current.click();
  };

  const removeEmployee = async (emp) => {
    await deleteEmployee(emp._id);
    props.showAlert("Employee Deleted Successfully", "success");
  };

  return (
    <div className="con-1">
      <EmployeeModel
        refer={ref}
        model={modelEmployee}
        showAlert={props.showAlert}
      />
      <div className="table-head">
        <h1>Employee LIst</h1>
        <button
          type="button"
          className="btn1 btn-primary"
          onClick={() => createEmploye()}
        >
          Create New Employee
        </button>
      </div>
      <div className="table-container">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Sno</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">DOB</th>
              <th scope="col">Salary</th>
              <th scope="col">Joining Date</th>
              <th scope="col">Relieving Date</th>
              <th scope="col">Contact</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => {
              const isActive = employee.status === "active";
              const statusStyle = {
                color: isActive ? "green" : "red",
                fontWeight: "bold",
                textTransform: "capitalize",
              };

              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textTransform: "capitalize" }}>
                    {employee.name}
                  </td>
                  <td>{employee.email}</td>
                  <td style={{ textTransform: "uppercase" }}>
                    {employee.gender}
                  </td>
                  <td>{new Date(employee.dob).toLocaleDateString("en-GB")}</td>
                  <td>{employee.salary}</td>
                  <td>
                    {new Date(employee.joiningDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    {employee.relievingDate
                      ? new Date(employee.relievingDate).toLocaleDateString(
                          "en-GB"
                        )
                      : "NA"}
                  </td>
                  <td>{employee.contact}</td>
                  <td style={statusStyle}>{employee.status}</td>
                  <td>
                    <div className="action">
                      <i
                        className="fa-solid fa-pen-to-square mx-2"
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => updateEmployee(employee)}
                      ></i>
                      <i
                        className="fa-solid fa-trash-can"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => removeEmployee(employee)}
                      ></i>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
