import { Fragment, useEffect } from "react";
import {DataGrid} from '@material-ui/data-grid'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, myOrder } from "../../actions/orderAction";
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import LaunchIcon from "@material-ui/icons/Launch";
import './myorder.css'
const columns=[{field:'id',headerName:'Order Id',flex:0.2},{field:'status',headerName:'Order Status',flex:0.1},
{field:'qty',headerName:'Quantity',flex:0.1},{field:'amount',headerName:'Amount',flex:0.1},{field:'actions',headerName:'Actions',flex:0.1,
sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id,"id")}`}>
            <LaunchIcon />
          </Link>
        );
      },

}];
const MyOrder = ()=>{
    const{loading,orders,error} = useSelector((state) => state.myOrder)
    const { USER } = useSelector((state) => state.user);
    const alert = useAlert();
    const dispatch = useDispatch();
    const rows = [];

    orders &&
    orders.forEach((item, index) => {
      rows.push({
        qty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(myOrder());
    },[dispatch,alert,error])
    
    return <Fragment>
        <div className="myorders">
            <Typography>My orders</Typography>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
            />
        </div>
    </Fragment>
}
export default MyOrder;