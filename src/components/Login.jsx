import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import './Login.css'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'


const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const result = await fetch("https://electronic-market.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await result.json();
      
      if (result.ok) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("username",
          response.user.username
        );
        const cartResponse = await
          fetch("https://electronic-market.onrender.com/cart", {
            headers: {
              "Authorization": response.token
            }
          })
        const cartData = await cartResponse.json();
        localStorage.setItem(
          "cart",
          JSON.stringify(cartData.items || [])
        )
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <div className='login-container'>
        <h2>Welcome back!</h2>
        <h3>Sign in to access your personalized shopping experience.
          Manage your cart, track your activities, submit reviews, and get support for your purchases.</h3>
        <form
          className='login-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email", {
              required: "email is required",
            })}
            type='email' placeholder='email'
          />
          {errors.email && <div>{errors.email.message}</div>}
          <input
            {...register("password", {
              required: "password is required"
            })}
            type='password' placeholder='password'
          />
          {errors.password && <div>{errors.password.message}</div>}
          <button type='submit'>Login</button>
        </form>
        <p className="paragraph">Don't have an account?<Link to="/register">Register</Link></p>
      </div>
      <Footer />
    </>
  )
}

export default Login