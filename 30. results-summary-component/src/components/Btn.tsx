import { BtnTypes } from '../types/types'

export default function Btn({ btnText, btnBg, btnBgOnHover }: BtnTypes) {
	return (
		<div
			className={`btn w-full cursor-pointer rounded-full  py-4 text-center text-xl text-neutral_White transition-colors  ${btnBg} ${btnBgOnHover}`}
		>
			{btnText}
		</div>
	)
}
