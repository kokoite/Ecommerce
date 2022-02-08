import { Fragment, useState } from "react"
import './userOption.css'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useSelector,useDispatch } from "react-redux"
import {useHistory} from 'react-router-dom'
import Profile from '../../../images/Profile.png'
import { useAlert } from "react-alert";
import { logoutAction } from "../../../actions/userAction";
import { Backdrop } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const UserOption = ()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false);
    const {USER} = useSelector((state) => state.user);
    const alert = useAlert();
    const options = [
        {icon:<PersonIcon/>,name:"Profile",func:account},
        {icon:<ShoppingCartIcon/>,name:"Cart",func:goToCart},      
        {icon:<ListAltIcon/>,name:"Order",func:orders},
        {icon:<ExitToAppIcon/>,name:"Logout",func:logout},
    ]
    if(USER.role === "admin")
    {
        options.unshift({icon:<DashboardIcon/>,name:"dashboard",func:dashboard});
    }
    function account () {
        history.push("/account");
    }
    function logout () {
        dispatch(logoutAction());
        alert.success("Logout Success");
    }
    function dashboard(){
        history.push("/dashboard");
    }
    function goToCart(){
        history.push("/cart");
    }
    function orders (){
        history.push("/orders");
    }
    return (
        <Fragment>
            <Backdrop open = {open} style = {{zIndex:10}} />
            
                <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                open = {open}
                direction="down"
                className='speedDial'
                style= {{zIndex:'11'}}
                icon={
                    <img
                      className="speedDialIcon"
                      src={USER.avatar.url ? USER.avatar.url : Profile}
                      alt="Profile"
                    />
                }>
                {options.map((option) =>(
                    <SpeedDialAction icon={option.icon} onClick={option.func} tooltipTitle = {option.name} key = {option.name}  />
                ))}
                </SpeedDial>
        </Fragment>
    )
}
export default UserOption;