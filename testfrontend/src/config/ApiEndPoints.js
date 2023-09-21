export const BASE_URL = process.env.REACT_APP_BACKEND_URL_LIVE;
export const API_END_POINTS = {
  login: BASE_URL + "login",
  logout: BASE_URL + "logout",
  updateProfile: BASE_URL + "update-profile",
  updatePassword: BASE_URL + "update-password",
 
  managerList: BASE_URL + "manager-list",
  manager: BASE_URL + "manager",
};  
