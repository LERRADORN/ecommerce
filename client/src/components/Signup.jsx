import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const bg = "https://drive.google.com/thumbnail?id=1KLE9YjxDXEOQx7knkx7ZNfe0FcuZRAJM&sz=w1000";


    useEffect(() => {
        const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
        if (csrfMetaTag) {
            const token = csrfMetaTag.getAttribute('content');
            setCsrfToken(token);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            console.log("Password must contain at least 8 characters.");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup', { name, email, password }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            console.log(response.data);
            setSuccessMessage('Registered Successfully');
            // Reset error message if signup is successful
            setErrorMessage('');
            // Clear input fields
            setName('');
            setEmail('');
            setPassword('');
            // Hide success message after 2 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 4500);
        } catch (error) {
            console.error('Error signing up:', error);
            if (error.response && error.response.status === 422 && error.response.data && error.response.data.errors && error.response.data.errors.email) {
                setErrorMessage('The email is already registered. Kindly make use of another.');
                // Reset success message if error occurs
                setSuccessMessage('');
            } else {
                setErrorMessage('An error occurred during signup');
                // Reset success message if error occurs
                setSuccessMessage('');
            }
        }
    };


    return (
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className='bg-white h-[760px] mx-auto rounded-lg'>
                <div className='p-[27px]'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-15 w-auto"
                src={bg}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Signup and create an account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

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
              {errorMessage && <p>{errorMessage}</p>}
              {successMessage && <p>{successMessage}</p>}

              <p className="mt-[20px] text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
                </Link>
              </p>
            </div>
                </div>
            </div>
          </div>
        </div>
      );
    }

export default Signup;








