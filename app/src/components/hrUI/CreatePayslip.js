import React from "react";
import "./createPayslip.css";
import { useState, useEffect } from "react";
import { retrieve } from "../Encryption";

const CreatePayslip = () => {
  const [remunerationDescriptions, setRemunerationDescriptions] = useState([]);
  const [remuneration, setRemuneration] = useState({
    name: "",
    salary: "",
    employee_id: "",
  });
  const [remunerationDescription, setRemunerationDescription] = useState({
    name: "",
    type: "",
    description: "",
    amount: "",
  });
  const [isPresent, setIsPresent] = useState(false);
  const [employees, setEmployees] = useState([]);
  //fetch employee profiles
  useEffect(() => {
    fetch("/employeeProfiles")
      .then((resp) => resp.json())
      .then((data) => setEmployees(data));
  }, []);

  const toggleForm = () => {
    setIsPresent(!isPresent);
  };
  //get employee names
  const employeeNames = employees?.map((employee) => (
    <option key={employee.id} value={employee.employee_id}>
      {employee.first_name + " " + employee.last_name}
    </option>
  ));
  // add remuneration func
  const addRemuneration = () => {
    if (
      remunerationDescription.name === "" ||
      remunerationDescription.type === "" ||
      remunerationDescription.amount === "" ||
      remunerationDescription.description === ""
    ) {
      return;
    } else {
      // add remuneration to list
      setRemunerationDescriptions([
        ...remunerationDescriptions,
        remunerationDescription,
      ]);
    }
    // reset remunerationdecription
    setRemunerationDescription({
      name: "",
      type: "",
      description: "",
      amount: "",
    });
  };
  const removeRemuneration = () => {
    const updatedRemunerations = [...remunerationDescriptions];
    updatedRemunerations.pop();
    setRemunerationDescriptions(updatedRemunerations);
    // toggle form
    if (remunerationDescriptions.length === 0) {
      setIsPresent(false);
    }
  };
  // handle change
  const handleRemunerationChange = (e) => {
    const { name, value } = e.target;
    setRemuneration({
      ...remuneration,
      [name]: value,
    });
  };
  // handle change
  const handleRemunerationDescriptionChange = (e) => {
    const { name, value } = e.target;
    setRemunerationDescription({
      ...remunerationDescription,
      [name]: value,
    });
  };
  //submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(remuneration);
    console.log([...remunerationDescriptions]);
    fetch("/payslip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + retrieve().access_token,
      },
      body: JSON.stringify({
        remuneration: remuneration,
        remuneration_descriptions: remunerationDescriptions,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    console.log(
      JSON.stringify({
        remuneration: remuneration,
        remuneration_descriptions: remunerationDescriptions,
      })
    );
  };

  return (
    <div className="create-payslip">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label for="name">Remuneration name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="eg. Basic Salary"
              value={remuneration.name}
              onChange={handleRemunerationChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label for="salary">Salary</label>
            <input
              type="number"
              className="form-control"
              id="salary"
              placeholder="eg. 5000"
              name="salary"
              min={1}
              value={remuneration.salary}
              onChange={handleRemunerationChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label for="employee">Employee</label>
            <select
              id="employee_id"
              className="form-control"
              name="employee_id"
              value={remuneration.employee_id}
              onChange={handleRemunerationChange}
              required={!remuneration.employee_id} // Require selection only if no employee is chosen
              placeholder="Choose employee"
            >
              {/* Default "Choose employee" option */}
              <option value="" disabled selected>
                Choose employee
              </option>
              {/* Employee names */}
              {employeeNames}
            </select>
          </div>
          {remunerationDescriptions?.map((remuneration, index) => (
            <div key={index} className="form-row">
              <div className="col-md-4 mb-3">
                <label for="name">Compensation name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="eg. Basic Salary"
                  value={remuneration.name}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="eg. sales commission"
                  value={remuneration.description}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="name">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  placeholder="eg. bonus, allowance"
                  value={remuneration.type}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="name">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  name="amount"
                  placeholder="eg. 2000"
                  value={remuneration.amount}
                  disabled
                />
              </div>
            </div>
          ))}
          {/* conditional rendering of renumeration description fields */}
          {isPresent ? (
            <div className="form-row">
              <div className="col-md-4 mb-3">
                <label for="name">Compensation name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="eg. Basic Salary"
                  value={remunerationDescription.name}
                  onChange={handleRemunerationDescriptionChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="eg. sales commission"
                  value={remunerationDescription.description}
                  onChange={handleRemunerationDescriptionChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="name">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  placeholder="eg. bonus, allowance"
                  value={remunerationDescription.type}
                  onChange={handleRemunerationDescriptionChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="name">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  name="amount"
                  placeholder="eg. 2000"
                  value={remunerationDescription.amount}
                  onChange={handleRemunerationDescriptionChange}
                />
              </div>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={toggleForm}
        >
          Toggle
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm ml-3"
          onClick={addRemuneration}
        >
          Add Remuneration
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm ml-3"
          onClick={removeRemuneration}
        >
          Remove Remuneration
        </button>
        <button className="btn btn-success btn-block mt-4 mb-4" type="submit">
          Generate Payslip
        </button>
      </form>
    </div>
  );
};

export default CreatePayslip;
