import { useState } from 'react';

import mewsapi from '../api/mews-api';

const EditForm = ({ mews, setMews, setReloadVar, setAction }) => {
    const [values, setValues] = useState({ title: mews.title, link: mews.link, body: mews.body })
    const [error, setError] = useState();
    const credentials = mewsapi.auth();

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        mewsapi.updatemews({ token: credentials.token, mewsId: mews._id, title: values.title, link: values.link, body: values.body })
            .then(res => {
                if (res.status !== 202) setError(res.data.message)
                else {
                    setAction('');
                    mews.title = res.data.mews.title
                    mews.body = res.data.mews.body
                    if (setMews) setMews({ ...mews })
                    else {
                        setReloadVar(mews)
                    }
                }
            })
            .catch(console.log)
    }

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            {error && <p className='text-red-500 uppercase font-medium text-sm mx-auto'>{error}</p>}
            {mews.title && <input required name='title' type='text' value={values.title} onChange={handleChange} className='rounded-md' />}
            {mews.link && <input required name='link' type='text' value={values.link} onChange={handleChange} className='rounded-md' />}
            {mews.body && <textarea required rows={5} name='body' value={values.body} onChange={handleChange} className='border-0 bg-inherit focus:ring-0 rounded-sm leading-tight placeholder:text-sm' />}
            <div className='flex items-center text-sm justify-around md:justify-end'>
                <button className='px-4 py-2 rounded w-full md:w-auto' onClick={() => setAction('')}>Cancel</button>
                <button type='submit' className='px-4 py-2 rounded w-full md:w-auto bg-indigo-500 text-white'>Save</button>
            </div>
        </form>
    )
}

export default EditForm