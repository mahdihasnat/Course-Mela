import axios from "axios";
import {getHeader} from "../../shared/Header";

class ImageService{
    // constructor ImageService(){
    //     super();
    // }


    loadImage(url){
        return axios({
            method:"GET",
            url:url,
            headers:getHeader(),
            responseType:'blob'
        })
    }
}

// const loadImage = (url)=>{
//
//
// }


export default new ImageService();