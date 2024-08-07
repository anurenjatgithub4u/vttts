// import axios from 'axios';
// import { useRoute } from "@react-navigation/native";

// export const useHeader = () => {
//    const location = useRoute();

//    const ApiRequestAuthorizationHook = axios.create({
//       baseURL: "https://cgvtsapi.cgstate.gov.in/api",
//       headers: {
//          'Content-Type': 'application/json',
//          'Authorization': `Basic ${location?.params?.userToken}`,
//       },
//    });
//    const ApiRequestPasswordUpdate = axios.create({
//       baseURL: "https://cgvtsapi.cgstate.gov.in/api",
//       headers: {
//          'Content-Type': 'application/x-www-form-urlencoded',
//          'Authorization': `Basic ${location?.params?.userToken}`,
//       },
//    });

//    const ApiUrl = {
//       baseURL: "https://cgvtsapi.cgstate.gov.in/api"
//    }
//    const ApiPostUrl = axios.create({
//       baseURL: "https://cgvtsapi.cgstate.gov.in/api",
//       headers: {
//          'Content-Type': 'application/x-www-form-urlencoded',
//       },
//    })
//    const ApiNewUser = axios.create({
//       baseURL: "https://cgvtsapi.cgstate.gov.in/api",
//       headers: {
//          'Content-Type': 'application/json',
//       },
//    })
//    const ApiDownload = {
//       baseURL: "https://cgvtsapi.cgstate.gov.in/api",
//       headers: {
//          'Authorization': `Basic ${location?.params?.userToken}`,
//       },
//    }

//    const ApiRequestForUpoadBulk = axios.create({
//       baseURL: "https://cgvtsapi.cgstate.gov.in/api",
//       headers: {
//          'content-type': 'multipart/form-data',
//          'Authorization': `Basic ${location?.params?.userToken}`,
//       },
//    });

//    return ({
//       ApiRequestAuthorizationHook: ApiRequestAuthorizationHook,
//       ApiRequestPasswordUpdate: ApiRequestPasswordUpdate,
//       ApiUrl: ApiUrl,
//       ApiPostUrl: ApiPostUrl,
//       ApiNewUser: ApiNewUser,
//       ApiDownload: ApiDownload,
//       ApiRequestForUpoadBulk: ApiRequestForUpoadBulk,
//    });
// }
import axios from 'axios';
import { useRoute } from "@react-navigation/native";

export const useHeader = () => {
   const location = useRoute();

   const ApiRequestAuthorizationHook = axios.create({
      baseURL: "https://cgvtsapi.trackolet.in/api",// https://trackolet.in
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Basic ${location?.params?.userToken}`,
      },
   });
   const ApiRequestPasswordUpdate = axios.create({
      baseURL: "https://cgvtsapi.trackolet.in/api",// https://trackolet.in
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': `Basic ${location?.params?.userToken}`,
      },
   });

   const ApiUrl = {
      baseURL: "https://cgvtsapi.trackolet.in/api"// https://trackolet.in
   }
   const ApiPostUrl = axios.create({
      baseURL: "https://cgvtsapi.trackolet.in/api",// https://trackolet.in
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
   })
   const ApiNewUser = axios.create({
      baseURL: "https://cgvtsapi.trackolet.in/api",// https://trackolet.in
      headers: {
         'Content-Type': 'application/json',
      },
   })
   const ApiDownload = {
      baseURL: "https://cgvtsapi.trackolet.in/api",// https://trackolet.in
      headers: {
         'Authorization': `Basic ${location?.params?.userToken}`,
      },
   }

   const ApiRequestForUpoadBulk = axios.create({
      baseURL: "https://cgvtsapi.trackolet.in/api",// https://trackolet.in
      headers: {
         'content-type': 'multipart/form-data',
         'Authorization': `Basic ${location?.params?.userToken}`,
      },
   });

   return ({
      ApiRequestAuthorizationHook: ApiRequestAuthorizationHook,
      ApiRequestPasswordUpdate: ApiRequestPasswordUpdate,
      ApiUrl: ApiUrl,
      ApiPostUrl: ApiPostUrl,
      ApiNewUser: ApiNewUser,
      ApiDownload: ApiDownload,
      ApiRequestForUpoadBulk: ApiRequestForUpoadBulk,
   });
}