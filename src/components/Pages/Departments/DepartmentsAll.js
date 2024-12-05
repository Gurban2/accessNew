import React, { useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppPaths } from '../../../constants/appPaths';
import DataTable from '../../../modules/DataTable';
import { deleteDepartment } from '../../../store/reducers/departmentReducer';
import Breadcrumb from '../Breadcrumb';
import './style.scss';

const DepartmentsAll = () => {
  const { t } = useTranslation();

  const departments = useSelector(
    (state) => state.departments.departmentsData || []
  );
  const [searchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter departments based on the search query
  const filteredDepartments = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return departments?.filter(
      (department) =>
        department.name.toLowerCase().includes(query) ||
        department.phone.toLowerCase().includes(query) ||
        department.office.toLowerCase().includes(query)
    );
  }, [searchQuery, departments]);

  const handleDelete = (id) => {
    if (window.confirm(t('department.deleteConfirm'))) {
      dispatch(deleteDepartment({ id }));
    }
  };

  const handleEdit = (id) => {
    navigate(`/departments/edit/${id}`);
  };

  // Head items for the DataTable
  const headItems = [
    '#',
    t('department.all.name'),
    t('department.all.phone'),
    t('department.all.office'),
    t('department.all.actions'),
  ];

  // Format items for the DataTable
  const items = filteredDepartments.map((department, index) => ({
    id: department.id,
    departmentName: department.name,
    phone: department.phone,
    office: department.office,
    actions: (
      <>
        <Button
          variant="warning"
          className="w-100"
          onClick={() => handleEdit(department.id)}
        >
          <FaEdit />
        </Button>{' '}
        <Button
          variant="danger"
          className="w-100"
          onClick={() => handleDelete(department.id)}
        >
          <FaRegTrashAlt />
        </Button>
      </>
    ),
  }));

  return (
    <div className="departments-all-container">
      <div className="departments-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t('breadcrumb.dashboard'), to: AppPaths.dashboard.home },
            {
              label: t('breadcrumb.departments'),
              to: AppPaths.departments.all,
            },
          ]}
        />
        <div className="searchAddBtn">
          <Button type="button">
            <Link to="/departments/add">{t('department.all.add')}</Link>
          </Button>
        </div>
      </div>
      <hr className="navigation-underline" />

      <DataTable
        withAction
        headItems={headItems}
        tableProps={{ striped: true, bordered: true, hover: true }}
        items={items}
      />
    </div>
  );
};

export default DepartmentsAll;
