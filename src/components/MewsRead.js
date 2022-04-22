import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import mewsapi from '../api/mews-api';
import formatTime from '../utils/formatTime';
import Children from './Children';

const MewsRead = () => {
    const [mews, setMews] = useState({ _id: '', title: '', link: '', createdAt: '', updatedAt: '', submitter: { username: '', _id: '' } });
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    // :mewsId comes from routes
    const { mewsId } = useParams();

    // fetch mews detail
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        mewsapi.read({ mewsId, signal })
            .then(data => setMews(data.mews))
            .then(() => setLoading(false))
            .catch(setError)

        return () => abortController.abort();
    }, [mewsId]);

    if (loading) return <div>Mews Detail Loading...</div>
    if (error) return <pre>{JSON.stringify(error)}</pre>

    return (
        <>
            <MewsDetail mews={mews} />
            <Children parent={mewsId} />
        </>
    );
};

export default MewsRead;

const MewsDetail = ({ mews }) => {
    let ms = new Date(mews.createdAt) / 1000
    return (
        <div className='rounded-lg shadow-md mx-auto mt-5 p-3 w-11/12 md:w-4/5 bg-gradient-to-r from-fuchsia-300 to-indigo-300 dark:from-fuchsia-500 dark:to-violet-500'>
            {mews.title && <h1 className='font-semibold text-2xl'>{mews.title}</h1>}
            <div className='flex flex-row items-center gap-5 text-sm'>
                <div className=''>@{mews.submitter.username}</div>
                <div>{formatTime(ms)}</div>
            </div>
            {mews.body && <p className='pt-3 mt-3 border-t-2 border-t-inherit'>{mews.body}</p>}
            <div className="pt-3 mt-3 flex flex-row items-center gap-5 border-t-2 border-t-inherit">
                <div className='flex items-center gap-2'>
                    <svg className='' fill='currentColor' width='17' height='17' viewBox="0 0 320 512">
                        <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z" />
                    </svg>
                    {mews.points}</div>
                <div className='flex items-center gap-2'>
                    <svg className='' fill='currentColor' width='17' height='17' viewBox="0 0 512 512">
                        <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z" />
                    </svg>
                    {mews.children.length}
                </div>
            </div>
        </div>
    )
}