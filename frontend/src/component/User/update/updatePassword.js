import {Fragment, useEffect, useState} from 'react'
import './updatePass.css'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { Link } from 'react-router-dom'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import { clearError, updatePasswordAction } from '../../../actions/updateProfileAction'
import {loadUser} from '../../../actions/userAction'
import { UPDATE_PASSWORD_RESET } from '../../../constant/constant'
export const UpdatePassword = ({history}) =>{
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,isUpdated,error} = useSelector((state) => state.updateProfile);
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(clearError());  
        }
        if(isUpdated)
        {
            alert.success("password changed successfully");
            dispatch(loadUser());
            dispatch({type:UPDATE_PASSWORD_RESET});
            history.push("/account");
        }
    },[alert,error,dispatch,isUpdated,history]);
    const updatePassword = (event)=>{
        event.preventDefault();
        const obj = {oldPassword,newPassword,confirmPassword};
        dispatch(updatePasswordAction(obj));
    }
    return (
        <Fragment>
            <div className='updatePasswordContainer'>
                <div className='updatePasswordBox'>
                    <div>
                        <h2 className='updatePasswordHeading'>Update Password</h2>
                    </div>
                    <form className ="updatePasswordForm" onSubmit ={updatePassword} >
                            <div className ="loginPassword">
                                <LockOpenIcon/>
                                <input type="password" placeholder="Old Password" required value = {oldPassword} 
                                onChange = {(event) => setOldPassword(event.target.value)} 
                                />
                            </div>
                            <div className ="loginPassword">
                                <LockOpenIcon/>
                                <input type="password" placeholder="New Password" required value = {newPassword} 
                                onChange = {(event) => setNewPassword(event.target.value)} 
                                />
                            </div>
                            <div className ="loginPassword">
                                <LockOpenIcon/>
                                <input type="password" placeholder="Password" required value = {confirmPassword} 
                                onChange = {(event) => setConfirmPassword(event.target.value)} 
                                />
                            </div>
                            <Link to = "/forget-password">Forget Password</Link>
                            <input type = "submit" value = "Update" className = "updateButton" />
                        </form>
                </div>
            </div>

        </Fragment>
    )
}