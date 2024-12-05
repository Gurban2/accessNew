import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Form,
  Col,
  Row,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { addStaff } from '../../../store/reducers/staffReducer';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../UserPermissions/style.scss';
import { Link } from 'react-router-dom';

const AddUser = () => {
  const { data: offices } = useSelector((state) => state.offices);
  const departments = useSelector((state) => state.departments);
  const [, setError] = useState(null);
  const [, setLoading] = useState(false);
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
    active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleToggleActive = () => {
    setFormData({
      ...formData,
      active: !formData.active,
    });
  };
  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-10);
    setFormData({
      ...formData,
      password,
      confirmPassword: password,
    });
  };
  const handleCopyPassword = () => {
    navigator.clipboard
      .writeText(formData.password)
      .then(() => {
        toast.success('Password copied to clipboard!');
      })
      .catch((err) => {
        toast.error('Password copied to clipboard!');
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
      !formData.department ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.active
    ) {
      setError('All fields are required!');
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const uniqueId = Date.now().toString();
    const newFormData = {
      ...formData,
      id: uniqueId,
    };
    setLoading(true);
    dispatch(addStaff(newFormData));

    setFormData({
      id: '',
      name: '',
      username: '',
      email: '',
      phone: '',
      extension: '',
      position: '',
      role: '',
      office: '',
      department: '',
      password: '',
      confirmPassword: '',
      active: '',
    });
    setLoading(false);
    toast.success('User Successfully Added!');
  };

  return (
    <div className="user-add-container">
      <nav className="breadcrumbs">
        <Link to="/">Dashboard</Link> &gt;{' '}
        <Link to="/users/permissions/list">User & Permissions</Link> &gt;{' '}
        <span>Add User</span>
      </nav>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Form.Label className="form-label-head">
          Edit sections which want to change
        </Form.Label>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label className="form-label">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="username">
            <Form.Label className="form-label">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="email">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="phone">
            <Form.Label className="form-label">Phone</Form.Label>
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
            <Form.Label className="form-label">Extension</Form.Label>
            <Form.Control
              type="text"
              name="extension"
              value={formData.extension}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="position">
            <Form.Label className="form-label">Position</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="role">
            <Form.Label className="form-label">Role</Form.Label>
            <Form.Select
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">default</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="manager">Reception</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="office">
            <Form.Label className="form-label">Office</Form.Label>
            <Form.Select
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
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-12">
          <Form.Group as={Col} sm={3} controlId="department">
            <Form.Label className="form-label">Department</Form.Label>
            <Form.Select
              as="select"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option disabled>Select Department</option>
              {departments.departmentsData.map((department) => (
                <option key={department.id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="password">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="confirmPassword">
            <Form.Label className="form-label">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} sm={6}>
            <Form.Label className="form-label">Generated Password</Form.Label>
            <InputGroup>
              <Button variant="outline-secondary" onClick={handleCopyPassword}>
                Copy
              </Button>
              <FormControl value={formData.password || ''} readOnly />
              <Button variant="secondary" onClick={generatePassword}>
                Generate Password
              </Button>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} controlId="active">
            <Form.Label className="form-label">Active</Form.Label>
            <Form.Check
              type="switch"
              id="activeSwitch"
              label={formData.active ? 'Active' : 'Inactive'}
              checked={formData.active}
              onChange={handleToggleActive}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 d-flex justify-content-end">
          <Button as={Col} sm={1} variant="success" type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default AddUser;
