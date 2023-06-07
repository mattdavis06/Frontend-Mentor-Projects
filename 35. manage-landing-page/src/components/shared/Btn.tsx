type BtnTypes = {
	bgColor: string
	textColor: string
	btnText: string
	btnLink: string
}

export default function Btn({
	bgColor,
	textColor,
	btnText,
	btnLink,
}: BtnTypes) {
	return (
		<a
			href={btnLink}
			className={`rounded-full ${bgColor} px-8 py-3 text-sm font-semibold ${textColor} transition-all hover:${bgColor}/70 hover:shadow-lg hover:shadow-${bgColor}/70`}
		>
			{btnText}
		</a>
	)
}
