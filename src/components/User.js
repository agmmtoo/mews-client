import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import usersapi from '../api/users-api';
import mewsapi from '../api/mews-api';

import { MewsListItem } from './Home';

const User = () => {
    const [user, setUser] = useState()
    const [mewslist, setMewslist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const {username} = useParams()

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        usersapi.getUser({ signal, username })
            .then(res => {
                if (res.status !== 200) setError(res.data.message)
                else setUser(res.data)
            })
            .then(() => setLoading(false))
            .catch(setError)

        return () => abortController.abort()
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        if (!user) return

        mewsapi.submittersmews({ signal, submitter: user._id })
            .then(res => {
                if (res.status !== 200) setError(res.data.message)
                else setMewslist(res.data.mews)
                setError()
            })
            .catch(setError)
    }, [user])

    if (loading) return null
    // if (error) return <pre>{JSON.stringify(error)}</pre>
    return (
        <>
            <div className='p-5 space-y-8 rounded-xl shadow-md text-center bg-white dark:bg-secondary-black w-5/6 md:w-1/2 mx-auto'>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='text-fuchsia-400 text-lg tracking-widest'>@{user.username}</div>
                <div className='after:content-["Pts"] after:text-base text-7xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-indigo-400 dark:from-fuchsia-500 dark:to-violet-400'>{user.karma}</div>
                <div className='text-indigo-400'>Joined since {new Date(user.createdAt).toDateString()}</div>
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

export default User