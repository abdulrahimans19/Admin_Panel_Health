import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { pharmacyNav } from '../../../Redux/Features/NavbarSlice';

export default function PharmaProduct() {
    const dispatch = useDispatch();

    useEffect(()=>
    {
        dispatch(pharmacyNav());
    },[])
  return (
    <div>PharmaProduct</div>
  )
}
