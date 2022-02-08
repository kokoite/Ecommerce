import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,CLEAR_ERROR, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL } from "../constant/constant"
import axios from 'axios'
export const createOrder = (order) => async(dispatch) =>{
    try{
        dispatch({type:CREATE_ORDER_REQUEST});
        const headers = {header:{'content-type':'application/json'}}
        const {data} = await axios.post("/api/v1/order",order,headers);
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:CREATE_ORDER_FAIL,error:error.response.data.message})
    }
}
export const myOrder = () => async(dispatch) =>{
    try{
        dispatch({type:MY_ORDER_REQUEST});
        const {data} = await axios.get("/api/v1/orders/my");
        dispatch({type:MY_ORDER_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:MY_ORDER_FAIL,error:error.response.data.message})
    }
}
export const orderDetailAction = (id) =>async(dispatch) =>{
    try{
        dispatch({type:ORDER_DETAIL_REQUEST});
        const {data} = await axios.get(`/api/v1/order/${id}`);
        dispatch({type:ORDER_DETAIL_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:ORDER_DETAIL_FAIL,error:error.response.data.message})
    }
}
export const clearError = () => async(dispatch)=>{
    dispatch({type:CLEAR_ERROR})
}