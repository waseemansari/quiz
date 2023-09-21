
import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PATHS from "./paths";
import DashbaordLayout from '../pages/Home'
// import DashbaordLayout from "../layouts/DashboardLayout";
// import checkPermission from './../utils/checkPermissions';
// import ScaffoldingTabs from "../pages/scaffolding/ScaffoldingTabs";
// import {
//   USER_VIEW, ROLE_VIEW, ZONE_VIEW, SITE_VIEW, FIELD_MANAGEMENT, CLIENT_VIEW,
//   PROJECT_VIEW, COMPANY_VIEW, FUNCTION_VIEW, LANGUAGE_VIEW,
//   DEPARTMENT_VIEW, PERMISSION_VIEW, COMPANY_OR_CLIENT_VIEW, INFORMATION_VIEW
// } from '../utils/constants';
// import TbmDetail from "../pages/toolboxMeeting/TbmDetail";

const Loadable = (Component) => (props) => {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};
export default function Router() {

  // const user_view = checkPermission(USER_VIEW);
  // const site_view = checkPermission(SITE_VIEW);
  // const role_view = checkPermission(ROLE_VIEW);
  // const zone_view = checkPermission(ZONE_VIEW);
  // const field_view = checkPermission("feild_view");
  // const field_manage = checkPermission(FIELD_MANAGEMENT);

  // const client_view = checkPermission(CLIENT_VIEW);
  // const project_view = checkPermission(PROJECT_VIEW);
  // const company_view = checkPermission(COMPANY_VIEW);
  // const language_view = checkPermission(LANGUAGE_VIEW);
  // const permission_view = checkPermission(PERMISSION_VIEW);
  // const information_view = checkPermission(INFORMATION_VIEW);
  // const company_or_client_view = checkPermission(COMPANY_OR_CLIENT_VIEW);

  const auth = useSelector((data) => data.auth);
  const main_admin = useSelector((state) => state.auth?.userDetail?.user);

  return useRoutes(
    auth.isLoggedIn && auth.userDetail ? [
      { path: "/", element: <Navigate to={PATHS.dashboard} /> },
      {
        path: PATHS.dashboard,
        element: <DashbaordLayout />,
        //children: [
          // {
          //   path: PATHS.dashboard,
          //   element: (
          //     <Navigate
          //       to={
          //         (user_view && main_admin != 'main_admin')
          //           ? PATHS.users
          //           : company_or_client_view
          //             ? PATHS.clients
          //             : (permission_view || role_view)
          //               ? PATHS.rolepermission
          //               : language_view
          //                 ? PATHS.localization
          //                 : company_view
          //                   ? PATHS.companies
          //                   : field_manage
          //                     ? PATHS.fieldManagement
          //                     : (client_view || site_view || project_view || zone_view)
          //                       ? PATHS.clientSites
          //                       : information_view
          //                         ? PATHS.information
          //                         : PATHS.Profile
          //       }
          //     />
          //   ),
          // },
        //   { path: PATHS.users, element: <Users /> },
        //   { path: PATHS.toolboxmeeting, element: <ToolBoxMeeting /> },
        //   { path: PATHS.toolboxmeetingDetail, element: <TbmDetail /> },
        //   { path: PATHS.rolepermission, element: <RoleAndPermission /> },
        //   { path: PATHS.Profile, element: <Profile /> },
        //   { path: PATHS.lmra, element: <Lmra /> },
        //   { path: PATHS.fieldManagement, element: <FieldManagement /> },
        //   { path: PATHS.localization, element: <LocalizationTabs /> },
        //   { path: PATHS.clientSites, element: <ClientManagement /> },
        //   { path: PATHS.companies, element: <Companies /> },
        //   { path: PATHS.information, element: <Classification /> },
        //   { path: PATHS.clients, element: <Clients /> },
        //   { path: PATHS.competencesettings, element: <CompetenceSettings /> },
        //   { path: PATHS.journeyplanner, element: <JourneyPlanner /> },
        //   { path: PATHS.scaffolding, element: <ScaffoldingTabs /> },
        //   { path: PATHS.siteInspection, element: <SiteInspection /> },
        //   { path: PATHS.lmra, element: <Lmra /> },
        //   { path: PATHS.siteInspectionTemplate, element: <SiteInspectionTemplate /> },
        //   { path: PATHS.scaffoldingManagement, element: <ScaffoldingManagement /> },
        //   { path: PATHS.scaffoldingManagement, element: <ScaffoldingManagement /> },
        //   { path: PATHS.competence, element: <Competence /> },
        //   { path: PATHS.safetyDocument, element: <SafetyDocument /> },
        //   { path: PATHS.siteInspectionTemplateDetails, element: <SiteInspectionTemplateDetails /> },
        //   { path: PATHS.siTemplateReport, element: <SiReport /> },
        //   { path: PATHS.lmraTemplateDetails, element: <LmraTemplateDetails /> },
        //   { path: PATHS.lmraTemplateReport, element: <LmraTemplateTemplate /> },
      // ],
       },
      // { path: "*", element: <Navigate to={PATHS.dashboard} /> },
    ]
      : [
        { path: "/", element: <Navigate to={PATHS.signin} /> },
        { path: PATHS.signin, element: <SignIn /> },
        { path: '*', element: <Navigate to={PATHS.signin} /> }
        /**  { path: PATHS.resetpassword, element: <ResetPassword /> },
          { path: PATHS.newPassword, element: <NewPassword /> },*/
      ]
  );
}

const SignIn = Loadable(lazy(() => import("../pages/auth/Login")));
// const ResetPassword = Loadable(lazy(() => import("../pages/authentication/ResetPassword")));
// const NewPassword = Loadable(lazy(() => import("../pages/authentication/NewPassword")));
// const Users = Loadable(lazy(() => import("../pages/users/Users")));
// const ToolBoxMeeting = Loadable(lazy(() => import("../pages/toolboxMeeting/ToolBoxMeeting")));
// const toolboxmeetingDetail = Loadable(lazy(() => import("../pages/toolboxMeeting/TbmDetail")));
// const Profile = Loadable(lazy(() => import("../pages/profile/Profile")));
// // const Lmra = Loadable(lazy(() => import("../pages/fieldManagement/Lmra")));
// const FieldManagement = Loadable(lazy(() => import("../pages/fieldManagement/FieldManagementTab")));
// const RoleAndPermission = Loadable(lazy(() => import("../pages/roleAndPermission/RoleAndPermissionTabs")));
// const ClientManagement = Loadable(lazy(() => import("../pages/clientManagement/ClientManagementTabs")));
// const LocalizationTabs = Loadable(lazy(() => import("../pages/localization/LocalizationTabs")));
// const Companies = Loadable(lazy(() => import("../pages/companies/CompaniesTabs")));
// const Classification = Loadable(lazy(() => import("../pages/information/InformationTabs")));
// const Clients = Loadable(lazy(() => import("../pages/superClients/Clients")));
// const CompetenceSettings = Loadable(lazy(() => import("../pages/competenceSetting/CompetencesettingTabs")));
// const JourneyPlanner = Loadable(lazy(() => import("../pages/journeyPlanner/JourneyPlannerTabs")));
// const Scaffolding = Loadable(lazy(() => import("../pages/scaffolding/ScaffoldingTabs")));
// const SiteInspection = Loadable(lazy(() => import("../pages/siteInspection/SiteInspectionOverView")));
// const SiteInspectionTemplate = Loadable(lazy(() => import("../pages/siteInspection/SiteInspectionTemplate")));
// const Lmra = Loadable(lazy(() => import("../pages/lmra/LmraOverview")));
// const SiteInspectionTemplateDetails = Loadable(lazy(() => import("../pages/siteInspection/SiteInspectionDetail")));
// const SiReport = Loadable(lazy(() => import("../pages/siteInspection/SiteInspectionReport")));
// const LmraTemplateDetails = Loadable(lazy(() => import("../pages/lmra/LmraDetails")));
// const LmraTemplateTemplate = Loadable(lazy(() => import("../pages/lmra/LmraReport")));
// const ScaffoldingManagement = Loadable(lazy(() => import("../pages/scaffoldingManagement/ScaffoldingManagementTabs")));
// const Competence = Loadable(lazy(() => import("../pages/competence/CompetenceTabs")));
// const SafetyDocument = Loadable(lazy(() => import("../pages/safetyDocument/SafetyDocumentTabs")));

