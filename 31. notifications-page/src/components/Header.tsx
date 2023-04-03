import { HeaderTypes } from '../data/notificationData'

export default function Header({
	markAllAsRead,
	unreadNotifications,
}: HeaderTypes) {
	return (
		<header
			id='_notificationsHeader'
			className='flex w-full items-center justify-between'
		>
			<div className='items center flex'>
				<h1 className='text-xl font-bold text-veryDarkBlue'>Notifications</h1>
				<div className='notification-badge mx-2 flex h-full min-w-[35px] items-center justify-center rounded-md bg-primaryBlue px-3'>
					<span className='text-lg text-white '>{unreadNotifications}</span>
				</div>
			</div>
			<a
				href='#'
				className='text-darkGrayishBlue transition-colors hover:text-primaryBlue'
				onClick={markAllAsRead}
			>
				Mark all as read
			</a>
		</header>
	)
}
