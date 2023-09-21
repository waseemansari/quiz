import React , {useEffect, useState} from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useUpdateProfileMutation} from "../../Services/api";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../__Layout/Header";
import {  useSelector,useDispatch } from 'react-redux';
import { updateUserProfile } from "../../redux/authSlice";

export default function Profile() {
  const [name,setName] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  const [email,setEmail] = useState("")
  const { userDetail } = useSelector(
    (state) => state.auth
  )
  useEffect(()=>{
    if(userDetail){
      setName(userDetail['user']['name'])
      setEmail(userDetail['user']['email'])
    }
    
  },[userDetail])
 
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name fields is required"),
  });
  let defaultValues = { name: ""};
  const notify = () => '';
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  
  const [UpdateProfile] = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  
  const onSubmitProfile = (values) => {
    
    UpdateProfile({ data: values })
      .unwrap()
      .then((payload) => {
        if (payload.status) {
          const response = {
            user: payload.data,
          };
          dispatch(updateUserProfile(response));
           toast.success(payload.message)
        } else {
           toast.error(payload.message)
        }
      })
      .catch((error) => {
      
         toast.error(error.error)
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
              <h5 className="card-title">Update Profile</h5>
              <form onSubmit={handleSubmit(onSubmitProfile)}>
                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input type="name"  
                    {...register('name', {
                      onChange: (e) => {setName(e.target.value)},
                     })} 
                    value={name} className="form-control" />
                    <span className="text-danger">{errors.name?.message}</span>

                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Phone Number</label>
                  <div className="col-sm-10">
                    <input type="number" 
                    {...register('phone_number', {
                      onChange: (e) => {setPhoneNumber(e.target.value)},
                     })}
                    value={phoneNumber} className="form-control" />
                    <span className="text-danger">{errors.phone_number?.message}</span>

                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Destination</label>
                  <div className="col-sm-10">
                    <input type="text"
                    {...register('email', {
                      onChange: (e) => {setEmail(e.target.value)},
                     })}
                      value={email}  className="form-control" />
                    <span className="text-danger">{errors.destination?.message}</span>

                  </div>
                </div>           
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label"></label>
                  <div className="col-sm-10">
                     <button type="submit" className="btn btn-warning w-100" >Update Profile</button>

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