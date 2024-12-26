import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to='/'>Task Manager</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;