import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Button, Form, Col, Row, InputGroup, FormControl, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUser = () => {
  const offices = useSelector((state) => state.offices);
  const departments = useSelector((state) => state.departments);
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
    const password = Math.random().toString(36).slice(-10);  // Generate random password
    setFormData({
      ...formData,
      password,
      confirmPassword: password  // Ensure both password and confirmPassword are identical
    });
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(formData.password).then(() => {
      toast.success("Password copied to clipboard!");
    }).catch(err => {
      toast.error("Failed to copy password.");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("User Successfully Added!");
    // Add your form submission logic here (e.g., API request)
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
              <option value="reception">Reception</option>
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
              <option value="" disabled>Select Office</option>
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
              <option value="" disabled>Select Department</option>
              {departments.departmentsData.map((department) => (
                <option key={department.id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>

        {/* Password Fields */}
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

        {/* Always show the password input and generate password section */}
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

        {/* Active Toggle */}
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} controlId="active">
            <Form.Label>Active</Form.Label>
            <ToggleButtonGroup
              type="checkbox"
              value={formData.active ? 1 : 0}
              onChange={handleToggleActive}
            >
              <ToggleButton variant="outline-success" value={1}>
                Active
              </ToggleButton>
              <ToggleButton variant="outline-danger" value={0}>
                Inactive
              </ToggleButton>
            </ToggleButtonGroup>
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
