import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import mewsapi from '../api/mews-api';

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

const MewsDetail = ({ mews }) => (
    <>
        <div className='rounded-md bg-slate-200 shadow-sm m-5 p-5'>
            {/* when rendering a child's detail, there is no title */}
            {mews.title && <h1 className='font-semibold text-3xl py-5'>{mews.title}</h1>}
            <p>{mews.body}</p>

            <div className="flex flex-row items-center gap-5 ">
                <div>{mews.points} Pts</div>
                <div className='underline'>{mews.submitter.username}</div>
                <div>{mews.children.length} replies</div>
            </div>
        </div>
    </>
)