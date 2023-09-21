import Header from '../../__Layout/Header';
import React , {useState} from "react";
import { Link} from "react-router-dom"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Loader from '../../utils/Loader';
import {  useGetManagerQuery,useAddManagerMutation ,useDeleteManagerMutation} from "../../Services/api";

import UpdateManagerPage from './UpdateManagerPage';
export default function ManagerList() {
    const [pageUrl, setPageUrl] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState("");
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name fields is required"),
        designation: Yup.string().required("designation fields is required"),
        phone_number: Yup.string().required("phone number fields is required"),
        email: Yup.string().required("email fields is required"),
        level: Yup.string().required("level fields is required"),
        active: Yup.string().required("active fields is required"),
      });
    let defaultValues = { name: ""};
    const notify = () => '';
    const methods = useForm({
      mode: "onTouched",
      resolver: yupResolver(validationSchema),
      defaultValues,
    });
    
    
    const {
        data: getManager,
        isLoading: isGetLoading,
        // isSuccess: isGetSuccess,
        // isError: isGetError,
        // error: getError,
      } = useGetManagerQuery({ pageUrl, params:  {search,page,size}  });
   
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = methods;
      const [addManager] = useAddManagerMutation();
      const [deleteManager] = useDeleteManagerMutation();
      const onSubmit = (values,e) => {
        
            addManager({ data: values })
            .unwrap()
            .then((payload) => {
                if (payload.status) {
                    e.target.reset()
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
        const handleDelete = (index,e) => {
           const values={id:index}
            deleteManager({ data: values })
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
      }
      const [adminId,setAdminId] = useState("");
      const getPrevious= () => {
        setPage(page-1);
        setSearch("");
      }
      const getNext=()=>{
        setPage(page+1);
        setSearch("");
      }
      const findSearch=(e)=>{
        setPage(0);
        setSearch(e.target.value);
      }
      if(isGetLoading)  <Loader></Loader>
      return (
        <div className="vehicleCategories">
            
            <Header />
            
            <main id="main" className="main">
                
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Trainers List</h5>
                    <ul className="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
                       <li className="nav-item flex-fill" role="presentation">
                        <button className="nav-link w-100 active" id="home-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-home" type="button" role="tab" aria-controls="home" aria-selected="true">Trainers  List</button>
                        </li>
                        <li className="nav-item flex-fill" role="presentation">
                        <button className="nav-link w-100" id="profile-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Trainers  Add</button>
                        </li>
                    </ul>
                    <div className="tab-content pt-2" id="borderedTabJustifiedContent">
                        <div className="tab-pane fade show active" id="bordered-justified-home" role="tabpanel" aria-labelledby="home-tab"> 
                            <section className="section">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Trainers List</h5>
                                                <div className='row'>
                                                    <div className='col-lg-8'></div>
                                                    <div className='col-lg-4'>
                                                        <div className="datatable-search pull-right">
                                                            <input className="datatable-input" placeholder="Search..." type="search" title="Search within table" onChange={findSearch}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th className='text-capitalize'>name</th>
                                                                <th className='text-capitalize'>designation</th>
                                                                <th className='text-capitalize'>phone number</th>
                                                                <th className='text-capitalize'>email</th>
                                                                <th className='text-capitalize'>level</th>
                                                                <th className='text-capitalize'>active</th>
                                                                <th className='text-capitalize'>action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                    
                                                            getManager?.data?.manager?.map((item) => {
                                                            return (
                                                                <tr key={item.admin_id}>
                                                                    <th scope="row">{item.admin_id}</th>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.designation}</td>
                                                                    <td>{item.phone_number}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.level}</td>
                                                                    <td>{item.active}</td>
                                                                    <td>
                                                                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">

                                                                        <div className="btn-group" role="group">
                                                                            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            Action
                                                                            </button>
                                                                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                                            <button className="dropdown-item"  data-bs-toggle="modal" onClick={()=>setAdminId(item.admin_id)} data-id={item.admin_id} data-bs-target="#fullscreenModal" >
                                                                                <div className="icon text-info">
                                                                                <i className="bi bi-pencil-square"></i>
                                                                                    Update
                                                                                </div>
                                                                            </button>
                      
                                                                            <Link className="dropdown-item" to="#" onClick={e => handleDelete(item.admin_id,e)}>
                                                                                <div className="icon text-danger">
                                                                                <i className="bi bi-trash"></i>
                                                                                    Delete
                                                                                </div>
                                                                            </Link>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>                                            
                                                                )
                                                                
                                                            })
                                                           
                                                            
                                                        } 
                                                        </tbody>
                                                </table>                        
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination">
                                                    {getManager?.data?.currentPage !=0 ? <li className="page-item"><button type="button" className="page-link" onClick={getPrevious}>Previous</button></li> :''}
                                                    
                                                    <li className="page-item"> {getManager?.data?.currentPage+1} </li>                                                  
                                                    <li className="page-item"> of {getManager?.data?.totalPages}</li>
                                                    {getManager?.data?.currentPage !=getManager?.data?.totalPages ? <li className="page-item"><button type="button" className="page-link" onClick={getNext}>Next</button></li>:''}
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>  
                        </div>
                       
                        <UpdateManagerPage id={adminId}></UpdateManagerPage>
                        <div className="tab-pane fade" id="bordered-justified-profile" role="tabpanel" aria-labelledby="profile-tab" >
                            <section className="section">
                                <div className="card">
                                    <div className="card-body">
                                    <h5 className="card-title">Add Trainers</h5>
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <div className="row mb-3">
                                            <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">name</label>
                                            <div className="col-sm-10">
                                                <input type="name" {...register("name")} className="form-control" />
                                                <span className="text-danger">{errors.name?.message}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">designation</label>
                                            <div className="col-sm-10">
                                                <input type="name" {...register("designation")} className="form-control" />
                                                <span className="text-danger">{errors.designation?.message}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">phone number</label>
                                            <div className="col-sm-10">
                                                <input type="number" {...register("phone_number")} className="form-control" />
                                                <span className="text-danger">{errors.phone_number?.message}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">email</label>
                                            <div className="col-sm-10">
                                                <input type="email" {...register("email")} className="form-control" />
                                                <span className="text-danger">{errors.email?.message}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputText" className="col-sm-2 col-form-label text-capitalize">level</label>
                                            <div className="col-sm-10">
                                                <input type="level" {...register("level")} className="form-control" />
                                                <span className="text-danger">{errors.level?.message}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <label htmlFor="active" className="col-sm-2 col-form-label">active</label>
                                            <div className="col-sm-10">
                                                <select  {...register("active")} className="form-control" >
                                                    <option value='active'>active</option>
                                                    <option value='inactive'>inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-2 col-form-label"></label>
                                            <div className="col-sm-10">
                                                <button type="submit" className="btn btn-warning w-100" >Add Trainers</button>
                                            </div>
                                        </div>

                                    </form>

                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            </main>
           
        </div>
    );
}
