import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Fade from './CSSTransition';

import mewsapi from '../api/mews-api';
import formatTime from '../utils/formatTime';
import ButtonBoost from './ButtonBoost';

const Children = ({ parent }) => {
    const [children, setChildren] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    // fetch mews' children
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        mewsapi.boostedchildren({ signal, parent })
            .then(data => setChildren(data.mews))
            .then(() => setLoading(false))
            .catch(setError)

        return () => abortController.abort()
    }, [parent]);

    // loading component
    if (loading) return
    if (error) return <pre>{JSON.stringify(error)}</pre>

    return (
        <Fade>
        <div className='ml-5 mb-5'>
            {children.map(child => (
                <div key={child._id} className=''>
                    <Child mews={child} mewslist={children} setMewslist={setChildren} />
                    <Children parent={child._id} />
                </div>
            ))}
        </div>
        </Fade>
    )
}

export default Children;

const Child = ({ mews, mewslist, setMewslist }) => (
    <div className='divide-y-2 space-y-2  bg-slate-50 dark:bg-neutral-700 rounded-lg shadow-md mx-auto mt-5 p-3 w-11/12 md:w-4/5'>
        {mews.title && <h1 className='font-semibold text-2xl'>{mews.title}</h1>}
        <div className='flex flex-row items-center gap-5 text-sm'>
            <div className=''>@{mews.submitter.username}</div>
            <div>{formatTime(new Date(mews.createdAt) / 1000)}</div>
        </div>
        {mews.body && <p className='pt-3'>{mews.body}</p>}
        <div className="pt-3 flex flex-row items-center gap-5">
                <ButtonBoost mews={mews} mewslist={mewslist} setMewslist={setMewslist} />
            <div className='flex items-center gap-2'>
                <svg className='' fill='currentColor' width='17' height='17' viewBox="0 0 512 512">
                    <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z" />
                </svg>
                {mews.children.length}
            </div>

            <Link to={`/${mews._id}`} className='text-xs font-medium uppercase py-1 px-2 border rounded-md border-slate-500 hover:border-slate-50 hover:bg-indigo-500 hover:text-slate-50'>
                detail
            </Link>
        </div>
    </div>
)