import Header from '../../__Layout/Header';
import React , {useState} from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Loader from '../../utils/Loader';
import {  useGetManagerQuery,useAddManagerMutation ,useDeleteManagerMutation} from "../../Services/api";
import WarningAlert from '../../utils/WarningAlert';
import UpdateManager from './UpdateManager';
import AddManager from './AddManager';
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
                
                toast.error(error.data.message)
            });
            notify();
        };
       
      return (
        <p>ddddddddddd</p>
    );
}
