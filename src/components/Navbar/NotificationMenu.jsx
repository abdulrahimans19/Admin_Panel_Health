import React from 'react';
import { readNotification } from '../../API/ApiCall';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from '../../Redux/Features/NavbarSlice';
const NotificationBar = ({ notifications,setOpenNotification }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
  return (
    <div className="fixed top-16 right-6 w-80 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 font-bold text-xl border-b">Notifications</div>
      <ul className="list-none overflow-y-scroll max-h-96 scrollbar-hide">
        {notifications.map((notification, index) => (
          <li onClick={()=>{
            readNotification(notification._id)
            setOpenNotification(false)
            dispatch(getCartItems())
            // navigate(notification.link)
          }} key={index} className={`border-b last:border-b-0 p-2 ${!notification.read ? 'bg-blue-50' : ''}`}>
            <a href={notification.link} className="flex items-center p-4 hover:bg-gray-100 relative">
              {notification.read ? null : (
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-2 w-2 bg-blue-500 rounded-full"></span>
              )}
              {/* <img className="h-10 w-10 rounded-full mr-3" src={notification.image} alt="Profile" /> */}
              <div>
                <div className="font-medium">{notification.title}</div>
                <div className="text-sm text-gray-600">{notification.description
}</div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationBar;
