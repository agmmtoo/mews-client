import mewsapi from '../api/mews-api';
import { useNavigate } from 'react-router-dom';

const ButtonBoost = ({ mews, mewslist, setMewslist }) => {
    let navigate = useNavigate();
    const credentials = mewsapi.auth();
    let boosted = credentials && mews.boosters.indexOf(credentials.user._id) !== -1
        ? true
        : false

    const redirectToLogin = () => {
        navigate('/login')
    }
    const handleBoost = () => {
        mewsapi.boost({ mewsId: mews._id, token: credentials.token })
            .then(console.log)
        const newMewslist = mewslist.map(m => {
            if (m._id === mews._id) m.boosters.push(credentials.user._id)
            return m
        })
        setMewslist(newMewslist)
    }

    const handleUnboost = () => {
        mewsapi.unboost({ mewsId: mews._id, token: credentials.token })
            .then(console.log)
        const newMewslist = mewslist.map(m => {
            if (m._id === mews._id) m.boosters = m.boosters.filter(id => id !== credentials.user._id)
            return m
        })
        setMewslist(newMewslist)
    }
    return Buttons({mews, credentials, boosted, redirectToLogin, handleBoost, handleUnboost})

}

const ButtonBoostMews = ({ mews, setMews }) => {
    let navigate = useNavigate();
    const credentials = mewsapi.auth();
    let boosted = credentials && mews.boosters.indexOf(credentials.user._id) !== -1
        ? true
        : false

    const redirectToLogin = () => {
        navigate('/login')
    }

    const handleBoost = () => {
        mewsapi.boost({ mewsId: mews._id, token: credentials.token })
            .then(console.log)
        mews.boosters.push(credentials.user._id)
        setMews({...mews})
    }

    const handleUnboost = () => {
        mewsapi.unboost({ mewsId: mews._id, token: credentials.token })
            .then(console.log)
        mews.boosters = mews.boosters.filter(id => id !== credentials.user._id)
        setMews({...mews})
    }
    return Buttons({mews, credentials, boosted, redirectToLogin, handleBoost, handleUnboost})

}

const Buttons = ({mews, credentials, boosted, redirectToLogin, handleBoost, handleUnboost}) => {
    if (!credentials) return (
        <button className='flex items-center gap-2 text-emerald-500' onClick={redirectToLogin}>
            <svg className='' fill='currentColor' width='17' height='17' viewBox="0 0 320 512">
                <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z" />
            </svg>
            {mews.points}
        </button>
    )

    if (boosted) return (
        <button className='flex items-center gap-2 text-rose-500' onClick={handleUnboost}>
            <svg className='' fill='currentColor' width='17' height='17' viewBox="0 0 320 512">
                <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z" />
            </svg>
            {mews.points}
        </button>
    )

    return (
        <button className='flex items-center gap-2 text-cyan-500' onClick={handleBoost}>
            <svg className='' fill='currentColor' width='17' height='17' viewBox="0 0 320 512">
                <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z" />
            </svg>
            {mews.points}
        </button>
    )
}

export {ButtonBoost, ButtonBoostMews}