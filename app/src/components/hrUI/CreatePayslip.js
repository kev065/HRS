import React from "react";

const CreatePayslip = () => {
  return (
    <div className="container">
      <div class="row">
        <div class="col">
          <div data-mdb-input-init class="form-outline">
            <input type="text" id="form8Example3" class="form-control" />
            <label class="form-label" for="form8Example3">
              First name
            </label>
          </div>
        </div>
        <div class="col">
          <div data-mdb-input-init class="form-outline">
            <input type="text" id="form8Example4" class="form-control" />
            <label class="form-label" for="form8Example4">
              Last name
            </label>
          </div>
        </div>
        <div class="col">
          <div data-mdb-input-init class="form-outline">
            <input type="email" id="form8Example5" class="form-control" />
            <label class="form-label" for="form8Example5">
              Email address
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePayslip;
