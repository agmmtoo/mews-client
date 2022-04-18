import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import mewsapi from '../api/mews-api';

const MewsUpdate = () => {
    const success = useNavigate();
    const { mewsId } = useParams();
    const [mews, setMews] = useState({ _id: '', title: '', link: '', createdAt: '', updatedAt: '' });
    const [error, setError] = useState();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        mewsapi.read({ mewsId, signal })
            .then(data => data.error ? setError(data.error) : setMews(data))
            .catch(setError)

        return () => abortController.abort();
    }, [mewsId]);

    const handleSubmit = event => {
        event.preventDefault();
        setError('');
        mewsapi.update({ mewsId, title: mews.title, link: mews.link })
            .then(data => data.error ? setError(data.error) : success('../'))
            .catch(setError);
    }
    const handleChange = event => setMews({ ...mews, [event.target.name]: event.target.value });
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input type='text' name='title' value={mews.title} onChange={handleChange} />
            <br />
            <label htmlFor='link'>Link: </label>
            <input type='url' name='link' value={mews.link} onChange={handleChange} />
            <br />
            {
                error && <p className='bg-rose-500'>{JSON.stringify(error)}</p>
            }
            <button type='submit'>Save</button>
        </form>
    );
}

export default MewsUpdate;