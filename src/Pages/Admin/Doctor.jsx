import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { telemedicine } from '../../Redux/Features/NavbarSlice';

export default function Doctor() {

    
const dispatch=useDispatch()
useEffect(()=>
{
dispatch(telemedicine())
},[])
  return (
    <div>doctor</div>
  )
}
