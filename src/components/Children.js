import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import mewsapi from '../api/mews-api';

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

    if (loading) return <div>Children Loading...</div>
    if (error) return <pre>{JSON.stringify(error)}</pre>

    return (
        <div className='ml-5 border-l-2 border-slate-200'>
            {children.map(child => (
                <div key={child._id} className=''>
                    <Child mews={child} />
                    <Children parent={child._id} />
                </div>
            ))}
        </div>
    )
}

export default Children;

const Child = ({ mews }) => (
    <>
        <div className='rounded-sm bg-slate-200 shadow-sm m-5 p-3'>
            <p>{mews.body}</p>

            <div className="flex flex-row items-center gap-5 ">
                <div>{mews.points} Pts</div>
                <div className='underline'>{mews.submitter.username}</div>
                <div>{mews.children.length} replies</div>
                <Link to={`/${mews._id}`}>detail</Link>
            </div>
        </div>
    </>
)