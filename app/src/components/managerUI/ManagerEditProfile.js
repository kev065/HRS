import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { retrieve } from "../Encryption";
import "./managerEdit.css";

const ManagerEditProfile = () => {
  const navigate = useNavigate();
  const { managerId } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [managerProfileData, setManagerProfileData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    fetch(`/managers/${managerId}`)
      .then((response) => response.json())
      .then((data) => setManagerProfileData(data.manager_profiles[0]))
      .catch((err) => console.log(err));
  }, [managerId]);

  const MAX_FILE_SIZE = 10000000; // 10MB
  const validFileExtensions = {
    image: ["jpg", "png", "jpeg", "webp"],
  };

  const getExtension = (fileName) => {
    if (!fileName) return null;
    const parts = fileName.split(".");
    return parts[parts.length - 1].toLowerCase();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const size = file.size;
      const isValid = validFileExtensions.image.includes(getExtension(file.name));
      if (size > MAX_FILE_SIZE) setError("The file is too large");
      else if (!isValid) setError("The file type is not supported");
      else {
        setError(null);
        setProfilePhoto(file);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: managerProfileData?.first_name || "",
      last_name: managerProfileData?.last_name || "",
      mantra: managerProfileData?.mantra || "",
      phone_contact: managerProfileData?.phone_contact || "",
      title: managerProfileData?.title || "",
      date_of_birth: managerProfileData?.date_of_birth || "",
    },
    validationSchema: yup.object().shape({
      first_name: yup.string().required("Please fill out this field"),
      last_name: yup.string().required("Please fill out this field"),
      mantra: yup.string().required("Please fill out this field"),
      phone_contact: yup
        .string()
        .required("Please fill out this field")
        .min(10, "Phone contact must be at least 10 characters"),
      title: yup.string().required("Please provide a title"),
      date_of_birth: yup.date().required("Please fill out this field"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("mantra", values.mantra);
      formData.append("phone_contact", values.phone_contact);
      formData.append("title", values.title);
      formData.append("date_of_birth", values.date_of_birth);
      formData.append("profile_photo", profilePhoto);

      console.log(...formData.entries());

      fetch(`/managerProfiles/${managerProfileData.id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + retrieve().access_token,
        },
        body: formData,
      }).then((response) => {
        if (response.ok) {
          setSuccess("Successfully Updated account!!");
          setTimeout(() => {
            navigate(`/manager/manager_profile`);
          }, 2000);
          response.json().then((data) => console.log(data));
        } else {
          return response.json().then((err) => console.log(err));
        }
      });
    },
    enableReinitialize: true,
  });

  if (!managerProfileData) return <div>Loading...</div>;

  return (
    <div className='content-wrapper' style={{ marginLeft: "10px", backgroundColor: "white", marginTop: "40px" }}>
      <div className="container">
        <div className="form-container">
          <form className="profile-form" onSubmit={formik.handleSubmit}>
            {success ? <h4 className="secondary-title">{success}</h4> : null}
            <div className="form-control">
              <label htmlFor="profile_photo">Upload photo</label>
              <br />
              <input
                type="file"
                id="profile_photo"
                name="profile_photo"
                onChange={handleChange}
              />
              {error && <div className="error">{error}</div>}
            </div>
            {/* Remaining form controls... */}
            <div className="update-account-container">
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

export default ManagerEditProfile;