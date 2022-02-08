import { CLEAR_ERROR, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDER_REQUEST, MY_ORDER_SUCCESS,MY_ORDER_FAIL,CLEAR_ERROR_CREATE_ORDER,CLEAR_ERROR_MY_ORDER, ORDER_DETAIL_REQUEST,ORDER_DETAIL_FAIL,ORDER_DETAIL_SUCCESS } from "../constant/constant";

export const createOrderReducer = (state={},action)=>{
    switch(action.type)
    {
        case CREATE_ORDER_REQUEST:
            return{
                loading:true,
            }
        case CREATE_ORDER_SUCCESS:
            console.log(action.payload);
            return {
                loading:false,
                order:action.payload.order,
                status:action.payload.success
            }
        case CREATE_ORDER_FAIL:
            return {
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR_CREATE_ORDER:
            return {
                error:null
            }
        default:
            return state
    }
}
export const myOrder = (state = {},action) =>{
    switch(action.type)
    {
        case MY_ORDER_REQUEST:
            return {
                loading:true,
            }
        case MY_ORDER_SUCCESS:
            return {
                loading:false,
                orders:action.payload.order
            }
        case MY_ORDER_FAIL:
            return {
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR_MY_ORDER:
            return {
                error:null
            }
        default:
            return state
    }
}
export const orderDetailReducer = (state = {loading:true,},action)=>{
    switch(action.type)
    {
        case ORDER_DETAIL_REQUEST:
            return state;
        case ORDER_DETAIL_SUCCESS:
            return {
                loading:false,
                order:action.payload.order
            }
        case ORDER_DETAIL_FAIL:
            return {
                loading:false,
                error:action.payload.error
            }
        default :
            return state
    }
}