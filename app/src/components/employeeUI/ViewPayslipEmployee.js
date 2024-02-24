import React from "react";
import "./viewPayslip.css";
import PaySlipEmployee from "./PaySlipEmployee";
import RequestPayslip from "./RequestPayslip";

const ViewPayslipEmployee = () => {
  return (
    <div className="payslip-container">
      <RequestPayslip />
      <PaySlipEmployee />
    </div>
  );
};

export default ViewPayslipEmployee;
