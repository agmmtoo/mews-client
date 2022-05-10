import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import mewsapi from '../api/mews-api';
import formatTime from '../utils/formatTime';
import { ButtonBoost } from './ButtonBoost';
import ButtonComment from './ButtonComment';
import ButtonPopover from './ButtonPopover';
import DialogModel from './DialogModel';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';

const Children = ({ parent: parentMews }) => {
    const parent = parentMews._id;
    const [children, setChildren] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    // to force reload, not that elegent, if I do say so
    const [reloadVar, setReladVar] = useState()
    // fetch mews' children
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        mewsapi.boostedchildren({ signal, parent })
            .then(data => setChildren(data.mews))
            .then(() => setLoading(false))
            .catch(setError)

        return () => abortController.abort()
        // parentMews as dependency, if it changes, refetch
    }, [parent, parentMews, reloadVar]);

    // loading component
    if (loading) return
    if (error) return <pre>{JSON.stringify(error)}</pre>

    return (
        <div className='ml-5 mb-5'>
            {children.map(child => (
                <Child
                    key={child._id}
                    mews={child}
                    mewslist={children}
                    setMewslist={setChildren}
                    setReladVar={setReladVar}
                />
            ))}
        </div>
    )
}

export default Children;

const Child = ({ mews, mewslist, setMewslist, setReladVar }) => {
    const [open, setOpen] = useState(true)
    const [action, setAction] = useState('')
    return (
        <>
            <div className='divide-y border dark:border-primary-black dark:divide-primary-black space-y-2 bg-slate-50 dark:bg-secondary-black rounded-lg shadow-md mx-auto mt-5 p-3 w-11/12 md:w-4/5'>

                {mews.title && <h1 className='font-semibold text-2xl'>{mews.title}</h1>}
                <div className='flex flex-row items-center gap-5 text-sm' onClick={() => setOpen(open => !open)}>
                    <Link to={`/profile/${mews.submitter.username}`} className=''>@{mews.submitter.username}</Link>
                    <div>{formatTime(new Date(mews.createdAt) / 1000)}</div>
                </div>
                {mews.body && open && <div className='pt-3'>{mews.body}</div>}
                <div className="pt-3 flex flex-row items-center gap-5">
                    <ButtonBoost mews={mews} mewslist={mewslist} setMewslist={setMewslist} />
                    {/* WATCHOUT */}
                    <ButtonComment mews={mews} setReloadVar={setReladVar} />
                    <ButtonPopover mews={mews} setAction={setAction}>
                        <Link role='button' to={`/${mews._id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            Detail
                        </Link>
                        <div role='button' onClick={() => setOpen(open => !open)}>{
                            open
                                ? (<>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Hide
                                </>)
                                : (<>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Show
                                </>)
                        }</div>
                    </ButtonPopover>
                </div>
            </div>
            {open && <Children parent={mews} />}
            <DialogModel open={action === 'edit'}><EditForm mews={mews} setReloadVar={setReladVar} setAction={setAction} /></DialogModel>
            <DialogModel open={action === 'delete'}><DeleteForm mews={mews} setAction={setAction} setReloadVar={setReladVar} /></DialogModel>
        </>
    )
}