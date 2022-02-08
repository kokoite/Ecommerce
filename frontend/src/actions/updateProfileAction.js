import axios from "axios";
import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS,CLEAR_ERROR, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS,FORGET_PASSWORD_FAIL,FORGET_PASSWORD_REQUEST,FORGET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../constant/constant"

export const updateProfileAction = (formData) => async(dispatch) =>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST,payload:formData});
        const headers = {header:{'content-type':'multipart/form-data'}};
        const {data} = await axios.put('/api/v1/update-profile',formData,headers);
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data});
    }
    catch(error)
    {
        console.log(error.response.data.message);
        dispatch({type:UPDATE_PROFILE_FAIL,error:error.response.data.message})
    }
}
export const updatePasswordAction = (password)=> async(dispatch) =>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST});
        const headers = {header:{'content-type':'application/json'}}
        const {data} = await axios.put("/api/v1/update-password",password,headers);
        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:UPDATE_PASSWORD_FAIL,error:error.response.data.message})
    }
}

export const forgetPasswordAction = (email) => async(dispatch)=>{
    try{
        dispatch({type:FORGET_PASSWORD_REQUEST});
        console.log(email);
        const headers = {header:{'content-type':'application/json'}} 
        const {data} = await axios.post("/api/v1/forget-password",email,headers);
        dispatch({type:FORGET_PASSWORD_SUCCESS,payload:data});
    }
    catch(error){
        dispatch({type:FORGET_PASSWORD_FAIL,error:error.response.data.message});
    }
}
export const resetPasswordAction = (token,obj) => async(dispatch) =>
{
    try{
        dispatch({type:RESET_PASSWORD_REQUEST});
        const headers = {header:{'content-type':'application/json'}}
        const {data} = await axios.put(`/api/v1/reset-password/${token}`,obj,headers);
        dispatch({type:RESET_PASSWORD_SUCCESS,payload:data});
    }
    catch(error)
    {
        console.log(error.response.data.message);
        dispatch({type:RESET_PASSWORD_FAIL,error:error.response.data.message});
    }
}
export const clearError = () => async(dispatch) => {
    dispatch({type:CLEAR_ERROR})
}