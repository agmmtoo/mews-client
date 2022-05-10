import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import mewsapi from './api/mews-api';

import Menu from './Menu';

export default function Nav(params) {
    const credentials = mewsapi.auth();
    const [open, setOpen] = useState(false)

    return (
        <>
            <header className='mb-6 border-b sticky -top-16 flex items-center h-32 backdrop-blur -backdrop-hue-rotate-60'>
                <nav className='px-4 w-full top-0 sticky flex items-center justify-between h-16'>
                    <NavLink to='/' className='inline-flex gap-2 w-1/2'>
                        <svg alt='logo' fill='none' className='fill-current w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 619.37 477.77">
                            <path d="M696.31,682.32C647.53,717.41,582,738.89,510,738.89c-77.28,0-147.06-24.71-196.71-64.44,59.41,39.09,165.92,60.21,199.53.54C542.16,734.66,635.29,719.45,696.31,682.32Z" transform="translate(-190.31 -261.11)" />
                            <path d="M261.87,410.66a173.91,173.91,0,0,0-24,48.21c-10-3.79-100.18-189.45-2.65-163.59C224.59,313.8,222.89,345,261.87,410.66Z" transform="translate(-190.31 -261.11)" />
                            <path d="M420.13,317c-25.32,6.76-49.36,15.8-70.39,28-52-34.41-88.68-58.31-139.37-61C211.19,283.21,313.24,246.73,420.13,317Z" transform="translate(-190.31 -261.11)" />
                            <path d="M783.66,520.45c.53,58.24-32.83,112.67-79.56,148.14-59.84,40.29-169.69,59.22-190.08-11.8C462.54,790.53,130.35,626.2,270.8,420.42c16.64,22.61,32.73,40.95,54.64,63.43-9.07,75.06,50.43,114.82,121,133.1,6,2.67,63.22,27.68,67.54,29.61,3.69-2.12,48.76-26.77,53.76-29.61C648.12,602,713.9,555.69,699.35,481.22c17.42-27.68,29.1-48.62,40.69-74.66C767.21,438.78,783.69,478,783.66,520.45Z" transform="translate(-190.31 -261.11)" />
                            <path d="M369,372.43c-27.55,37.05-41.17,69.11-44.33,96.34C279,430.53,218.28,326.89,248,303.17,286.32,313.61,328.12,342.79,369,372.43Z" transform="translate(-190.31 -261.11)" />
                            <path d="M748,397.5a167,167,0,0,1,27,45.29c9.66-4.54,81-194.58-14.3-161.35C772.71,299.09,782.07,324.69,748,397.5Z" transform="translate(-190.31 -261.11)" />
                            <path d="M581,311.07c25.56,5.78,49.93,13.87,71.42,25.28,50.66-36.4,86.35-63.8,136.89-68.48C788.43,267.15,685,236.75,581,311.07Z" transform="translate(-190.31 -261.11)" />
                            <path d="M636.44,368.2c30.11,29.92,48.33,61.93,61.87,90.67,31.84-43.65,84.1-149.7,52.34-170.62C713.44,302.12,674.46,335,636.44,368.2Z" transform="translate(-190.31 -261.11)" />
                            <path d="M691.61,478c-36.76-4.46-127,27.61-127.18,131.26-.16.12-32,17.34-46,24.88a15,15,0,0,1-13.16.56c-17.63-7.7-42-18.58-57.52-25.66-1.37-83.16-62.25-145.72-116-129.06,3.67-30.28,18.89-65.87,49.44-107-9.87-7.29-19.13-13.94-28.09-20.16C437.65,303.32,560.27,301,646.93,343q-12.95,9.73-27.27,21.2C663.07,407.54,686,445,691.61,478Z" transform="translate(-190.31 -261.11)" />
                        </svg>
                        <h1 className='text-xl font-bold'>Mews.info</h1>
                    </NavLink>
                    <div className='hidden w-full md:flex md:items-center md:justify-between font-medium'>
                        <NavLink className={({ isActive }) => isActive ? 'text-fuchsia-400' : undefined} to='/about'>About</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-fuchsia-400' : undefined} to='/faq'>FAQ</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-fuchsia-400' : undefined} to={credentials ? '/profile' : 'login'}>{credentials ? `@${credentials?.user?.username}` : 'login'}</NavLink>
                    </div>
                    <div className='md:hidden' role='button' onClick={() => setOpen(open => !open)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                        </svg>
                    </div>
                </nav>
            </header>
            <Menu open={open} setOpen={setOpen} />
        </>
    )
}