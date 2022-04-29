import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, provider } from '../../firebase';
import './index.css';

function Index() {
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSignInGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            history.push('/');

            console.log(res);
        })
    }
    const handleRegister=(e) => {
        setError('');
        e.preventDefault();
        setLoading(true);
        if(email === '' || password === '' || username === ''){
            setError('Required field is missing')
            setLoading(false);
        }else {
            createUserWithEmailAndPassword(auth, email, password).then((res) => {
                setLoading(false);
                history.push('/');
                console.log(res);
            }).catch((error)=> {
                console.log(error)
                setError(error.message)
                setLoading(false)
            })
        }
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if(email === "" || password === '')
        {
            setError('Required field missing');
            setLoading(false);
        }else{
            signInWithEmailAndPassword(auth, email, password).then((res)=>{
                console.log(res);
                setLoading(false);
                history.push('/');

            }).catch((error)=>{
                console.log(error.code);
                setError(error.message);
                setLoading(false);
            })
        }
    }
  return (
    <div className="auth">
        <div className="auth-container">
            <p>Add another way to log in using any of the following services. </p>
            <div onClick = {handleSignInGoogle} className="sign-options">
                <div className="single-option">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPC28wUw7Xhq24GPqigFtFYQI72hkLlSP3kLEzDLQ64H--rL8uW0mF3N-saTwRQizX2IM&usqp=CAU" alt="google" />
                    <p>Login with Google</p>
                </div>
            </div>
            <div className="auth-login">
                <div className="auth-login-container">
                    { register ? (<>
                        <div className="input-field">
                            <p>Username</p>
                            <input 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} type="text"  />
                        </div>
                        <div className="input-field">
                            <p>Email</p>
                            <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}  type="email"/>
                        </div>
                        <div className="input-field">
                            <p>Password</p>
                            <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}  type="password"  />
                        </div>
                        <button
                        onClick={handleRegister} 
                        disabled={loading}
                        style={{ 
                            marginTop:'10px',
                            }}>
                            {loading ? 'Registering...' : 'Register'}
                            </button>
                         </>
                        ) : (
                         <>
                            <div className="input-field">
                            <p>Email</p>
                            <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}  type="email"/>
                        </div>
                        <div className="input-field">
                            <p>Password</p>
                            <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} type="password"  />
                        </div>
                            <button 
                                onClick = {handleSignIn}
                                disabled={loading}
                                style={{                        
                                marginTop:'10px',
                                }}>
                                {loading ? 'Signing In...' : 'Login'}
                            </button>
                         </>
                        )}
                        <p onClick={() => setRegister(!register)} style ={{
                            marginTop:'10px',
                            textAlign: 'center',
                            color: '#0095ff',
                            textDecoration: 'underline',
                            cursor:'pointer',
                        }}>{ register ? "Login" :"Register"}?</p>
                </div>
            </div>
            {error !== "" && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}>
            {error}
          </p>
        )}
        </div>
    </div>
  );
}

export default Index