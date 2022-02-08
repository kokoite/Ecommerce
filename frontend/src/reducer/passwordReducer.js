import { CLEAR_ERROR, FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_RESET, FORGET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_RESET, RESET_PASSWORD_SUCCESS } from "../constant/constant";

export const forgetPasswordReducer = (state = {},action) =>{
    switch(action.type)
    {
        case FORGET_PASSWORD_REQUEST:
            return {
                ...state,
                isSent:false,
                loading:true,
            }
        case FORGET_PASSWORD_SUCCESS:
            return {
                ...state,
                isSent:true,
                loading:false,
                message:action.payload.message
            }
        case FORGET_PASSWORD_FAIL:
            return {
                isSent:false,
                loading:false,
                error:action.error
            }
        case FORGET_PASSWORD_RESET:
            return{
                error:null
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}
export const resetPasswordReducer = (state={},action) =>{
    switch(action.type)
    {
        case RESET_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                isReset:action.payload.success,
            }
        case RESET_PASSWORD_FAIL:
            return {
                loading:false,
                error:action.error,
            }
        case RESET_PASSWORD_RESET:
            return {
                isReset:false
            }
        case CLEAR_ERROR:
            return{
                error:null
            }
        
        default:
            return state
    }
}