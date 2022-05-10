import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

import mewsapi from './api/mews-api';

export default function Menu({ open, setOpen }) {
    const credentials = mewsapi.auth();
    return (

        <Transition
            as={Fragment}
            show={open}
        >

            <Dialog open={open} onClose={() => setOpen(open => !open)} className=''>
                <div className='fixed inset-0 backdrop-blur bg-black/50' />
                <div className='fixed inset-0 flex items-center justify-center mx-auto'>
                    <Transition.Child
                        as={Fragment}
                        enter='transition-opacity duration-150 '
                        enterFrom='opacity-50'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-50'
                    >
                        <Dialog.Panel className='bg-slate-50/70 dark:bg-secondary-black py-5 flex flex-col w-11/12 gap-10 items-center shadow-lg border border-slate-300 dark:border-slate-500 mx-auto rounded-md'>
                            <NavLink to={credentials ? '/profile' : 'login'} className={({isActive}) => isActive ? 'text-fuchsia-400 underline underline-offset-4': undefined} onClick={() => setOpen(false)}>{credentials ? `@${credentials?.user?.username}` : 'login'}</NavLink>
                            <NavLink to='/about' className={({isActive}) => isActive ? 'text-fuchsia-400 underline underline-offset-4': undefined} onClick={() => setOpen(false)}>About</NavLink>
                            <NavLink to='/faq' className={({isActive}) => isActive ? 'text-fuchsia-400 underline underline-offset-4': undefined} onClick={() => setOpen(false)}>FAQ</NavLink>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}