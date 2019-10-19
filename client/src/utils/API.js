import axios from "axios";
import Cookies from "js-cookie";

export default {
  getImages: () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('jwt')}`;
    return Cookies.get('jwt') && axios.get("/api/image") || Promise.reject("UNAUTHORIZED");
  },
  addImage: (image) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('jwt')}`;
    return Cookies.get('jwt') && axios.post("/api/image", {link: image}) || Promise.reject("UNAUTHORIZED");
  }
};