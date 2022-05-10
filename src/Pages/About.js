import logopng from '../assets/logo.png';

export default function About() {
    return (
        <div className='px-4 flex flex-col gap-5 md:w-5/6 mx-auto'>
            <img
                src={logopng}
                alt='mews logo'
                className='mx-auto p-4 w-5/6 md:max-w-sm'
            />
            <AboutItem h1={`What's it`} p={`Mews is a social-media-like news aggregration site for Burmese news.`} />
            <AboutItem h1={`How it works`} p={`The project is supossed to provide update news from local news agencies. Actually, I have the bots crawl for it.`} />
            <AboutItem h1={`Is it even legal`} p={`Shhhhhh...it's finnnnne.`} />
            <AboutItem h1={`Who made it`} p={`Glad you asked, I'm @ammo.
                    Peek me on <a href='https://t.co/agmyintmyatoo' target='_blank' class='text-sky-500 font-semibold group-hover:text-sky-300'>Twitter</a>.
                    Shoot me a text or two.`} />
        </div>
    )
}

const AboutItem = ({h1, p}) => (
    <div className='group hover:shadow-md hover:bg-indigo-400 w-4/5 md:w-2/3 self-start even:self-end p-4 space-y-2 border dark:border-slate-500 rounded-lg transition-colors block bg-slate-50 dark:bg-secondary-black'>
        <h1 className='group-hover:text-white text-2xl font-extrabold text-indigo-500 dark:text-indigo-400'>
            {h1}
        </h1>
        <p dangerouslySetInnerHTML={{__html: p}} className='group-hover:text-white first-letter:text-3xl font-serif' />
    </div>
)