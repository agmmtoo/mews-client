import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Fade from './CSSTransition';
import { ButtonBoostMews } from './ButtonBoost';
import ButtonComment from './ButtonComment';

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
            <Children parent={mews} />
        </>
    );
};

export default MewsRead;

const MewsDetail = ({ mews, setMews }) => {
    let ms = new Date(mews.createdAt) / 1000
    return (
        <Fade>
            <div className='divide-y-2 space-y-2 rounded-lg shadow-md mx-auto mt-5 p-3 w-11/12 md:w-4/5 bg-gradient-to-r from-fuchsia-300 to-violet-300 dark:from-violet-500 dark:to-fuchsia-400'>
                <div>
                    {mews.title && <h1 className='font-semibold text-2xl'>{mews.title}</h1>}
                    <div className='flex flex-row items-center gap-5 text-sm'>
                        <div className=''>@{mews.submitter.username}</div>
                        <div>{formatTime(ms)}</div>
                    </div>
                </div>
                {mews.body && <p className='pt-3 mt-3 break-words'>{mews.body}</p>}
                <div className="pt-3 mt-3 flex flex-row items-center gap-5">
                    <ButtonBoostMews mews={mews} setMews={setMews} />
                    <ButtonComment mews={mews} setMews={setMews} />
                </div>
            </div>
        </Fade>
    )
}