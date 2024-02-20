import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LeaveApprovalForm = () => {
  const handleSubmit = (values) => {
    // will handle backend communication here with flask
    console.log('Leave Approval:', values);
  };

  const validationSchema = Yup.object().shape({
    employee_id: Yup.string().required('Employee ID is required'),
    manager_approval: Yup.boolean().required('Manager approval is required'),
    hr_approval: Yup.boolean().required('HR approval is required')
  });

  return (
    <Formik
      initialValues={{
        employee_id: '',
        manager_approval: '',
        hr_approval: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label>
          Employee ID:
          <Field type="text" name="employee_id" />
          <ErrorMessage name="employee_id" component="div" />
        </label>
        <br />
        <label>
          Manager Approval:
          <Field type="checkbox" name="manager_approval" />
          <ErrorMessage name="manager_approval" component="div" />
        </label>
        <br />
        <label>
          HR Approval:
          <Field type="checkbox" name="hr_approval" />
          <ErrorMessage name="hr_approval" component="div" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default LeaveApprovalForm;
