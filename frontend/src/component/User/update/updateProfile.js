import { Fragment, useState,useEffect } from "react"
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from '@material-ui/icons/Face'
import { useDispatch,useSelector } from "react-redux"
import './updateProfile.css'
import {clearError, loadUser} from '../../../actions/userAction'
import {updateProfileAction} from "../../../actions/updateProfileAction"
import {useAlert} from 'react-alert'
import { UPDATE_PROFILE_RESET } from "../../../constant/constant"
import Loader from '../../layout/Loader/Loader'
const UpdateProfile = ({history}) =>{
    const dispatch = useDispatch();
    
    const alert = useAlert();
    const {USER} = useSelector((state) => state.user); 
    const {loading,isUpdated,error} = useSelector((state) => state.updateProfile);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [avatar,setAvatar] = useState("");
    const [avatarPreview,setAvatarPreview] = useState("");
    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      };
    const onSubmit = (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.set("name",name);
        formData.set("email",email);
        formData.set("avatar",avatar);
        dispatch(updateProfileAction(formData));
    }
    useEffect(()=>{
        
        if(USER)
        {
            setName(USER.name);
            setEmail(USER.email);
            setAvatarPreview(USER.avatar.url);
            setAvatar("");
        }
        if(error)
        {
            alert.error(error);
            dispatch(clearError())
        } 
        if(isUpdated)
        {
            dispatch(loadUser());
            alert.success("Profile updated Success");
            dispatch({type:UPDATE_PROFILE_RESET})
            history.push("/account");
        }
    },[dispatch,alert,error,history,USER,isUpdated]);
    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
           <div className="updateProfileContainer">
               <div className="updateProfileBox">
                <div>
                    <h2 className = "updateProfileHeading">Update Profile</h2>
                </div>
                <form className = "updateForm"  onSubmit = {onSubmit} encType = 'multipart/form-data'>
                            <div className = "updatename">
                                <FaceIcon/>
                                <input type = "text" placeholder="Name" name = "name" value = {name} onChange ={(e) => setName(e.target.value)} />
                            </div>
                            <div className = "updateEmail">
                                <MailOutlineIcon/>
                                <input type = "email" placeholder = "Email" name="email" value={email} onChange = {(e) => setEmail(e.target.value)} />
                            </div>
                            <div id = "updateImage">
                                <img src = {avatarPreview} alt = "Avatar Preview " />
                                <input type = "file" name = "image" accept="image/*" onChange={updateProfileDataChange} />
                            </div>
                            <input type = "submit" value = "Update" className = "updateButton"/>
                        </form>
               </div>
           </div>
        </Fragment>)}
        </Fragment>
    )
}
export default UpdateProfile;