import { CLEAR_ERROR, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constant/constant";

export const loginReducer = (state = {user:{}},action) =>{
    switch(action.type)
    {
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
        
            return {
                ...state,
                loading:true,
                isAuthenticated:false
            }
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                USER:action.payload.user,
                loading:false,
                isAuthenticated:true
            }
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated:false,
                loading:false,
                USER:null,
                error:null
            }
        
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
        case LOGOUT_USER_FAIL:
            return{
                ...state,
                isAuthenticated:false,
                loading:false,
                error:action.error,
                USER:null
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                isAuthenticated:false,
                loading:false,
                error:action.error,
                USER:null
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
                };
        default:
            return {...state}
    }   
}