import{
    TEST_SERVER_LOADING,
    TEST_SERVER_SUCCESS,
    TEST_SERVER_ERROR,
} from './ServerTestTypes';



const initState = {
    isLoading: false,
    serverStatus: null,
    error: ''
}

const ServerTestReducer = (state = initState, action) => {
    switch (action.type) {
        case TEST_SERVER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case TEST_SERVER_SUCCESS:
            return {
                isLoading: false,
                serverStatus: action.payload,
                error: '',
            }
        case TEST_SERVER_ERROR:
            return {
                isLoading: false,
                serverStatus: null,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default ServerTestReducer;