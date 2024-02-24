import React from 'react'
import { Link } from 'react-router-dom';

const SideNavManager = () => {
  return (
    <div>
         <div>
 {/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
    <span className="brand-text font-weight-light" style={{ marginLeft: "70px"}}>HRS</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
     
      </div>
      
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
      
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <a href="./manager_dashboard" className="nav-link active">
            <i className="far fa-circle nav-icon" />
            <p>Dashboard</p>
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-user-circle" />
            <p>
              Profile
            
            </p>
          </a>
          
        </li>


        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-users" />
            <p>
             Departments
           
            </p>
          </a>
         
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-users" />
            <p>
        
             <Link to="/manager/view_department_employees">Training Tracker</Link> 
            </p>
          </a>
         
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-money-check-alt" /> 
            <p>
              Payslips
            
            </p>
          </a>
         
        </li>


        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-calendar-check" />
            <p>
              Leave Tracker
           
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
      
    </div>
  )
}

export default SideNavManager
