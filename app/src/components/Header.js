import React from 'react'

const Header = () => {
  return (
    <div>
{/* Navbar */}
<nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
    <button className="nav-link" data-widget="pushmenu"><i className="fas fa-bars" /></button>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="/home" className="nav-link">Home</a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <button className="nav-link">Contact</button>
    </li>
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Navbar Search */}
    <li className="nav-item">
    <button className="nav-link" data-widget="navbar-search">
        <i className="fas fa-search" />
        </button>
      <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-sm">
            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>
    
    <li className="nav-item">
    <button className="nav-link" data-widget="fullscreen">
        <i className="fas fa-expand-arrows-alt" />
      </button>
    </li>
    <li className="nav-item">
    <button className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true">
        <i className="fas fa-th-large" />
      </button>
    </li>
  </ul>
</nav>
{/* /.navbar */}

    </div>
  )
}

export default Header
