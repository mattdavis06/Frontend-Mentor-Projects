import { Dispatch, SetStateAction } from 'react'

export interface FormTypes {
	day: number | string
	month: number | string
	year: number | string

	setDay: Dispatch<SetStateAction<number | string>>
	setMonth: Dispatch<SetStateAction<number | string>>
	setYear: Dispatch<SetStateAction<number | string>>
	setCalculatedDay: Dispatch<SetStateAction<number | string>>
	setCalculatedMonth: Dispatch<SetStateAction<number | string>>
	setCalculatedYear: Dispatch<SetStateAction<number | string>>
}

export interface DividerBtnTypes {
	day: number | string
	month: number | string
	year: number | string
	isDayValid: {
		inputValid: boolean
		inputInvalidMsg: string
		inputEmpty: boolean
		inputEmptyMsg: string
	}
	isMonthValid: {
		inputValid: boolean
		inputInvalidMsg: string
		inputEmpty: boolean
		inputEmptyMsg: string
	}
	isYearValid: {
		inputValid: boolean
		inputInvalidMsg: string
		inputEmpty: boolean
		inputEmptyMsg: string
	}
	setIsDayValid: Dispatch<
		SetStateAction<{
			inputValid: boolean
			inputInvalidMsg: string
			inputEmpty: boolean
			inputEmptyMsg: string
		}>
	>
	setIsMonthValid: Dispatch<
		SetStateAction<{
			inputValid: boolean
			inputInvalidMsg: string
			inputEmpty: boolean
			inputEmptyMsg: string
		}>
	>
	setIsYearValid: Dispatch<
		SetStateAction<{
			inputValid: boolean
			inputInvalidMsg: string
			inputEmpty: boolean
			inputEmptyMsg: string
		}>
	>
	setCalculatedDay: Dispatch<SetStateAction<number | string>>
	setCalculatedMonth: Dispatch<SetStateAction<number | string>>
	setCalculatedYear: Dispatch<SetStateAction<number | string>>
}

export interface CalulatedDateTypes {
	calculatedDay: string | number
	calculatedMonth: string | number
	calculatedYear: string | number
}
