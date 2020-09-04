import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> CodeBuddy
        </Link>
      </h1>
      <ul>
        <li>
          <Link to=''> Profiles </Link>
        </li>
        <li>
          <Link to=''>Register </Link>
        </li>
        <li>
          <Link to=''>Login</Link>
        </li>
      </ul>
    </nav>
  );
};
