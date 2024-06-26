import React from 'react'
import '../styles/Registerstyle.css'
import { Form,Input,message } from 'antd'
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    //form handler
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const onfinishHandler=async(values)=>{
      // console.log(values)
       try{
        dispatch(showLoading());
        const res=await axios.post('/api/v1/user/login',values,{headers:{'Content-Type': 'application/json'}});
        dispatch(hideLoading());
        if(res.data.success){
            localStorage.setItem("token",res.data.token);
            message.success('Login Successful!');
            navigate("/");
        }else{
            message.error(res.data.message);
        }
       }catch(error){
        dispatch(hideLoading());
         console.log(error)
         message.error('Something went wrong')
       }
    }
  return (
    <div className='form-container card'>
    <Form layout="vertical "
     onFinish={onfinishHandler}
      className='registration-form'
    >
      <h3 className='text-center'>Login form</h3>
      <Form.Item label="Email" name="email">
        <Input type='email' required/>
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input type='password' required/>
      </Form.Item>
      <Link to="/register" className="m-2">
        Not a user Register here
      </Link>
      <button className='btn btn-primary' type='submit'>
        Login
      </button>
      </Form>
    </div>
  )
}

export default Login
