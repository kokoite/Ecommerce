import { Fragment} from "react"
import {useSelector} from 'react-redux'
import MetaData from '../../MetaData'
import prof from '../../images/Profile.png'
import {Link} from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import './profile.css'
export const Profile = ()=>{
    const {USER,loading} = useSelector((state) => state.user)
    return (
        <Fragment>
            {loading ? (<Loader />) : (<Fragment>
            <MetaData title = {`${USER.name}'s profile`} />
            <div className="profileContainer">
                <div>
                    <h1>Profile Detail</h1>
                    <img src={USER.avatar.url} alt = {prof} />
                    <Link to="/profile/update">Edit Profile</Link>
                </div>
                <div>
                    <div>
                    <h2>Full Name</h2>
                    <p>{USER.name}</p>
                    </div>
                    <div>
                    <h2>Email</h2>
                    <p>{USER.email}</p>
                    </div>
                    <div>
                    <h2>Joined On</h2>
                    <p>{USER.joinedOn}</p>
                    </div>
                <div>
                <Link to="/orders">Orders History</Link>
                <Link to="/update-password">Change Password</Link>
                </div>
                </div>
            </div>
        </Fragment>)}
        </Fragment> 
    )
}