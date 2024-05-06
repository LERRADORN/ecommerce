import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false); // State variable to track login success
    const [loginError, setLoginError] = useState(false); // State variable to track login error

    const bg = "https://drive.google.com/thumbnail?id=1SAELTxEBMp-heRjY9Ky2_76ye65LaliW&sz=w1000";

    useEffect(() => {
        const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
        if (csrfMetaTag) {
            const token = csrfMetaTag.getAttribute('content');
            setCsrfToken(token);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            console.log(response.data);
            // Handle success
            setLoginSuccess(true); // Set login success to true
            setLoginError(false); // Reset login error state
            setEmail(''); // Clear email input
            setPassword(''); // Clear password input
            setTimeout(() => {
                setLoginSuccess(false); // Hide login success message after 3 seconds
            }, 4500);

        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error
            setLoginSuccess(false); // Reset login success state
            setLoginError(true); // Set login error to true
        }
    };


    return (
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className='bg-white h-[680px] mx-auto rounded-lg'>
                <div className='p-[27px]'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-15 w-auto"
                src={bg}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      pattern=".*@gmail\.com"
                      title="This field must contain @gmail.com"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pattern=".{8,}"
                      title="Password must contain at least 8 characters."
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
                <br />
                {loginError && <p>Email and/or password is incorrect</p>} {/* Display error message if login fails */}
                {loginSuccess && <p>Login successfully</p>} {/* Display message if login success */}

              <p className="mt-10 text-center text-sm text-gray-500">
                Don't have an account yet?{' '}
                <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Signup
                </Link>
              </p>
            </div>
                </div>
            </div>
          </div>
        </div>
      );
    }

export default Login;



