import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import Footer from './Footer'
import { Toaster, toast } from 'react-hot-toast'

const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://electronic-market.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            if (response.ok) {
                toast.success("Registration Successful!");
                reset();
                setTimeout(() => { navigate('/Login'); }, 1000)
            } else {
                toast.error(result.message || "Registration Failed!")
            }
        } catch (err) {
            console.error(err);
            toast.error("Registration failed!");
        }
    }
    return (
        <>
            <div className='register-container'>
                <h2>Create your account</h2>
                <h3>Join Electronic Market and enjoy a smarter shopping experience. Create your account to save your preferences,
                    manage your cart, track orders, submit reviews, and receive better support.</h3>
                <form
                    className='register-form'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        {...register("username", {
                            required: "This field is required", minLength: { value: 3, message: "Min Length is 3" },
                            maxLength: { value: 20, message: "Max Length is 20" }
                        })}
                        type="text" placeholder='username'
                    />
                    {errors.username && <div>{errors.username.message}</div>}
                    <input {...register("email", {
                        required: "e-mail is required"
                    })}
                        type="email" placeholder='email'
                    />
                    {errors.email && <div>{errors.email.message}</div>}
                    <input {...register("number", {
                        required: "number is required"
                    })}
                        type="text" placeholder='phone number'
                    />
                    {errors.number && <div>{errors.number.message}</div>}
                    <input
                        {...register("password", {
                            required: "password is required"
                        })}
                        type='password' placeholder='password'
                    />
                    {errors.password && <div>{errors.password.message}</div>}
                    <input
                        {...register("confirmPassword", {
                            required: "confirmPassword is required"
                        })}
                        type='confirmPassword' placeholder='confirm-password'
                    />
                    {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
                    <button type='submit'>Register</button>

                </form>
                <p className="paragraph">Already have an account <Link to="/Login">Login</Link></p>

            </div>
            <Footer />
        </>
    )
}

export default Register