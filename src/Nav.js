import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        handleShow(true);
    } else handleShow(false);
    });
    return () => {
        window.removeEventListener('scroll');
    };
}, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            {/* <img className="nav_logo" src="./images/NetflixLogo.png" */}
            <img className="nav_logo" src="https://upload.wikimedia.org/wikipedia/commons/1/15/Logonfx.png"
           
alt="Netflix Logo" />
{/* <img className="nav_avatar"
src="./smiley.png"
alt="Netflix Logo" /> */}
        </div>
    )
}

export default Nav;