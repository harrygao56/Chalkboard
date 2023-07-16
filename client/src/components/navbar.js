import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-light align-items-center" style={{"backgroundColor": "#e3f2fd"}}>
                <div className="mx-auto">
                    <NavLink className="navbar-brand" to="/">
                        <img style={{"width" : 40 + 'px'}} src="https://png.pngtree.com/png-clipart/20230317/original/pngtree-blackboard-icon-png-image_8993868.png" alt="chalkboard"></img>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;