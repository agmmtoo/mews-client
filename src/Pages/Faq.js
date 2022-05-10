export default function Faq() {
    return (
        <div className='max-w-3xl mx-auto p-4 space-y-4'>
            <h2 className='p-4 font-bold text-2xl text-indigo-500 dark:text-indigo-400 decoration-dotted decoration-fuchsia-400 underline underline-offset-8'>
                Frequently Asked Questions
            </h2>
            <Detail q={'What\'s Faq?'} a={'Frequently asked questions.'} />
            <Detail q={'I got an error'} a={'REFRESH'} />
        </div>
    )
}

const Detail = ({ q, a }) => (
    <details className='marker:open:text-indigo-500 open:bg-white transition dark:open:bg-secondary-black open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-4 rounded-lg'>
        <summary className='leading-6 font-semibold select-none'>
            {q}
        </summary>
        <div className='mt-3 leading-6 text-neutral-600 dark:text-neutral-400'>
            <p>{a}</p>
        </div>
    </details>
)