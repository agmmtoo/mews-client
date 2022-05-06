import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Fade from './CSSTransition';

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
        <Fade>
            <div className='ml-5 mb-5'>
                {children.map(child => (
                    <div key={child._id} className=''>
                        <Child
                            mews={child}
                            mewslist={children}
                            setMewslist={setChildren}
                            setReladVar={setReladVar}
                        />
                    </div>
                ))}
            </div>
        </Fade>
    )
}

export default Children;

const Child = ({ mews, mewslist, setMewslist, setReladVar }) => {
    const [open, setOpen] = useState(true)
    const [action, setAction] = useState('')
    return (
        <>
            <div className='border dark:border-slate-500 divide-y-2 space-y-2 bg-slate-50 dark:bg-neutral-700 rounded-lg shadow-md mx-auto mt-5 p-3 w-11/12 md:w-4/5'>

                {mews.title && <h1 className='font-semibold text-2xl'>{mews.title}</h1>}
                <div className='flex flex-row items-center gap-5 text-sm' onClick={() => setOpen(open => !open)}>
                    <div className=''>@{mews.submitter.username}</div>
                    <div>{formatTime(new Date(mews.createdAt) / 1000)}</div>
                </div>
                {mews.body && open && <div className='pt-3'>{mews.body}</div>}
                <div className="pt-3 flex flex-row items-center gap-5">
                    <ButtonBoost mews={mews} mewslist={mewslist} setMewslist={setMewslist} />
                    {/* WATCHOUT */}
                    <ButtonComment className='will-change-contents' mews={mews} setReloadVar={setReladVar} />
                    <ButtonPopover mews={mews} setAction={setAction}>
                        <Link role='button' to={`/${mews._id}`}>
                            Detail
                        </Link>
                        <div role='button' onClick={() => setOpen(open => !open)}>{open ? 'Hide' : 'Show'}</div>
                    </ButtonPopover>
                </div>
            </div>
            {open && <Children parent={mews} />}
            <DialogModel open={action === 'edit'}><EditForm mews={mews} setReloadVar={setReladVar} setAction={setAction} /></DialogModel>
            <DialogModel open={action === 'delete'}><DeleteForm mews={mews} setAction={setAction} setReloadVar={setReladVar} /></DialogModel>
        </>
    )
}