import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { pharmacyNav } from '../../../Redux/Features/NavbarSlice';

export default function PharmaOrder() {
    const dispatch = useDispatch();

    useEffect(()=>
    {
        dispatch(pharmacyNav());
    },[])
  return (
    <div>PharmaOrder</div>
  )
}
