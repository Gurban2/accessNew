import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { FaEye } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { deleteStaff } from '../../../store/reducers/staffReducer';
import '../UserPermissions/style.scss';

const ListUsers = () => {
  const staffs = useSelector((state) => state.staffs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Staff?')) {
      setIsLoading(true);
      dispatch(deleteStaff({ id }));
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/permissions/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/users/permissions/view/${id}`);
  };

  return (
    <div className="user-all-container">
      <div className="user-wrapper d-row">
        <nav className="breadcrumbs">
          <Link to="/">Dashboard</Link> &gt; <span>Users - All</span>
        </nav>

        <Button type="button">
          <Link to="/permissions/add-user">Add Users</Link>
        </Button>
      </div>
      <hr className="navigation-underline" />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, index) => (
            <tr key={staff.id}>
              <td>{index + 1}</td>
              <td>
                {staff.photo ? (
                  typeof staff.photo === 'string' ? (
                    <img
                      src={staff.photo}
                      alt={`${staff.name}`}
                      className="visitor-photo"
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(staff.photo)}
                      alt={`${staff.name}`}
                      className="visitor-photo"
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                    />
                  )
                ) : (
                  'No photo'
                )}
              </td>
              <td>{staff.name}</td>
              <td>{staff.phone}</td>
              <td>{staff.email}</td>
              <td>{staff.role}</td>
              <td className="">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleView(staff.id)}
                >
                  <FaEye /> View
                </button>{' '}
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(staff.id)}
                >
                  Edit
                </button>{' '}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(staff.id)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListUsers;
