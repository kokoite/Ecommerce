import axios from "axios";
import { CLEAR_ERROR, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constant/constant"

export const loginAction = (email,password) => async(dispatch) =>{
    try{
        dispatch({type:USER_LOGIN_REQUEST});
        const user = {email,password};
        const header = {headers:{'content-type':'application/json'}}
        const {data} = await axios.post("/api/v1/login",user,header);
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
    }
    catch(error)
    {
        dispatch({type:USER_LOGIN_FAIL,error:error.response.data.message})
    }
}
export const registerAction = (dat) => async(dispatch) =>{
    try{
        dispatch({type:USER_REGISTER_REQUEST});
        const header = {headers:{'content-type':'multipart/form-data'}}
        const {data} = await axios.post("/api/v1/register",dat,header)
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:USER_REGISTER_FAIL,error:error.response.data.message})
    }
}
export const loadUser = () => async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST});
        const {data} = await axios.get("/api/v1/profile");
        dispatch({type:LOAD_USER_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:LOAD_USER_FAIL,error:error.response.data.message});
    }
}
export const logoutAction = () => async(dispatch) =>{
    try{
        await axios.get("/api/v1/logout");
        dispatch({type:LOGOUT_USER_SUCCESS});
    }
    catch(error)
    {
        dispatch({type:LOGOUT_USER_FAIL,error:error.response.data.message});
    }
}
 
export const clearError = () => async(dispatch) =>{
    dispatch({type:CLEAR_ERROR});
}