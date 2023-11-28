const express = require('express')
const Employee = require('../models/employee');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Fetch All Employees using: GET "/api/employee".
router.get('/', async (req, res) => {
    try {
        const allUsers = await Employee.find();
        res.json({ success: true, users: allUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Create Employee using: POST "/api/employee/new".
router.post('/new', [
    body('name', 'Enter a Valid name').isLength({ min: 3 }),
    body('email', "Enter a Valid Email").isEmail(),
    body('gender', 'Gender is required').notEmpty(),
    body('dob', 'Date of Birth is required').isISO8601(),
    body('salary', 'Salary is required').notEmpty(),
    body('joiningDate', 'Invalid Joining Date').isISO8601(),
    body('relievingDate', 'Invalid Relieving Date').optional().isISO8601(),
    body('contact', 'Invalid Contact').notEmpty(),
    body('status', 'Invalid Status').isIn(['active', 'inactive']),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, gender, dob, salary, joiningDate, relievingDate, contact, status } = req.body;

        // Check wheter the user with same email exists already
        let emp = await Employee.findOne({ email: email })
        if (emp) {
            return res.status(400).json({ sucess: false, error: "Employee Already Exists" })
        }

        let newEmp = await Employee.create({
            name: name,
            email: email,
            gender: gender,
            dob: dob,
            salary: salary,
            joiningDate: joiningDate,
            relievingDate: relievingDate,
            contact: contact,
            status: status,
        })
        if (newEmp) {
            res.json({ success: true, msg: "Employee Successfully Created" })
        }
    } catch (error) {
        return res.status(500).json({ error: "Something Went Wrong" })
    }
})

// Update Employee using: PUT "/api/employee/:id".
router.put('/:id', [
    body('name', 'Enter a Valid name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('gender', 'Gender is required').notEmpty(),
    body('dob', 'Date of Birth is required').notEmpty(),
    body('salary', 'Salary is required').notEmpty(),
    body('joiningDate', 'Invalid Joining Date').isISO8601(),
    body('relievingDate', 'Invalid Relieving Date').optional().isISO8601(),
    body('contact', 'Invalid Contact').notEmpty(),
    body('status', 'Invalid Status').isIn(['active', 'inactive']),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedUser = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, msg: 'User successfully updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

// Delete Employee using: DELETE "/api/employee/:id".
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, msg: 'User successfully deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});


module.exports = router 