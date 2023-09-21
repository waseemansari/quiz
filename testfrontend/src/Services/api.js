// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { emptySplitApi } from "./emptySplitApi";
import { API_END_POINTS } from "../config/ApiEndPoints";

export const api = emptySplitApi.injectEndpoints({
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  refetchOnFocus:true,
  endpoints: (builder) => ({
    loginuser: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.login,
        method: "POST",
        body: { ...data },
      }),
    }),
    updatepassword: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.updatePassword,
        method: "PUT",
        body: { ...data },
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.updateProfile,
        method: "PUT",
        body: { ...data },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: API_END_POINTS.logout,
        method: "POST",
      }),
    }),
    getdiarylist: builder.query({
      query: ({ pageUrl, params }) => {
        return {
          url: pageUrl || API_END_POINTS.diarylist,
          method: "GET",
          params,
        };
      },
      providesTags:["getDiarylist"]
    }),
   
    getManagerList: builder.query({
      query: () => {
        return {
          url: API_END_POINTS.managerList,
          method: "GET",
        };
      },
    }),
   ////////////////manager////////////
   addManager: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.manager,
        method: "POST",
        body: { ...data },
        
      }),
      invalidatesTags:["getManager"]
   }),
   updateManager: builder.mutation({
        query: ({ data,param }) => {
          return {
            url: API_END_POINTS.manager+'/'+param,
            method: "PUT",
            body: { ...data },
          };
        },
        invalidatesTags:["getManager"]
    }),
    deleteManager: builder.mutation({
        query: ({ data }) => ({
          url: API_END_POINTS.manager,
          method: "DELETE",
          body: { ...data },
        }),
        invalidatesTags:["getManager"]
    }),
    getManager: builder.query({
        query: ({ pageUrl, params }) => {
       
          return {
            url: pageUrl || API_END_POINTS.manager,
            method: "GET",
            params,
          };
        
        },
        providesTags:["getManager"]
    }),
    showManager: builder.query({
          query: ({ params }) => {
            return {
              url: API_END_POINTS.manager+'/'+params,
              method: "GET",
             
            };
          },
         
      }),
   ///////////////end manager ////////
  }),

  overrideExisting: true,

});
export const {
  useLoginuserMutation,
  useUpdatepasswordMutation,
  useUpdateProfileMutation,
  useLogoutMutation,
  
  /////////manager list/////////
  useGetManagerListQuery,
  useGetManagerQuery,
  useShowManagerQuery,
  useAddManagerMutation,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
} = api;