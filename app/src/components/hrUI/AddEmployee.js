import React, { useState } from 'react'; 
import { Formik, Field, Form } from 'formik';
import axios from 'axios'; 
import './AddEmployee.css';

const AddEmployeeForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5555/employees', values);
      console.log('New Employee:', response.data);
      setMessage('Employee added successfully!'); 
    } catch (error) {
      console.error('Error adding employee:', error);
      setMessage('Error adding employee.'); 
    }
  };

  return (
    <div className='add-employee-form' style={{ marginLeft: "280px", marginTop:"20px"}}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          dept_id: ''
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>
            Email:
            <Field type="email" name="email" required />
          </label>
          <br />
          <label>
            Password:
            <Field type="password" name="password" required />
          </label>
          <br />
          <label>
            Department ID:
            <Field type="text" name="dept_id" required />
          </label>
          <br />
          <button type="submit">Add Employee</button>
        </Form>
      </Formik>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default AddEmployeeForm;
