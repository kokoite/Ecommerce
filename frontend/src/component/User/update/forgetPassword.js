import { Fragment, useState,useEffect } from "react"
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import './fogetPassword.css'
import {clearError, forgetPasswordAction} from '../../../actions/updateProfileAction'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../../layout/Loader/Loader'
export const ForgetPassword = ()=>{
    const dispatch = useDispatch();
    const {loading,message,error,isSent} = useSelector((state => state.forgetPassword));
    const [email,setEmail] = useState("");
    const alert = useAlert();
    const forgetPassword = (event)=>{
        event.preventDefault();
        dispatch(forgetPasswordAction({email}));
    }
    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(clearError());
        }
        if(isSent)
        {
            alert.success(message);
        }
    },[dispatch,alert,error,isSent,message])
    return (
        <Fragment>
            {loading ? <Loader /> :(<Fragment>
            <div className='forgetPasswordContainer'>
                <div className='forgetPasswordBox'>
                    <div>
                        <h2 className='forgetPasswordHeading'>Forget Password</h2>
                    </div>
                    <form className ="forgetPasswordForm" onSubmit ={forgetPassword} >
                            <div className ="loginPassword">
                                <MailOutlineIcon/>
                                <input type="email" placeholder="Enter email address" required value = {email} 
                                onChange = {(event) => setEmail(event.target.value)} 
                                />
                            </div>
                            <input type = "submit" value = "Enter to Reset" className = "forgetButton" />
                        </form>
                </div>
            </div>
        </Fragment>)}
        </Fragment>
    )
}