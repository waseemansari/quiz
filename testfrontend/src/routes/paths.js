
function path(root, sublink) {
  return `${root}${sublink}`
}
const ROOTS_DASHBOARD = '/dashboard';

const paths = {
  signin: '/signin',
  resetpassword: '/resetpassword',
  newPassword: '/newpassword/:token_id',
  dashboard: '/dashboard',
  diaryList: '/diary-list',
  managerList: '/manager-list',
  branches : path(ROOTS_DASHBOARD,'/branches'),
  signout: '/',
}
export default paths;