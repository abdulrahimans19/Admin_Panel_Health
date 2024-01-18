import Instance from "./Axios";


export const RegisterDatacall=async (data)=>
{
 
  return await Instance.post('/userregister',data)
}
export const Validate=async (data)=>
{

  return await Instance.get(`/userregister?user=${data}`)
}
export const LoginUserdata=async (data)=>
{
  

  return await Instance.post('/loginuser',data)
}


