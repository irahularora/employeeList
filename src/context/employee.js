import { React, useState } from "react";
import { createContext } from "react";


const EmployeeContext = createContext()
const EmployeeState = (props) => {

    const host = "http://localhost:5000"
    const [employees, setEmployee] = useState([])

    // Fetch All Employee
    const getEmployees = async () => {
        const response = await fetch(`${host}/api/employee`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const json = await response.json()
            await setEmployee(json.users)
        }
        return response
    }

    // Create A Employee
    const createEmployee = async (employee) => {
        const response = await fetch(`${host}/api/employee/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": employee.name,
                "email": employee.email,
                "gender": employee.gender,
                "dob": employee.dob,
                "salary": employee.salary,
                "joiningDate": employee.joiningDate,
                "relievingDate": employee.relievingDate,
                "contact": employee.contact,
                "status": employee.status
            })
        });
        if (response.ok) {
            await getEmployees()
        }
        return response
    }

    // Delete A Employee
    const deleteEmployee = async (id) => {
        const response = await fetch(`${host}/api/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            await getEmployees()
        }
        return response
    }


    // Update Employee
    const updateEmployee = async (employee) => {
        const response = await fetch(`${host}/api/employee/${employee._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": employee.name,
                "email": employee.email,
                "gender": employee.gender,
                "dob": employee.dob,
                "salary": employee.salary,
                "joiningDate": employee.joiningDate,
                "contact": employee.contact,
                "status": employee.status
            })
        });
        if (response.ok) {
            await getEmployees()
        }
        return response
    }

    return (
        <EmployeeContext.Provider value={{ employees, getEmployees, createEmployee, deleteEmployee, updateEmployee }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeState;
export { EmployeeContext }