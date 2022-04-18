import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import mewsapi from '../api/mews-api';

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

    if (loading) return <div>Boosted Mews List Loading...</div>
    if (error) return <pre>{JSON.stringify(error)}</pre>
    return (
        <>
            {mewslist.map(mews => (
                <MewsListItem mews={mews} key={mews._id} />
            ))}
        </>
    );
}

export default Home

const MewsListItem = ({ mews }) => (
    <div className='rounded-md bg-slate-200 shadow-sm hover:shadow-md m-5 p-5'>
        <h1 className='font-semibold text-2xl py-2'>{mews.title}</h1>
        <Link to={`/${mews._id}`} className="flex flex-row items-center gap-5 ">
            <div>{mews.points} Pts</div>
            <div className='underline'>{mews.submitter.username}</div>
            <div>{mews.createdAt}</div>
            <div>{mews.children.length} Comments</div>
        </Link>
    </div>
)