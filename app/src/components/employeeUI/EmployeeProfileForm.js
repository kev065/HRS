import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EmployeeProfileForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      mantra: "",
      phone_contact: "",
      title: "",
      date_of_birth: "",
    },
    validationSchema: yup.object().shape({
      first_name: yup.string().required(),
      last_name: yup.string().required(),
      mantra: yup.string().required(),
      phone_contact: yup
        .string()
        .required()
        .min(10, "Phone contact must be atleast 10 characters"),
      title: yup.string().required(),
      date_of_birth: yup.date().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      fetch("/employeeProfiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          // clear out form fields
          formik.resetForm();
          //set success message
          setSuccess("Successfully Updated account!!");
          //navigate user to home page
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
          response.json().then((data) => console.log(data));
        } else {
          return response.json().then((err) => console.log(err));
        }
      });
    },
  });

  return (
    <div className="container">
      <div className="form-container">
        <form className="profile-form" onSubmit={formik.handleSubmit}>
          {error ? <h3 className="error">{error}</h3> : null}
          {success ? <h4 className="secondary-title">{success}</h4> : null}
          <div className="form-control">
            <label htmlFor="first_name">First Name</label>
            <br />
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div className="error">{formik.errors.first_name}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="last_name">Last Name</label>
            <br />
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div className="error">{formik.errors.last_name}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="mantra">Mantra</label>
            <br />
            <input
              type="text"
              id="mantra"
              name="mantra"
              value={formik.values.mantra}
              onChange={formik.handleChange}
            />
            {formik.touched.mantra && formik.errors.mantra ? (
              <div className="error">{formik.errors.mantra}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="phone_contact">Contact</label>
            <br />
            <input
              type="tel"
              id="phone_contact"
              name="phone_contact"
              value={formik.values.phone_contact}
              onChange={formik.handleChange}
            />
            {formik.touched.phone_contact && formik.errors.phone_contact ? (
              <div className="error">{formik.errors.phone_contact}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="error">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="date_of_birth">Date of Birth</label>
            <br />
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
            />
            {formik.touched.date_of_birth &&
            formik.errors.mantrdate_of_birth ? (
              <div className="error">{formik.errors.mantrdate_of_birth}</div>
            ) : null}
          </div>
          <div className="create-account-container">
            {/* <input type="submit" /> */}
            <button className="create-account-btn" type="submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeProfileForm;
