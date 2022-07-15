import axios from 'axios';
import joinUrl from '../../utils/url';
import { baseUrl } from '../../shared/urls';

import { TEST_SERVER_LOADING, TEST_SERVER_SUCCESS, TEST_SERVER_ERROR } from './ServerTestTypes';


const testServerLoading = () => {
    return {
        type: TEST_SERVER_LOADING,
    }
}

const testServerSuccess = (serverResponse) => {
    return {
        type: TEST_SERVER_SUCCESS,
        payload: serverResponse,
    }
}

const testServerFailure = (error) => {
    return {
        type: TEST_SERVER_ERROR,
        payload: error,
    }
}

export const testServer = () => {
    return (dispatch) => {


        dispatch(testServerLoading());
        const url = joinUrl(baseUrl, 'hello');
        console.log(url);
        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            	
        }
        console.log(header);
        return axios.get(url, header)
            .then(response => {
                // console.log(response);
                // TODO: handle success response
                dispatch(testServerSuccess(response.data));
            }).catch(error => {
                console.log(error);
                dispatch(testServerFailure(error.message));

            });
    }
};

// export  testServer;