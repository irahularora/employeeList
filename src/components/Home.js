import React, { useState } from 'react'
import Navbar from './Navbar'
import EmployeList from './EmployeeList'
import Alert from './Alert';

export default function Home() {
    const [alert, setAlert] = useState(null);

    const showAlert = (msg, type) => {
        setAlert({
            msg: msg,
            type: type,
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };
    return (
        <div>
            <Navbar />
            <Alert mess={alert} />

            <div style={{ marginTop: '1.5rem' }}>
                <EmployeList showAlert={showAlert} />
            </div>
        </div>
    )
}
