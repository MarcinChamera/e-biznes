import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:1323",

    // headers: {
    //     "Content-Type": "application/json",
    // },
    // transformRequest: [
    //     data => {
    //       return JSON.stringify(data);
    //     },
    //   ],
    //   transformResponse: [
    //     data => {
    //       return JSON.parse(data);
    //     },
    //   ],
    headers: {
        // "Access-Control-Allow-Origin": "http://localhost:1323",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
})