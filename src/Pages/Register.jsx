import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { RegisterDatacall} from '../API/ApiCall'
const Register = () => {
const Navigate=useNavigate()
const [err, setErr] = useState()
const RegisterForm=(e)=>
{
  e.preventDefault()
  setErr('')
const form=new FormData(e.target)
const Userdata=Object.fromEntries(form)

if(Userdata.username.length<5)
{
  setErr('username need to be atleast 5 letters')
}
else if(Userdata.password.length<5)
{
  setErr('password need to be atleast 5 letters')

}
else
{
  RegisterDatacall(Userdata).then(data=>
    {
  Navigate('/',{state:{reg:'successfully registered'}})
  
    }).catch(err=>
      {
  setErr('email already exist')
      })
}


}



return(
<div className='bg-gray-900'>

<section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
  <div className="md:w-1/3 max-w-sm">
    <img
      src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
      alt="Sample image" />
  </div>
  <div className="md:w-1/3 max-w-sm">
 
  
    <p className='text-2xl flex justify-center font-bold mb-3 text-white'>Register</p>
  <p className='text-red-500 font-bold'>{err}</p>
<form onSubmit={RegisterForm} action="">
<input name='username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid " type="text" placeholder="Username" />

<input name='email' className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid " type="email" placeholder="Email Address" />
<input name='password' className= "mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid " type="password" placeholder="Password" />

<div className="text-center md:text-left">
  <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Register</button>
</div>

</form>

    <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
      Already have an account! <a onClick={()=>
    {
        Navigate('/')
    }} className="text-red-600 hover:underline hover:underline-offset-4" href="#">Login</a>
    </div>
  </div>
</section>


</div>
)
}

export default Register