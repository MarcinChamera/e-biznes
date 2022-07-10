import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:1323",
    headers: {
        "Content-Type": "application/json",
      }
})