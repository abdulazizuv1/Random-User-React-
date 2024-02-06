import React from 'react'
import "./Navbar.css"
import { FaSun, FaMoon  } from "react-icons/fa";
import { Link } from 'react-router-dom'

function Navbar({changeMode}) {
    
  return (
    <>
    <div className="container">
        <nav>
            <Link to={"/"}>
            <div className="logo">
                <img src="./public/imgs/site-logo.svg" alt=""/>
                <h1>USER</h1>
            </div>
            </Link>
            <div className="mode" onClick={changeMode}>

            </div>
        </nav>
    </div>
    <div className="bg">
        <img src="./public/imgs/background-image.jpg" alt=""/>
        <h1>RANDOM USER GENERATOR</h1>
    </div>
    
    </>
  )
}

export default Navbar