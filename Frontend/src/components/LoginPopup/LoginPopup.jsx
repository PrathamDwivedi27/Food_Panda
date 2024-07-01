import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './LoginPopup.css'
import { useContext, useState } from 'react';
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken}=useContext(StoreContext);
    const [currState,setCurrState]=useState("Login");
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    });

    const onChangeHandler=async (e)=>{
      const name=e.target.name;
      const value=e.target.value

      setData((data)=>({...data,[name]:value}));
    }

    const onLogin=async (e)=>{
      e.preventDefault();
      let newUrl=url;
      

      if(currState==='Login'){
        newUrl+='/api/user/login'
      }
      else {
        newUrl+='/api/user/register'
      }

      console.log(newUrl);
      const response=await axios.post(newUrl,data);
      console.log(response);

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);  // Store token
        localStorage.setItem('userId', response.data.userId);  // Store userId
        setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }




    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)}src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==='Login'?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text"  placeholder='Your name' required/>}
            
            <input name='email'onChange={onChangeHandler} value={data.email} type="email"  placeholder='Your email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password"  placeholder='Your password' required/>

        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree on the terms of conditions and privacy policy</p>
        </div>
        {
            currState==='Login'
            ?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click Here!</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here!</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup
