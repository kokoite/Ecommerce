import { PROD_DETAIL_FAIL, PROD_DETAIL_REQUEST, PROD_DETAIL_SUCCESS } from "../constant/constant"
import axios from 'axios'
const prodDetailAction = (id) => async(dispatch) =>{
    try{
        dispatch({type:PROD_DETAIL_REQUEST});
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch({type:PROD_DETAIL_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:PROD_DETAIL_FAIL,error:error.response.data.message})
    }
}
export default prodDetailAction;