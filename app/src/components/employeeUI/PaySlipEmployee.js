import React from "react";
import "./payslipEmployee.css";

const PaySlipEmployee = () => {
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
            <div id="name">Piven El'Sync</div>
            <div id="email">mary.ann+Regr06@salarium.com</div>
          </div>
          <div class="details">
            <div class="entry">
              <div class="label">Employee ID</div>
              <div class="value">Reg-006</div>
            </div>
            <div class="entry">
              <div class="label">Company Name</div>
              <div class="value">Not a Shady One</div>
            </div>
            <div class="entry">
              <div class="label">Position</div>
              <div class="value">Point Guard</div>
            </div>
            <div class="entry">
              <div class="label">Department</div>
              <div class="value">1st String</div>
            </div>
            <div class="entry">
              <div class="label">Prepared by</div>
              <div class="value">Piven Himself</div>
            </div>
          </div>
          <div class="gross">
            <div class="title">Total Income</div>
            <div class="entry">
              <div class="label"></div>
              <div class="value">92,823.86</div>
            </div>
          </div>
        </div>
        <div class="right-panel">
          <div class="details">
            <div class="basic-pay">
              <div class="entry">
                <div class="label">Basic Pay</div>
                <div class="detail"></div>
                <div class="rate">45,000.00/Month</div>
                <div class="amount">45,000.00</div>
              </div>
            </div>
            <div class="taxable_commission"></div>
            <div class="nti">
              <div class="entry">
                <div class="label">RENUMERATIONS</div>
              </div>
            </div>
            <div class="withholding_tax">
              <div class="entry">
                <div class="label">Withholding Tax</div>
                <div class="detail"></div>
                <div class="rate"></div>
                <div class="amount">(21,548.85)</div>
              </div>
            </div>
            <div class="non_taxable_allowance">
              <div class="entry">
                <div class="label">Non-Taxable Allowance</div>
                <div class="detail"></div>
                <div class="rate"></div>
                <div class="amount"></div>
              </div>
              <div class="entry">
                <div class="label"></div>
                <div class="detail">Allowance Name</div>
                <div class="rate"></div>
                <div class="amount">1,500.00</div>
              </div>
            </div>
            <div class="non_taxable_bonus">
              <div class="entry">
                <div class="label">Non-Taxable Bonus</div>
                <div class="detail"></div>
                <div class="rate"></div>
                <div class="amount"></div>
              </div>
              <div class="entry">
                <div class="label"></div>
                <div class="detail">Bonus Name</div>
                <div class="rate"></div>
                <div class="amount">2,000.00</div>
              </div>
            </div>
            <div class="non_taxable_commission">
              <div class="entry">
                <div class="label">Non-Taxable Commission</div>
                <div class="detail"></div>
                <div class="rate"></div>
                <div class="amount"></div>
              </div>
              <div class="entry">
                <div class="label"></div>
                <div class="detail">Commission Name 1</div>
                <div class="rate"></div>
                <div class="amount">3,000.00</div>
              </div>
              <div class="entry">
                <div class="label"></div>
                <div class="detail">Commission Name 2</div>
                <div class="rate"></div>
                <div class="amount">2,500.00</div>
              </div>
            </div>
            <div class="deductions">
              <div class="entry">
                <div class="label">Deductions</div>
                <div class="detail"></div>
                <div class="rate"></div>
                <div class="amount"></div>
              </div>
              <div class="entry">
                <div class="label"></div>
                <div class="detail">HMO</div>
                <div class="rate"></div>
                <div class="amount">(500.00)</div>
              </div>
            </div>
            <div class="net_pay">
              <div class="entry">
                <div class="label">NET PAY</div>
                <div class="detail"></div>
                <div class="rate"></div>
                <div class="amount">69,656.21</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaySlipEmployee;
