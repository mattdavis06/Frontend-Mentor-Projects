import { createContext, useState, useEffect } from 'react'
import ArcadeIcon from '../assets/images/icon-arcade.svg'
import AdvancedIcon from '../assets/images/icon-advanced.svg'
import ProIcon from '../assets/images/icon-pro.svg'

const StepTrackerContext = createContext()

export const StepTrackerProvider = ({ children }) => {
	const [stepTrackerPosition, setStepTrackerPosition] = useState(1)
	const [isNameValid, setIsNameValid] = useState(undefined)
	const [isEmailValid, setIsEmailValid] = useState(undefined)
	const [isPhoneValid, setIsPhoneValid] = useState(undefined)
	const [isChecked, setIsChecked] = useState(false)

	const [inputValues, setInputValues] = useState({
		name: '',
		email: '',
		phone: '',
	})

	const [optionCards, setOptionCards] = useState([
		{
			id: 1,
			cardIcon: ArcadeIcon,
			cardTitle: 'Arcade',
			cardMonthPrice: '$9/mo',
			cardYearPrice: '$90/yr',
			cardYearOfferText: '2 months free',
			cardActive: true,
		},
		{
			id: 2,
			cardIcon: AdvancedIcon,
			cardTitle: 'Advanced',
			cardMonthPrice: '$12/mo',
			cardYearPrice: '$120/yr',
			cardYearOfferText: '2 months free',
			cardActive: false,
		},
		{
			id: 3,

			cardIcon: ProIcon,
			cardTitle: 'Pro',
			cardMonthPrice: '$15/mo',
			cardYearPrice: '$150/yr',
			cardYearOfferText: '2 months free',
			cardActive: false,
		},
	])

	const [addOnOptions, setAddOnOptions] = useState([
		{
			id: 1,
			addOnTitle: 'Online Services',
			addOnText: 'Access to multiplayer games',
			addOnMonthPrice: '+$1/mo',
			addOnYearPrice: '+$10/yr',
			addOnChecked: '',
		},
		{
			id: 2,
			addOnTitle: 'Larger storage',
			addOnText: 'Extra 1TB of cloud save',
			addOnMonthPrice: '+$2/mo',
			addOnYearPrice: '+$20/yr',
			addOnChecked: '',
		},
		{
			id: 3,
			addOnTitle: 'Customizable Profile',
			addOnText: 'Custom theme on your profile',
			addOnMonthPrice: '+$2/mo',
			addOnYearPrice: '+$20/yr',
			addOnChecked: '',
		},
	])

	const [selectedPlanAndOptions, setSelectedPlanAndOptions] = useState({
		plan: '',
		monthlyPrice: '',
		yearlyPrice: '',
		addOns: [],
	})

	const handleInputChange = (e) => {
		switch (e.target.name) {
			case 'name':
				setInputValues({ ...inputValues, name: e.target.value })

				if (e.target.value !== '') {
					setIsNameValid(true)
				} else {
					setIsNameValid(false)
				}
				break
			case 'email':
				setInputValues({
					...inputValues,
					email: e.target.value,
				})

				if (e.target.value !== '') {
					setIsEmailValid(true)
				} else {
					setIsEmailValid(false)
				}
				break
			case 'phone':
				setInputValues({
					...inputValues,
					phone: e.target.value
						.replace(/[^0-9 +.]/g, '')
						.replace(/(\..*)\./g, '$1'),
				})

				if (e.target.value !== '') {
					setIsPhoneValid(true)
				} else {
					setIsPhoneValid(false)
				}
				break
			default:
				break
		}
	}

	const handleClick = (stepCount) => {
		if (!isNameValid) {
			setIsNameValid(false)
		}

		if (!isEmailValid) {
			setIsEmailValid(false)
		}

		if (!isPhoneValid) {
			setIsPhoneValid(false)
		}

		if (isNameValid && isEmailValid && isPhoneValid) {
			setStepTrackerPosition(stepCount)
		}
	}

	const setDefaultPlanOnLoad = () => {
		optionCards.forEach((item) => {
			if (item.cardActive) {
				setSelectedPlanAndOptions({
					...selectedPlanAndOptions,
					plan: item.cardTitle,
					monthlyPrice: item.cardMonthPrice,
					yearlyPrice: item.cardYearPrice,
				})
			}
		})
	}

	useEffect(() => {
		setDefaultPlanOnLoad()
		// eslint-disable-next-line
	}, [])

	return (
		<StepTrackerContext.Provider
			value={{
				stepTrackerPosition,
				setStepTrackerPosition,
				inputValues,
				handleInputChange,
				isNameValid,
				isEmailValid,
				isPhoneValid,
				setIsNameValid,
				setIsEmailValid,
				setIsPhoneValid,
				isChecked,
				setIsChecked,
				selectedPlanAndOptions,
				setSelectedPlanAndOptions,
				optionCards,
				setOptionCards,
				addOnOptions,
				setAddOnOptions,
				handleClick,
			}}
		>
			{children}
		</StepTrackerContext.Provider>
	)
}

export default StepTrackerContext
