import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

import mewsapi from '../api/mews-api';

const ButtonComment = ({ mews, setMews, setReloadVar }) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({})
    const [error, setError] = useState();
    const credentials = mewsapi.auth();

    let navigate = useNavigate();

    const handleClick = e => {
        if (!credentials) navigate('/login');
        else setOpen(true);
    }

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        mewsapi.submitchildren({ token: credentials.token, parent: mews._id, body: values.body })
            .then(res => {
                if (res.status !== 201) setError(res.data.message)
                else {
                    setOpen(false)
                    mews.children.push(res.data.mews._id)
                    if (setMews) setMews({ ...mews })
                    else {
                        setReloadVar(mews)
                    }
                }
            })
            .catch(console.log)
    }

    return (
        <>
            <button className='flex items-center gap-2' onClick={handleClick}>
                <svg className='' fill='currentColor' width='17' height='17' viewBox="0 0 512 512">
                    <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z" />
                </svg>
                {mews.children.length}
            </button>
            <Transition
                as={Fragment}
                show={open}
            >
                <Dialog
                    open={open}
                    onClose={() => console.log('onClose()')}
                >
                    <div className='m-10 fixed inset-0 backdrop-blur-lg bg-white/30 dark:bg-black/30' />
                    <div className='max-w-md backdrop-blur-md bg-black/30 fixed inset-0 flex items-center justify-center mx-auto'>
                        <Transition.Child
                            as={Fragment}
                            enter='transition duration-150 ease-out'
                            enterFrom='transform scale-95 opacity-0'
                            enterTo='transform scale-100 opacity-100'
                            leave='transition duration-150 ease-out'
                            leaveFrom='transform scale-100 opacity-100'
                            leaveTo='transform scale-95 opacity-0'
                        >
                            <Dialog.Panel className='w-11/12 md:w-full shadow-lg border border-slate-300 dark:border-slate-500 mx-auto p-2 rounded-md bg-slate-50 dark:bg-neutral-700'>
                                <div className='h-5 overflow-hidden break-words text-sm font-medium text-slate-500 max-w-sm'>
                                    {mews.submitter.username}: {mews.title || mews.body}
                                </div>
                                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                                    {error && <p className='text-red-500 uppercase font-medium text-sm mx-auto'>{error}</p>}
                                    <textarea required rows={5} name='body' value={values.textarea} onChange={handleChange} placeholder='Your thoughts...' className='border-0 bg-inherit focus:ring-0 rounded-sm leading-tight placeholder:text-sm' />
                                    <div className='flex items-center text-sm justify-around md:justify-end'>
                                        <button className='px-4 py-2 rounded w-full md:w-auto' onClick={() => setOpen(false)}>Cancel</button>
                                        <button className='px-4 py-2 rounded w-full md:w-auto bg-indigo-500 text-white'>Reply</button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ButtonComment