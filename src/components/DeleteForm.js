import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import mewsapi from '../api/mews-api';

const DeleteForm = ({ mews, setMews, setReloadVar, setAction }) => {
    const [error, setError] = useState();
    const credentials = mewsapi.auth();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        mewsapi.destroy({ token: credentials.token, mewsId: mews._id })
            .then(res => {
                if (res.status !== 200) setError(res.data.message)
                else {
                    setAction('');
                    if (setMews) navigate('/')
                    else setReloadVar(res.data.message)

                }
            })
            .catch(console.log)
    }

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <h3 className='text-center font-semibold text-neutral-500'>You sure you want to delete following Mews?</h3>

            {error && <p className='text-red-500 uppercase font-medium text-sm mx-auto'>{error}</p>}
            {mews.title && <input readOnly type='text' value={mews.title} y />}
            {mews.body && <textarea readOnly rows={5} value={mews.body} className='border-0 bg-inherit focus:ring-0 rounded-sm leading-tight placeholder:text-sm resize-none' />}
            <div className='flex items-center text-sm justify-around md:justify-end'>
                <button className='px-4 py-2 rounded w-full md:w-auto' onClick={() => setAction('')}>Cancel</button>
                <button type='submit' className='px-4 py-2 rounded w-full md:w-auto bg-red-500 text-white'>Confirm</button>
            </div>
        </form>
    )
}

export default DeleteForm