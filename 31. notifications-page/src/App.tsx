import { useState, useEffect } from 'react'
import notificationData from './data/notificationData'
import { NotificationDataTypes } from './data/notificationData'
import Header from './components/Header'
import NotificationCard from './components/NotificationCard'

function App() {
	const [notifications, setNotifications] = useState(notificationData)
	const [unreadNotifications, setUnreadNotifications] = useState(0)

	const markAllAsRead = () => {
		const updatedData = notifications.map((item) => ({
			...item,
			notificationUnread: false,
		}))
		setNotifications(updatedData)
		updateUnreadCount()
	}

	const updateUnreadCount = () => {
		const count = notifications.filter(
			(notification) => notification.notificationUnread
		).length

		setUnreadNotifications(count)
	}

	useEffect(() => {
		updateUnreadCount()
	}, [notifications])

	return (
		<div className='mx-auto lg:my-16 lg:max-w-screen-md lg:place-content-center'>
			<div
				id='_notificationsWrapper'
				className='w-full bg-white px-4 py-6 lg:rounded-lg lg:shadow-2xl'
			>
				<Header
					markAllAsRead={markAllAsRead}
					unreadNotifications={unreadNotifications}
				/>
				<section id='_notificationFeedWrapper' className='my-8 space-y-3'>
					{notifications.map((item: NotificationDataTypes) => {
						return (
							<NotificationCard
								key={item.id}
								username={item.username}
								userAvatar={item.userAvatar}
								notificationUnread={item.notificationUnread}
								notificationType={item.notificationType}
								notificationMsg={item.notificationMsg}
								notificationTimeStamp={item.notificationTimeStamp}
								notificationCommented={item.notificationCommented}
								notificationCommentedImg={item.notificationCommentedImg}
								commentedMsg={item.commentedMsg}
								commentedImg={item.commentedImg}
								isGroup={item.isGroup}
							/>
						)
					})}
				</section>
			</div>
		</div>
	)
}

export default App
