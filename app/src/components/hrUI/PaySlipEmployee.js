import React, { useEffect, useState } from "react";
import "./payslipEmployee.css";
import { retrieve } from "../Encryption";

const PaySlipEmployee = ({ payslip }) => {
  const [employee, setEmployee] = useState(null);
  console.log(payslip);
  console.log(employee);
  useEffect(() => {
    fetch(`/employees/${payslip.employee_id}`)
      .then((resp) => resp.json())
      .then((data) => setEmployee(data));
  }, [payslip]);

  return (
    <div id="payslip">
      <div id="title">Payslip</div>
      <div id="scope">
        <div class="scope-entry">
          <div class="title">PAY RUN</div>
          <div class="value">Mar 15, 2015</div>
        </div>
        <div class="scope-entry">
          <div class="title">PAY PERIOD</div>
          <div class="value">Mar 1 - Mar 15, 2015</div>
        </div>
      </div>
      <div class="payslip-content">
        <div class="left-panel">
          <div id="employee">
            <div id="name">{employee?.employee_profiles[0]?.first_name}</div>
            <div id="name">{employee?.employee_profiles[0]?.last_name}</div>
            <div id="email">{employee?.email}</div>
          </div>
          <div class="details">
            <div class="entry">
              <div class="label">Employee ID</div>
              <div class="value">{employee?.id}</div>
            </div>
            <div class="entry">
              <div class="label">Company Name</div>
              <div class="value">HRS</div>
            </div>
            <div class="entry">
              <div class="label">Position</div>
              <div class="value">{employee?.employee_profiles[0]?.title}</div>
            </div>
            <div class="entry">
              <div class="label">Department</div>
              <div class="value">department here</div>
            </div>
            <div class="entry">
              <div class="label">Prepared by</div>
              <div class="value">Allan Himself</div>
            </div>
          </div>
          <div class="gross">
            <div class="title">Total Income</div>
            <div class="entry">
              <div class="label">KSH</div>
              <div class="value">total income here</div>
            </div>
          </div>
        </div>
        <div class="right-panel">
          <div class="details">
            <div class="basic-pay">
              <div class="entry">
                <div class="label">Basic Pay</div>
                <div class="detail"></div>
                <div class="rate">{payslip?.basic_salary}/Month</div>
                <div class="amount">KSH {payslip?.basic_salary}.00</div>
              </div>
            </div>
            <div class="taxable_commission"></div>
            <div class="nti">
              <div class="entry">
                <div class="label">RENUMERATIONS</div>
              </div>
            </div>
            <div class="withholding_tax">
              {payslip.bonus?.map((bonus) => (
                <div class="entry">
                  <div class="label">Bonus</div>
                  <div class="detail">{bonus.name}</div>
                  <div class="rate">{bonus.description}</div>
                  <div class="amount">{bonus.amount}</div>
                </div>
              ))}
            </div>
            <div class="non_taxable_allowance">
              {payslip.allowance?.map((allowance) => (
                <div class="entry">
                  <div class="label">Allowance</div>
                  <div class="detail">{allowance?.name}</div>
                  <div class="rate">{allowance?.description}</div>
                  <div class="amount">{allowance?.amount}</div>
                </div>
              ))}
            </div>
            <div class="non_taxable_bonus">
              {payslip.normal?.map((normal) => (
                <div class="entry">
                  <div class="label">Normal</div>
                  <div class="detail">{normal?.name}</div>
                  <div class="rate">{normal?.description}</div>
                  <div class="amount">{normal?.amount}</div>
                </div>
              ))}
            </div>
            <div class="deductions">
              {payslip.deduction?.map((deduction) => (
                <div class="entry">
                  <div class="label">deduction</div>
                  <div class="detail">{deduction?.name}</div>
                  <div class="rate">{deduction?.description}</div>
                  <div class="amount">{deduction?.amount}</div>
                </div>
              ))}
            </div>
            <div class="net_pay">
              <div class="entry">
                <div class="label">NET PAY</div>
                <div class="detail"></div>
                <div class="rate"></div>
                <div class="amount">net pay here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaySlipEmployee;