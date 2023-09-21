import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    //prepare headers work need to be done
    prepareHeaders : async (headers, {getState}) => {
      try{
        const token = getState().auth?.userDetail?.token;
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        } else {
          headers.set('authorization', '')
        }
      } catch(err) {
        headers.set('authorization', '')
      }
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "getDiarylist",
    "getManager",
  ],
});
