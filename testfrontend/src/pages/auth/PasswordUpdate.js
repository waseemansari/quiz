import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdatepasswordMutation } from "../../Services/api";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../__Layout/Header";
export default function PasswordUpdate() {
  
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("current password fields is required"),
    new_password: Yup.string().required("new password fields is required"),
    confirm_password: Yup.string().required("confirm password fields is required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });


  let defaultValues = { confirm_password: ""};
  const notify = () => '';
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
 
  const [Updatepassword] = useUpdatepasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = (values) => {
    Updatepassword({ data: values })
      .unwrap()
      .then((payload) => {
        if (payload.status) {
    
          toast.success(payload.message)
        } else {
           toast.error(payload.message)

        }
      })
      .catch((error) => {

         toast.error(error.data.message)
      });
       notify();
  };
 
  return (
    <>
     <Header></Header>
    <main id="main" className="main">
    
      <section className="section">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Password</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Current Password</label>
                  <div className="col-sm-10">
                    <input type="password" {...register("password")} className="form-control" />
                    <span className="text-danger">{errors.password?.message}</span>

                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">New password</label>
                  <div className="col-sm-10">
                    <input type="name" {...register("new_password")} className="form-control" />
                    <span className="text-danger">{errors.new_password?.message}</span>

                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Confirm Password</label>
                  <div className="col-sm-10">
                    <input type="password" {...register("confirm_password")} className="form-control" />
                    <span className="text-danger">{errors.confirm_password?.message}</span>

                  </div>
                </div>           
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label"></label>
                  <div className="col-sm-10">
                     <button type="submit" className="btn btn-warning w-100" >Update Password</button>

                  </div>
                </div>

              </form>

            </div>
          </div>
      </section>

    </main>
    </>
  );
}