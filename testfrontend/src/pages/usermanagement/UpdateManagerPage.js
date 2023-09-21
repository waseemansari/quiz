import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import React , {useEffect,useMemo} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {  useShowManagerQuery,useUpdateManagerMutation } from "../../Services/api";
export default function UpdateManagerPage(props) {
    const notify = () => '';
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name fields is required"),
        designation: Yup.string().required("designation fields is required"),
        phone_number: Yup.string().required("phone number fields is required"),
        email: Yup.string().required("email fields is required"),
        level: Yup.string().required("level fields is required"),
        active: Yup.string().required("active fields is required"),
      });
      const {
        data: showManager,
        //  isLoading: isGetLoading,
        // isSuccess: isGetSuccess,
        // isError: isGetError,
        // error: getError,
      } =  useShowManagerQuery({  params:props['id']});
      const [updateManager] = useUpdateManagerMutation();
      const managerData= showManager?.data[0];
      var  defaultValues={
      name:managerData?.name,
      phone_number:showManager?.data[0]?.phone_number,
      designation:managerData?.designation,
      email:managerData?.email,
      level:managerData?.level,
    };
   
    
    const methods = useForm({
      mode: "onTouched",
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValues,
      
    });
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = methods;
      useEffect(() => {
        reset(defaultValues)
      },[managerData])
      
    const updateManagerList = (values,e) => {
        updateManager({ data: values,param:props['id'] })
        .unwrap()
        .then((payload) => {
            if (payload.status) {
              toast.success(payload.message)
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
        
        <div className="modal fade" id="fullscreenModal">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update manager</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Update manager</h5>
                        <form onSubmit={handleSubmit(updateManagerList)} >
                          
                            <div className="row mb-3"> 
                                <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">name</label>
                                <div className="col-sm-10">
                                    <input type="text" 
                                      {...register('name')} 
                                        className="form-control"
                                      />
                                    <span className="text-danger">{errors.name?.message}</span>
                                </div>
                            </div>
                              <div className="row mb-3">
                                <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">designation</label>
                                <div className="col-sm-10">
                                    <input type="name" 
                                      {...register('designation')}
                                      className="form-control" 
                                                                                     />
                                    <span className="text-danger">{errors.designation?.message}</span>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">phone number</label>
                                <div className="col-sm-10">
                                    <input type="number"
                                      {...register('phone_number')}
                                      
                                      className="form-control" 
                                      
                                      />
                                    <span className="text-danger">{errors.phone_number?.message}</span>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">email</label>
                                <div className="col-sm-10">
                                    <input type="email"
                                      {...register('email')}
                                        className="form-control" 
                                        
                                                                                        />
                                    <span className="text-danger">{errors.email?.message}</span>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">level</label>
                                <div className="col-sm-10">
                                    <input type="level"
                                      {...register('level')}
                                       
                                        className="form-control" 
                                      />
                                    <span className="text-danger">{errors.level?.message}</span>
                                </div>
                            </div>
                            
                            <div className="row mb-3">
                                <label htmlFor="active" className="col-sm-2 col-form-label">active</label>
                                <div className="col-sm-10">
                                    <select  
                                    {...register('active')}
                                        className="form-control" >
                                         
                                        <option value='active'>active</option>
                                        <option value='inactive'>inactive</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-warning" data-bs-dismiss="modal">Save changes</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            </div> 
                        </form>

                        </div>
                    </div>
                </section>
            </div>
          </div>
        </div>
      </div>
    );
}