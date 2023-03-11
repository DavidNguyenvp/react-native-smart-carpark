import axios from "axios";

//const DEV_URL = "http://localhost:3000/"
const PRO_URL = "https://jv3ne1tr92.execute-api.us-east-2.amazonaws.com/develop/"

export default axios.create({
    baseURL: PRO_URL,
    headers: {
        "Content-type": "application/json"
    }
});