import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react'

import mewsapi from '../api/mews-api';

const ButtonPopover = ({ mews, children, setAction }) => {
    const credentials = mewsapi.auth();
    return (
        <Popover className='flex flex-grow'>
            <Popover.Button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </Popover.Button>
            <Popover.Overlay className='fixed inset-0 bg-black/50' />
            <Transition
                as={Fragment}
                enter='transition duration-150 ease-out'
                enterFrom='transform translate-y-0 opacity-50'
                enterTo='transform translate-y-3 opacity-100'
                leave='transition duration-150 ease-in'
                leaveFrom='transform translate-y-3 opacity-100'
                leaveTo='transform translate-y-0 opacity-50'
            >
                <Popover.Panel as={Fragment} className='lowercase text-sm z-10 mt-5 absolute px-6 py-2 space-y-2 bg-inherit border rounded bg-slate-200 dark:bg-secondary-black shadow-lg'>
                    <div className='grid grid-cols-1'>
                        {children}
                        {credentials && credentials.user._id === mews.submitter._id && <div role='button' onClick={() => setAction('edit')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                            Edit
                        </div>}
                        {credentials && credentials.user._id === mews.submitter._id && <div role='button' onClick={() => setAction('delete')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Delete
                        </div>}
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            Save
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default ButtonPopover