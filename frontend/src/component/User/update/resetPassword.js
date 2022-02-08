import { Fragment, useEffect, useState } from 'react'
import './resetPassword.css'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import {useAlert} from 'react-alert'
import {useSelector,useDispatch} from 'react-redux'
import {clearError, resetPasswordAction} from '../../../actions/updateProfileAction';
import Loader from '../../layout/Loader/Loader'
import { RESET_PASSWORD_RESET} from '../../../constant/constant'
import { logoutAction } from '../../../actions/userAction'
export const ResetPassword = ({history,match})=>{
    const dispatch = useDispatch();
    const alert = useAlert();
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const {USER} = useSelector((state) => state.user);
    const resetPassword = (event) =>{
        event.preventDefault();
        const obj = {password,confirmPassword};
        const token = match.params.token;
        dispatch(resetPasswordAction(token,obj));
    }
    const {loading,isReset,error} = useSelector((state) =>state.resetPassword);
    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(clearError());
        }
        if(isReset)
        {
            alert.success("Password reset Success");
            dispatch({type:RESET_PASSWORD_RESET})
            if(USER)
            {
                dispatch(logoutAction());
            }
            history.push("/login");
        }
    },[dispatch,isReset,error,alert,history,USER]);
    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
            <div className='resetPasswordContainer'>
                <div className='resetPasswordBox'>
                    <div>
                        <h2 className='resetPasswordHeading'>Reset Password</h2>
                    </div>
                    <form className ="resetPasswordForm" onSubmit ={resetPassword} >
                            <div className ="resetPassword">
                                <LockOpenIcon/>
                                <input type="password" placeholder="New Password" required value = {password} 
                                onChange = {(event) => setPassword(event.target.value)} 
                                />
                            </div>
                            
                            <div className ="resetPassword">
                                <LockOpenIcon/>
                                <input type="password" placeholder="Confirm Password" required value = {confirmPassword} 
                                onChange = {(event) => setConfirmPassword(event.target.value)} 
                                />
                            </div>
                            <input type = "submit" value = "Reset" className = "resetButton" />
                        </form>
                </div>
            </div>
        </Fragment>)}
        </Fragment>
    )
}