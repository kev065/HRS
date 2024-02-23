import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { retrieve } from "../Encryption";
import "./employeeform.css";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const employeeProfileData = retrieve().employee.employee_profiles[0];

  const formik = useFormik({
    initialValues: {
      first_name: employeeProfileData.first_name,
      last_name: employeeProfileData.last_name,
      mantra: employeeProfileData.mantra,
      phone_contact: employeeProfileData.phone_contact,
      title: employeeProfileData.title,
      date_of_birth: employeeProfileData.date_of_birth,
      profile_photo: "",
    },
    validationSchema: yup.object().shape({
      first_name: yup.string(),
      last_name: yup.string(),
      mantra: yup.string(),
      phone_contact: yup
        .string()

        .min(10, "Phone contact must be atleast 10 characters"),
      title: yup.string(),
      date_of_birth: yup.date(),
      profile_photo: yup.string(),
    }),
    onSubmit: (values) => {
      console.log(values);
      fetch(`/employeeProfiles/${employeeProfileData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + retrieve().access_token,
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
    <div className='content-wrapper' sstyle={{ marginLeft: "10px", backgroundColor:"white", marginTop:"40px"}}>
    <div className="container">
      <div className="form-container">
        <form className="profile-form" onSubmit={formik.handleSubmit}>
          {error ? <h3 className="error">{error}</h3> : null}
          {success ? <h4 className="secondary-title">{success}</h4> : null}
          <div className="form-control">
            <label htmlFor="profile_photo">Upload photo</label>
            <br />
            <input
              type="file"
              id="profile_photo"
              name="profile_photo"
              value={formik.values.profile_photo}
              onChange={formik.handleChange}
            />
            {formik.touched.profile_photo && formik.errors.profile_photo ? (
              <div className="error">{formik.errors.profile_photo}</div>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="first_name">First Name</label>
            <br />
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="eg. John"
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
              placeholder="eg. Doe"
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
              placeholder="mantra goes here..."
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
              placeholder="eg. +2547920911"
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
              placeholder="eg. Mr. Mrs"
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
            {formik.touched.date_of_birth && formik.errors.date_of_birth ? (
              <div className="error">{formik.errors.date_of_birth}</div>
            ) : null}
          </div>
          <div className="update-account-container">
            {/* <input type="submit" /> */}
            <button className="update-btn" type="submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditProfileForm;
