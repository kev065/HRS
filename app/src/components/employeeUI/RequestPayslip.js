import React from "react";
import "./requestPayslip.css";

const RequestPayslip = () => {
  return (
    <form className="search-container">
      <div class="row mb-4">
        <div class="col">
          <div data-mdb-input-init class="form-outline">
            <input
              type="number"
              min={2000}
              max={2024}
              id="form6Example1"
              class="form-control"
              required
            />
            <label class="form-label" for="form6Example1">
              Enter Year
            </label>
          </div>
        </div>
        <div class="col">
          <div data-mdb-input-init class="form-outline">
            <input
              type="number"
              min={1}
              max={12}
              id="form6Example2"
              class="form-control"
              required
            />
            <label class="form-label" for="form6Example2">
              Enter Month
            </label>
          </div>
        </div>
      </div>
      <button
        data-mdb-ripple-init
        type="button"
        class="btn btn-success btn-block mb-4"
      >
        Request payslip
      </button>
    </form>
  );
};

export default RequestPayslip;
