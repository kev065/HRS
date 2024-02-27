import React, { useState } from "react";
import "./viewPayslip.css";
import PaySlipEmployee from "./PaySlipEmployee";
import RequestPayslip from "./RequestPayslip";
import CreatePayslip from "./CreatePayslip";

const ViewPayslipHr = () => {
  //set payslip state
  const [payslip, setPayslip] = useState(null);

  return (
    <div className="payslip-container">
      <RequestPayslip setPayslip={setPayslip} />
      {payslip ? (
        <PaySlipEmployee payslip={payslip} setPayslip={setPayslip} />
      ) : (
        <>
          <h1 className="payslip-message text-secondary">
            payslip will appear here
          </h1>
          <CreatePayslip />
        </>
      )}
    </div>
  );
};

export default ViewPayslipHr;
