import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import authapi from '../api/auth-api';
import Fade from '../components/CSSTransition';

const Register = () => {
    const redirect = useNavigate();
    const [values, setValues] = useState({ username: '', password: '' })
    const [error, setError] = useState()
    const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value })
    const handleSubmit = e => {
        e.preventDefault();
        authapi.signup(values)
            .then(res => {
                if (res.status !== 201) setError(res.data.message)
                else {
                    localStorage.setItem('credentials', JSON.stringify(res.data))
                    redirect('/login')
                }
            })
            .catch(console.log)
    }
    return (
        <Fade>
            <div
                className='flex flex-col justify-center items-center'>
                <form
                    onSubmit={handleSubmit}
                    className='w-4/5 max-w-sm shadow-md rounded-md p-5 flex flex-col gap-3 bg-slate-50 dark:bg-neutral-700'
                >
                    {error
                        ? <p className='text-red-400 mx-auto font-medium uppercase'>{error}</p>
                        : <h4 className='mx-auto font-medium uppercase'>Sign Up</h4>}
                    <label htmlFor='username'>Username</label>
                    <div className='text-sm text-neutral-500'>
                        <p>Username should be:</p>
                        <p>at lease 4 characters, can be _, A-Z, a-z, 0-9, not ends with 'bot'</p>

                    </div>
                    {/* username rules
                        allowed: _ a-z A-Z 0-9
                        reject: '*bot' */}
                    <input pattern='^(?=.{4,20}$)(?!.*_{2})[a-zA-Z0-9_]+(?<!bot)$' required className='rounded-md' name='username' type='text' value={values.username} onChange={handleChange} />
                    <label htmlFor='password'>Password</label>
                    <div className='text-sm text-neutral-500'>
                        Password should be longer than 4.
                    </div>
                    <input pattern='.{4,}' required className='rounded-md' name='password' type='password' value={values.password} onChange={handleChange} />
                    <div className='flex justify-between mt-3 items-center text-sm'>
                        <Link to='/login'>Already have an account?</Link>
                        <button type='submit' className='border-indigo-500 border px-4 py-2 rounded-md hover:shadow-md hover:ring-1 ring-blue-500'>Sign Up</button>
                    </div>
                </form>
            </div>
        </Fade>
    )
}

export default Register;