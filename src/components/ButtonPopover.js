import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react'

import mewsapi from '../api/mews-api';

const ButtonPopover = ({ mews, children, setAction }) => {
    const credentials = mewsapi.auth();
    return (
        <Popover className='relative flex-grow'>
            <Popover.Button>...</Popover.Button>
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
                <Popover.Panel as={Fragment} className='z-10 absolute px-6 py-2 space-y-2 bg-inherit border rounded bg-slate-200 dark:bg-slate-500 shadow-lg'>
                    <div className='grid grid-cols-1'>
                        {children}
                        {credentials && credentials.user._id === mews.submitter._id && <div role='button' onClick={() => setAction('edit')}>Edit</div>}
                        {credentials && credentials.user._id === mews.submitter._id && <div role='button' onClick={() => setAction('delete')}>Delete</div>}
                        <div>Save</div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default ButtonPopover