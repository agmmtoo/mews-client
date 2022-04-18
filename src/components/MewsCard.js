import { Link } from 'react-router-dom';

const MewsCard = ({ mews }) => (
    <>
        <div className='rounded-2xl bg-slate-200 shadow-md m-5 p-5'>
            {mews.title && <h1 className='font-semibold text-4xl py-5'>{mews.title}</h1>}
            <p>{mews.body}</p>

            <Link to={`/${mews._id}`} className="flex flex-row items-center gap-5 ">
                <div>{mews?.points} Pts</div>
                <div className='underline'>{mews?.submitter?.username}</div>
                <div>{mews?.children?.length} replies</div>
            </Link>
        </div>
    </>
)

export default MewsCard;