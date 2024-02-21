import React from "react";
import banner from "../assets/banner.jpg";
import "./mainpage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <nav className="main-nav">
        <div className="nav-logo">
          <a href="#">HRS.io</a>
        </div>
        <ul className="nav-list">
          <li className="link">Home</li>
          <li className="link">About</li>
          <li className="link">Contact Us</li>
          <li className="link">LOGIN</li>
        </ul>
      </nav>
      <div className="main-container">
        <div className="left-col">
          <div className="content">
            <h1 className="main-title">WELCOME TO HRS</h1>
            <p className="main-paragraph">
              Introducing HRS, a sophisticated Human Resource Management system
              meticulously crafted to elevate efficiency and streamline
              operations across diverse professional landscapes. Tailored to
              meet the dynamic demands of modern workplaces, HRS seamlessly
              integrates cutting-edge technology with intuitive design,
              empowering organizations to optimize their human capital with
              unparalleled grace and precision.
            </p>
          </div>
          <div className="main-buttons">
            <button className="about">About</button>
            <button className="contact-us">Contact Us</button>
          </div>
          <div className="chevrons">
            <span className="chev-left">
              <i class="ri-arrow-left-s-line"></i>
            </span>
            <span className="chev-right">
              <i class="ri-arrow-right-s-line"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
