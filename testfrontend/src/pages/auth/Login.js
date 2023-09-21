import React , {useEffect} from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {  useSelector,useDispatch } from 'react-redux';

import { yupResolver } from "@hookform/resolvers/yup";
import PATHS from "../../routes/paths";
import { loggedIn } from "../../redux/authSlice";
import { useLoginuserMutation } from "../../Services/api";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").min(3, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const {userDetail } = useSelector(
    (state) => state.auth
  )
    useEffect(()=>{
      if(userDetail){
       
        navigator(PATHS.dashboard);
      }
  },[userDetail,navigator])
  let defaultValues = { email: "", password: "" };
  const notify = () => '';
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const [loginuser] = useLoginuserMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = (values) => {
    loginuser({ data: values })
      .unwrap()
      .then((payload) => {
        if (payload.status=='200') {
          const response = {
            token: payload.token,
            user: payload.data,
          };
          dispatch(loggedIn(response));
          navigator(PATHS.dashboard);
          
        } else {
          toast.error(payload.message)
        }
      })
      .catch((error) => {
          toast.error(error.data)
      });
      notify();
    
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  <div className="d-flex justify-content-center py-4">

                    <img src="assets/img/logo.png" alt="" />
                    {/* <span className="d-none d-lg-block">TEST</span> */}
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        {/* <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5> */}
                        <h5 className="card-title text-center pb-0 fs-4">TEST </h5>
                        {/* <p className="text-center small">Enter your username & password to login</p> */}
                      </div>
                      <form className="row g-3 needs-validation" >
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">Email Address</label>
                          <div className="input-group has-validation">
                            {/* <span className="input-group-text" id="inputGroupPrepend">@</span> */}
                            <input type="email"  {...register("email")} className="form-control" id="yourUsername" />

                          </div>
                          {/* <p className="text-danger">{errors.email?.message}</p> */}
                          <span className="text-danger">{errors.email?.message}</span>
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">Password</label>
                          <input type="password" {...register("password")} className="form-control" id="yourPassword" />
                        </div>
                        <span className="text-danger">{errors.password?.message}</span>
                        {/* <div className="col-12">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                          </div>
                        </div> */}
                        <div className="col-12">
                          <button type="submit" className="btn btn-warning w-100" onClick={handleSubmit(onSubmit)}> Login</button>
                        </div>
                        <div className="col-12">
                        </div>
                      </form>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}