import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import mewsapi from '../api/mews-api';

const MewsCreate = ({ setOpen }) => {
    const [mews, setMews] = useState({ _id: '', title: '', link: '', createdAt: '', updatedAt: '' });
    const [error, setError] = useState();
    const success = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        setError('');
        mewsapi.create({ title: mews.title, link: mews.link })
            .then(data => data.error ? setError(data.error) : success('..'))
            .catch(setError);
    }
    const handleChange = event => setMews({ ...mews, [event.target.name]: event.target.value });
    return (
        <form onSubmit={handleSubmit} className='backdrop-blur-md bg-opacity-25'>
            <label htmlFor='title'>Title: </label>
            <input className='form-input rounded-md m-1' type='text' name='title' value={mews.title} onChange={handleChange} />
            <br />
            <label htmlFor='link'>Link: </label>
            <input type='url' name='link' value={mews.link} onChange={handleChange} />
            <br />
            {
                error && <p className='bg-rose-500'>{JSON.stringify(error)}</p>
            }


            <div className="mt-4">
                <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setOpen(open => !open)}
                >
                    Got it, thanks!
                </button>
            </div>
        </form>
    );
}

export default MewsCreate;