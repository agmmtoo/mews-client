import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Fade from './CSSTransition';
import { ButtonBoostMews } from './ButtonBoost';
import ButtonComment from './ButtonComment';
import ButtonPopover from './ButtonPopover';
import Children from './Children';
import DialogModel from './DialogModel';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';

import mewsapi from '../api/mews-api';
import formatTime from '../utils/formatTime';

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
            .then(res => {
                if (res.status !== 200) setError(res.data)
                else setMews(res.data.mews)
            })
            .then(() => setLoading(false))
            .catch(setError)

        return () => abortController.abort();
    }, [mewsId]);

    // loading component
    if (loading) return
    if (error) return <div>{JSON.stringify(error)}</div>

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
    const [action, setAction] = useState('')
    return (
        <>
            <Fade>
                <div className='border dark:border-slate-500 divide-y-2 space-y-2 rounded-lg shadow-md mx-auto mt-5 p-3 w-11/12 md:w-4/5 bg-gradient-to-r from-fuchsia-300 to-violet-300 dark:from-violet-500 dark:to-fuchsia-400'>
                    <div>
                        {mews.title && <h1 className='font-semibold text-2xl'>{mews.title}</h1>}
                        <div className='flex flex-row items-center gap-5 text-sm'>
                            <div className=''>@{mews.submitter.username}</div>
                            <div>{formatTime(ms)}</div>
                        </div>
                    </div>
                    {mews.body && <p className='pt-3 mt-3 break-words'>{mews.body}</p>}
                    <div className='text-xs tracking-wider uppercase pt-3 mt-3 grid gap-2'>
                        <div>edit: {new Date(mews.updatedAt).toLocaleString()}</div>
                        {mews.parent && <div className='flex items-center'>
                            {mews.ancestors
                                .map(grand => <><Link to={`/${grand}`}><div className='w-2 h-2 bg-current rounded-md' /></Link><div className='w-6 h-[1px] bg-current' /></>)}
                            {mews.parent && <Link to={`/${mews.parent}`}><div className='w-2 h-2 bg-current rounded-md' /></Link>}
                        </div>}
                    </div>
                    <div className="pt-3 mt-3 flex flex-row items-center gap-5">
                        <ButtonBoostMews mews={mews} setMews={setMews} />
                        <ButtonComment mews={mews} setMews={setMews} />
                        <ButtonPopover mews={mews} setAction={setAction} />
                    </div>
                </div>
            </Fade>
            <DialogModel open={action === 'edit'}><EditForm mews={mews} setMews={setMews} setAction={setAction} /></DialogModel>
            <DialogModel open={action === 'delete'}><DeleteForm mews={mews} setMews={setMews} setAction={setAction} /></DialogModel>
        </>

    )
}