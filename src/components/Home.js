import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import mewsapi from '../api/mews-api';
import formatTime from '../utils/formatTime';
import { ButtonBoost } from './ButtonBoost';

const Home = () => {
    const [mewslist, setMewslist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        mewsapi.boostedmews({ signal })
            .then(data => setMewslist(data.mews))
            .then(() => setLoading(false))
            .catch(setError)
    }, [])

    // loading component
    if (loading) return
    if (error) return <pre>{JSON.stringify(error)}</pre>
    return (
        <div className=''>
            {mewslist.map(mews => (
                <MewsListItem mews={mews} mewslist={mewslist} setMewslist={setMewslist} key={mews._id} />
            ))}
        </div>
    );
}

export default Home

export const MewsListItem = ({ mews, mewslist, setMewslist }) => {
    let ms = new Date(mews.createdAt) / 1000
    return (
        <div className='border dark:border-primary-black rounded-lg shadow-md bg-slate-50 dark:bg-secondary-black mx-auto mt-5 p-3 w-11/12 md:w-4/5'>
            <h1 className='font-semibold text-2xl'>{mews.title}</h1>
            <div className='flex flex-row items-center gap-5 text-sm'>
                <Link to={`/profile/${mews.submitter.username}`} className=''>
                    @
                    {mews.submitter.username}
                    </Link>
                <div>{formatTime(ms)}</div>
            </div>
            <div className='pt-3 mt-3 flex flex-row items-center gap-5 border-t-2 border-t-inherit'>
                <ButtonBoost mews={mews} mewslist={mewslist} setMewslist={setMewslist} />
                <Link to={`/${mews._id}`} className='flex items-center gap-2'>
                    <svg className='fill-current' fill='none' width='20' height='20' viewBox="0 0 512 512">
                        <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z" />
                    </svg>
                    {mews.children.length}
                </Link>
            </div>
        </div>
    )
}