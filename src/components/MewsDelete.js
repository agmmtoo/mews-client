import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import mewsapi from '../api/mews-api';

const MewsDelete = () => {
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

    const handleClick = () => {
        mewsapi.destroy({ mewsId })
            .then(data => data.error ? setError(data.error) : success('..'))
            .catch(setError);
    }

    return (
        <>
            {error && <p className='bg-rose-500'>{JSON.stringify(error)}</p>}
            Are you sure, {mews.title} bouta be get deleted?
            <button onClick={handleClick}>Hell Yea</button>
        </>
    );
}

export default MewsDelete;