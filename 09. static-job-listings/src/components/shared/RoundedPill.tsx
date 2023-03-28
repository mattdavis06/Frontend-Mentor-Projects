import { RoundedPillTypes } from '../../types/types'

export default function RoundedPill({ text, pillType }: RoundedPillTypes) {
	return (
		<div
			className={`job-pill ${pillType} mx-1 rounded-full  px-2 py-0.5 text-sm font-bold uppercase text-white ${
				pillType === 'new'
					? 'bg-primaryColor'
					: pillType === 'featured'
					? ' bg-darkColor'
					: ''
			}`}
		>
			<p className='mt-[1px]'>{text}</p>
		</div>
	)
}
