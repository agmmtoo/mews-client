import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import usersapi from '../api/users-api';
import mewsapi from '../api/mews-api';

import { MewsListItem } from './Home';

const Profile = () => {
    const [profile, setProfile] = useState()
    const [mewslist, setMewslist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const credentials = mewsapi.auth()
    const redirect = useNavigate()

    useEffect(() => {
        if (!credentials) redirect('/login')

        const abortController = new AbortController();
        const signal = abortController.signal;

        usersapi.getProfile({ signal, token: credentials.token })
            .then(res => {
                if (res.status !== 200) setError(res.data.message)
                else setProfile(res.data)
            })
            .then(() => setLoading(false))
            .catch(setError)

        return () => abortController.abort()
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        mewsapi.submittersmews({ signal, submitter: credentials.user._id })
            .then(res => {
                if (res.status !== 200) setError(res.data.message)
                else setMewslist(res.data.mews)
            })
            .catch(setError)
    }, [credentials.user._id])

    if (loading) return null
    if (error) return <pre>{JSON.stringify(error)}</pre>
    return (
        <>
            <div className='p-5 space-y-8 rounded-xl shadow-md text-center bg-white dark:bg-secondary-black w-5/6 md:w-1/2 mx-auto'>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='text-fuchsia-400 text-lg tracking-widest'>@{profile.username}</div>
                <div className='after:content-["Pts"] after:text-base text-7xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-indigo-400 dark:from-fuchsia-500 dark:to-violet-400'>{profile.karma}</div>
                <div className='text-indigo-400'>Joined since {new Date(profile.createdAt).toDateString()}</div>
            </div>
            <hr className='m-10' />
            <div className='my-5'>
                {mewslist.map(mews => (
                    <MewsListItem mews={mews} mewslist={mewslist} setMewslist={setMewslist} key={mews._id} />
                ))}
            </div>

        </>
    )
}

export default Profile