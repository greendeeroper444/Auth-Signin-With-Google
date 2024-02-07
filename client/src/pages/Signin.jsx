import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Signin() {
  const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const signinUser = async(e) => {
        e.preventDefault();
        const {email, password} = data
        try {
          const {data} = await axios.post('/signin', {
            email,
            password
          });
          if(data.error){
            toast.error(data.error)
          } else{
            setData({});
            navigate('/dashboard')
            location.reload(true)
            toast.success('Sign In Success')
          }

        } catch (error) {
          console.log(error)
        }
    }

    const loginWithGoogle = () => {
      window.open("http://localhost:8000/auth/google", "_self");
    }
    
     
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Sign In </h3>
            </div>
            <div className="card-body">
              <form onSubmit={signinUser}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email"
                  value={data.email} onChange={(e) =>setData({...data, email: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password"
                  value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-success">Sign Up</button>
              </form>
              <button onClick={loginWithGoogle} className="btn btn-outline-primary mt-3">
                Sign in with Google
              </button>
            </div>
            <div className="card-footer">
              <p className="mb-0">Already have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
