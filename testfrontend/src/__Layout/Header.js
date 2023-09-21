import Navbar from './Navbar';
import { Link ,useNavigate} from "react-router-dom";
import { useLogoutMutation } from "../Services/api";
import PATHS from "../routes/paths";
import React , {useEffect, useState} from "react";
import {  useSelector,useDispatch } from 'react-redux';
import { userLogout } from "../redux/authSlice";
export default function Header() {
    const [name,setName] = useState("")
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [email,setEmail] = useState("")
    const {userDetail } = useSelector(
        (state) => state.auth
      )
 
    useEffect(()=>{
        if(userDetail){
            setName(userDetail['user']['name'])
            setEmail(userDetail['user']['email'])
        }else{
            navigator(PATHS.signout);
        }
    },[userDetail,navigator])
    
    const [logout] = useLogoutMutation();
    const logoutUser = (values) => {
        // localStorage.removeItem('token-info');
        // setIsLoggedin(false);
        logout({ data: values })
        .unwrap()
        .then((payload) => {
            
          if (payload.status) {
            const response = {
                userDetail: null,
                isLoggedIn: false
            };
              sessionStorage.removeItem("admin_id");

              dispatch(userLogout(response));
              navigator(PATHS.signout);
           
          } else {
           
          }
        })
        .catch((error) => {
        
        });
      
    };
    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <span className="d-none d-lg-block">TEST</span>
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>
                
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                       

                        <li className="nav-item dropdown pe-3">

                            <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="#" data-bs-toggle="dropdown">
                                {/* <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" /> */}
                                <span className="d-none d-md-block dropdown-toggle ps-2">{name}</span>
                            </Link>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{name}</h6>
                                    <span>{email}</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <Link to="/profile" className="dropdown-item d-flex align-items-center">
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link to="/password-update" className="dropdown-item d-flex align-items-center">
                                        <i className="bi bi-person"></i>
                                        <span>Update Password</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <Link  onClickCapture={logoutUser} className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-box-arrow-right"></i>
                                            <span>Sign Out</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                    </ul>
                </nav>
            </header>
            <Navbar />
        </>
        );
    }