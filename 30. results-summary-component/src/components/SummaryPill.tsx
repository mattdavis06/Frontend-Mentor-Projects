import { DataTypes } from '../types/types'

export default function SummaryPill({
	category,
	score,
	icon,
	backgroundColor,
	textColor,
	borderColor,
}: DataTypes) {
	return (
		<div
			className='summary-pill relative flex w-full items-center justify-between rounded-xl p-5'
			style={{ backgroundColor: `${backgroundColor}` }}
		>
			<div
				className='summary-pill-corner_tl absolute top-0 left-0 h-[14px] w-[14px] border border-r-0 border-b-0'
				style={{ borderRadius: '0.75rem 0 0 0', borderColor: `${borderColor}` }}
			></div>
			<div
				className='summary-pill-corner_tr absolute top-0 right-0 h-[14px] w-[14px] border border-b-0 border-l-0'
				style={{ borderRadius: '0 0.75rem 0 0', borderColor: `${borderColor}` }}
			></div>
			<div
				className='summary-pill-corner_bl absolute bottom-0 left-0 h-[14px] w-[14px] border border-t-0 border-r-0'
				style={{
					borderRadius: '0 0 0 0.75rem',
					borderColor: `${borderColor}`,
				}}
			></div>
			<div
				className='summary-pill-corner_br absolute bottom-0 right-0 h-[14px] w-[14px] border border-t-0 border-l-0'
				style={{
					borderRadius: '0 0 0.75rem 0',
					borderColor: `${borderColor}`,
				}}
			></div>
			<div className='summary-icon-and-text flex items-center'>
				<img
					src={icon}
					alt={`${icon}-icon`}
					className='h-[20px] w-[36px] scale-[1.2] pr-4'
				/>
				<p className='font-medium' style={{ color: `${textColor}` }}>
					{category}
				</p>
			</div>
			<div className='summary-score font-bold text-neutral_DarkGrayBlue/50'>
				<span className=' text-neutral_DarkGrayBlue'>{score}&nbsp;&nbsp;</span>/
				100
			</div>
		</div>
	)
}
