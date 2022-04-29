import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Fade from './CSSTransition';
import { ButtonBoostMews } from './ButtonBoost';

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

    // loading component
    if (loading) return
    if (error) return <pre>{JSON.stringify(error)}</pre>

    return (

        <>
            <MewsDetail mews={mews} setMews={setMews} />
            <Children parent={mewsId} />
        </>
    );
};

export default MewsRead;

const MewsDetail = ({ mews, setMews }) => {
    let ms = new Date(mews.createdAt) / 1000
    return (
        <Fade>
            <div className='divide-y-2 space-y-2 rounded-lg shadow-md mx-auto mt-5 p-3 w-11/12 md:w-4/5 bg-gradient-to-r from-fuchsia-300 to-indigo-300 dark:from-violet-500 dark:to-fuchsia-500'>
                <div>
                    {mews.title && <h1 className='font-semibold text-2xl'>{mews.title}</h1>}
                    <div className='flex flex-row items-center gap-5 text-sm'>
                        <div className=''>@{mews.submitter.username}</div>
                        <div>{formatTime(ms)}</div>
                    </div>
                </div>
                {mews.body && <p className='pt-3 mt-3'>{mews.body}</p>}
                <div className="pt-3 mt-3 flex flex-row items-center gap-5">
                    <ButtonBoostMews mews={mews} setMews={setMews} />
                    <div className='flex items-center gap-2'>
                        <svg className='' fill='currentColor' width='17' height='17' viewBox="0 0 512 512">
                            <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z" />
                        </svg>
                        {mews.children.length}
                    </div>
                </div>
            </div>
        </Fade>
    )
}