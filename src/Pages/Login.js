import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import authapi from '../api/auth-api';

const Login = () => {
    const redirect = useNavigate();
    const [values, setValues] = useState({ username: '', password: '' })
    const [error, setError] = useState()
    const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value })
    const handleSubmit = e => {
        e.preventDefault();
        authapi.signin(values)
            .then(res => {
                if (res.status !== 200) setError(res.data.message)
                else {
                    localStorage.setItem('credentials', JSON.stringify(res.data))
                    redirect(-1)
                }
            })
            .catch(console.log)
    }
    return (
        <div
            className='flex flex-col justify-center items-center'>
            <form
                onSubmit={handleSubmit}
                className='w-4/5 max-w-sm shadow-md rounded-md p-5 flex flex-col gap-3 bg-slate-50 dark:bg-secondary-black'
            >
                {error
                    ? <p className='text-red-400 mx-auto font-medium uppercase'>{error}</p>
                    : <h4 className='mx-auto font-medium uppercase'>Sign In</h4>}
                <label htmlFor='username'>Username</label>
                <input required className='rounded-md' name='username' type='text' value={values.username} onChange={handleChange} />
                <label htmlFor='password'>Password</label>
                <input required className='rounded-md' name='password' type='password' value={values.password} onChange={handleChange} />
                <div className='flex justify-between mt-3 items-center text-sm'>
                    <Link to='/register'>Don't have an account?</Link>
                    <button type='submit' className='border-indigo-500 border px-4 py-2 rounded-md hover:shadow-md hover:ring-1 ring-blue-500'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;