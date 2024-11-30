import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Col, Row, InputGroup, FormControl, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { addStaff } from "../../../store/reducers/staffReducer";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUser = () => {
  const offices = useSelector((state) => state.offices);
  const departments = useSelector((state) => state.departments);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    extension: '',
    position: '',
    role: 'user',
    office: 'new-york',
    department: 'hr',
    password: '',
    confirmPassword: '',
    active: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleToggleActive = () => {
    setFormData({
      ...formData,
      active: !formData.active
    });
  };
  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-10);
    setFormData({
      ...formData,
      password,
      confirmPassword: password
    });
  };
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(formData.password).then(() => {
      // alert("Password copied to clipboard!");
      toast.success("Password copied to clipboard!");
    }).catch(err => {
      // alert("Failed to copy password: ", err);
      toast.error("Password copied to clipboard!");
    });
  };
  const validateForm = () => {
    setError(null);
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.extension ||      
      !formData.position ||
      !formData.role ||
      !formData.office ||
      !formData.department||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.active
    ) {
      setError("All fields are required!");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // alert('Form Submitted');
    const uniqueId = Date.now().toString();
    const newFormData = {
      ...formData,
      id: uniqueId,
    };
    setLoading(true);
    dispatch(addStaff(newFormData));

    setFormData({
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      extension: "",
      position: "",
      role: "",
      office:"",
      department: "",
      password:"",
      confirmPassword:"",
      active:"",
    });
    setLoading(false);
    toast.success("User Successfully Added!");
    // You can handle the form submission logic here (e.g., API request)
  };

  return (
    <div className="container mt-5">
      <h2>Create User</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="extension">
            <Form.Label>Extension</Form.Label>
            <Form.Control
              type="text"
              name="extension"
              value={formData.extension}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="position">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="manager">Reception</option>
              <option value="user">User</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="office">
            <Form.Label>Office</Form.Label>
            <Form.Control
              as="select"
              name="office"
              value={formData.office}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Office
              </option>
              {offices.map((office) => (
                <option key={office.id} value={office.name}>
                  {office.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.departmentsData.map((department) => (
                <option key={department.id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        {/* Display the generated password and add the copy button */}
        <Row className="mb-3 mt-3">
          <Form.Group as={Col}>
            <Form.Label>Generated Password</Form.Label>
            <InputGroup>
              <Button variant="outline-secondary" onClick={handleCopyPassword}>
                Copy
              </Button>
              <FormControl
                value={formData.password || ''}
                readOnly
              />
              <Button variant="secondary" onClick={generatePassword}>
                Generate Password
              </Button>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3 mt-3">
          <Form.Group as={Col} controlId="active">
            <Form.Label>Active</Form.Label>
            <Form.Check
              type="switch"
              id="activeSwitch"
              label={formData.active ? 'Active' : 'Inactive'}
              checked={formData.active}
              onChange={handleToggleActive}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;

