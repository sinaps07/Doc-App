import React from 'react';
import '../styles/Registerstyle.css'
import { Form,Input, message } from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const navigate=useNavigate()

    
    //form handler
    const onfinishHandler=async(values)=>{
        try{
            console.log(values);
            const res=await axios.post('api/v1/user/register',values)
            if(res.data.success){
                message.success('Registration Successful!')
                navigate('/login')
            }else{
              message.error(res.data.message);
            }
        } catch(error){
        console.log(error)
        message.error('Something Went Wrong')
        }
    }
  return (
    <>
    <div className='form-container card'>
    <Form layout="vertical " onFinish={onfinishHandler} className='registration-form'>
      <h3 className='text-center'>Registration form</h3>
      <Form.Item label="Name" name="name">
        <Input type='text' required/>
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input type='email' required/>
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input type='password' required/>
      </Form.Item>
      <Link to="/login" className="m-2">
      Already user login here
      </Link>
     <button className='btn btn-primary' type='submit'>
     Register</button>
     </Form>
    </div>
    </>
  );
};

export default Register;
