import React from 'react';
import { Formik, Field, Form } from 'formik';

const AddEmployeeForm = () => {
  const handleSubmit = (values) => {
    // will andle communication with flask backend here
    console.log('New Employee:', values);
  };

  return (
    <Formik
      initialValues={{
        date_of_birth: '',
        employee_id: '',
        first_name: '',
        last_name: '',
        mantra: '',
        phone_contact: '',
        profile_photo: '',
        title: '',
        date_created: '',
        date_joined: ''
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <label>
          Date of Birth:
          <Field type="date" name="date_of_birth" required />
        </label>
        <br />
        <label>
          Employee ID:
          <Field type="text" name="employee_id" required />
        </label>
        <br />
        <label>
          First Name:
          <Field type="text" name="first_name" required />
        </label>
        <br />
        <label>
          Last Name:
          <Field type="text" name="last_name" required />
        </label>
        <br />
        <label>
          Mantra:
          <Field type="text" name="mantra" required />
        </label>
        <br />
        <label>
          Phone Contact:
          <Field type="number" name="phone_contact" required />
        </label>
        <br />
        <label>
          Profile Photo:
          <Field type="text" name="profile_photo" required />
        </label>
        <br />
        <label>
          Title:
          <Field type="text" name="title" required />
        </label>
        <br />
        <label>
          Date Created:
          <Field type="date" name="date_created" required />
        </label>
        <br />
        <label>
          Date Joined:
          <Field type="date" name="date_joined" required />
        </label>
        <br />
        <button type="submit">Add Employee</button>
      </Form>
    </Formik>
  );
};

export default AddEmployeeForm;
