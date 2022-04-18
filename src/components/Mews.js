import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

import MewsCreate from './MewsCreate';

import mewsapi from '../api/mews-api';

const Mews = () => {
    const [mewslist, setMewsList] = useState([]);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        mewsapi.list({ signal })
            .then(data => {
                // data can be undefined depending on network
                if (data.error) console.log(data.error);
                // data: {mewslist: [{_id: Object, title: String, link: String}], count: Number}
                else setMewsList(data.mews);
            })
            // remember to handle error elegently here
            .catch(e => console.log(e))

        return () => abortController.abort()
    }, []);

    return (
        <>
            <Link to='submit'>New</Link>
            {mewslist.map(mews => (
                <div key={mews._id}>
                    {mews._id}<br />
                    {mews.title}<br />
                    {/* {mews.comments} comments<br /> */}
                    {mews.link}<br />
                    <Link to={mews._id}>read</Link>
                    <Link to={`${mews._id}/edit`}>edit</Link>
                    <Link to={`${mews._id}/delete`}>delete</Link>
                </div>
            ))}
            <button onClick={() => setOpen(open => !open)}>Dialog</button>
            <D open={open} setOpen={setOpen} />
        </>
    );
}

const D = ({ open, setOpen }) =>
    <Transition appear show={open} as={"div"}>
        <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm"
            onClose={() => setOpen(open => !open)}
        >
            <div className="max-h-screen px-4 text-center">
                <Transition.Child
                    as={'div'}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                {/* <span
                    className="inline-block h-full max-h-screen align-middle"
                    aria-hidden="true"
                >
                    &#8203;
                </span> */}
                <Transition.Child
                    as={'div'}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform backdrop-blur-lg shadow-xl rounded-2xl">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Submit New Mews
                        </Dialog.Title>
                        <div className="mt-2 inset-0">
                            <MewsCreate setOpen={setOpen} />

                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
export default Mews;