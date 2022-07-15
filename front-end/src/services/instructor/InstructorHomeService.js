import axios from 'axios';	
import { INSTR_URL } from '../../shared/urls';
import joinUrl from '../../utils/url';

class HomeService{
    HomeService(){
        this.getHeader =  {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
                
        }

        this.baseUrl = INSTR_URL;
        
    }

    getMyCourses(){

        return axios({
            method: 'get',
            url: joinUrl(this.baseUrl, 'courses'),
            headers: this.getHeader,

        })

    }
    
    
}