import { Link } from "react-router-dom"
const SideNavHr = () => {
  return (
    <div>
 {/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">HRS</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="#" className="d-block">HR Personnel Name</a>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <a href="./index.html" className="nav-link active">
            <i className="far fa-circle nav-icon" />
            <p>Dashboard</p>
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-user-circle" />
            <p>
              Profile
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/examples/view-profile.html" className="nav-link">
                <i className="fas fa-eye nav-icon" />
                <p>View Profile Details</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/update-profile.html" className="nav-link">
                <i className="fas fa-user-edit nav-icon" />
                <p>Update Profile</p>
              </a>
            </li>
          </ul>
        </li>


        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-users" />
            <p>
              Employees
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="add_employee" className="nav-link">
                <i className="fas fa-plus nav-icon" />
                <p>Add Employee</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/employee-details.html" className="nav-link">
                <i className="fas fa-user nav-icon" />
                <p>Employee Details</p>
              </a>
            </li>
          </ul>
        </li>



        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-users-cog" />
            <p>
              Managers
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/examples/view-managers.html" className="nav-link">
                <i className="fas fa-binoculars nav-icon" />
                <p>View Managers</p>
              </a>
            </li>
          </ul>
        </li>


        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-building" />
            <p>
              Departments
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/examples/list-departments.html" className="nav-link">
                <i className="fas fa-list nav-icon" />
                <p>List Departments</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/view-department-heads.html" className="nav-link">
                <i className="fas fa-user-tie nav-icon" />
                <p>View Department Heads</p>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-money-check-alt" /> 
            <p>
              Payroll
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/examples/employee-salaries.html" className="nav-link">
                <i className="fas fa-list-ol nav-icon" /> 
                <p>Employee Salaries</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/bonus-and-deductions.html" className="nav-link">
                <i className="fas fa-gift nav-icon" /> 
                <p>Bonus and Deductions</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/generate-payslips.html" className="nav-link">
                <i className="fas fa-file-invoice-dollar nav-icon" /> 
                <p>Generate Payslips</p>
              </a>
            </li>
          </ul>
        </li>


        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-calendar-check" />
            <p>
              Leave Tracker
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/examples/approved.html" className="nav-link">
                <i className="fas fa-check-circle nav-icon" />
                <p>Approved</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/pending.html" className="nav-link">
                <i className="fas fa-hourglass-half nav-icon" />
                <p>Pending</p>
              </a>
            </li>
          </ul>
        </li>


        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-chalkboard-teacher" />
              <p>
               <Link to="/training_page">Training Tracker</Link> 
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="pages/examples/create-training.html" className="nav-link">
                  <i className="fas fa-plus-circle nav-icon" /> 
                  <p>Create Training</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/examples/upcoming-training.html" className="nav-link">
                  <i className="fas fa-calendar nav-icon" /> 
                  <p>Upcoming Training</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/examples/past-training.html" className="nav-link">
                  <i className="fas fa-history nav-icon" /> 
                  <p>Past Training</p>
                </a>
              </li>
            </ul>
          </li>


        <li className="nav-item">
          <a href="pages/calendar.html" className="nav-link">
            <i className="nav-icon far fa-calendar-alt" />
            <p>
              Calendar
              <span className="badge badge-info right">2</span>
            </p>
          </a>
        </li>
         
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

      
    </div>
  )
}

export default SideNavHr
