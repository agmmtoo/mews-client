import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function DialogModel({ open, children }) {
    return (

        <Transition
            as={Fragment}
            show={open}
        >
            <Dialog
                open={open}
                onClose={() => console.log('onClose()')}
            >
                <div className='fixed inset-0 backdrop-blur-sm' />
                <div className='max-w-md fixed inset-0 flex items-center justify-center mx-auto'>
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
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}