import { v4 as uuidv4 } from 'uuid'

export type NotificationDataTypes = {
	id?: string
	username: string
	userAvatar: string
	notificationUnread: boolean
	notificationType: string | null
	notificationMsg: string | null
	notificationTimeStamp: string
	notificationCommented: boolean
	notificationCommentedImg: boolean
	commentedMsg: string | null
	commentedImg: string | null
	isGroup: boolean | null
}

export type HeaderTypes = {
	markAllAsRead: () => void
	unreadNotifications: number
}

const notificationData = [
	{
		id: uuidv4(),
		username: 'Mark Webber',
		userAvatar: 'assets/images/avatar-mark-webber.webp',
		notificationUnread: true,
		notificationType: 'reacted to your recent post',
		notificationMsg: 'My first tournament today!',
		notificationTimeStamp: '1m ago',
		notificationCommented: false,
		notificationCommentedImg: false,
		commentedMsg: null,
		commentedImg: null,
		isGroup: null,
	},
	{
		id: uuidv4(),
		username: 'Angela Gray',
		userAvatar: 'assets/images/avatar-angela-gray.webp',
		notificationUnread: true,
		notificationType: 'followed you',
		notificationMsg: null,
		notificationTimeStamp: '5m ago',
		notificationCommented: false,
		notificationCommentedImg: false,
		commentedMsg: null,
		commentedImg: null,
		isGroup: null,
	},
	{
		id: uuidv4(),
		username: 'Jacob Thompson',
		userAvatar: 'assets/images/avatar-jacob-thompson.webp',
		notificationUnread: true,
		notificationType: 'has joined your group',
		notificationMsg: 'Chess Club',
		notificationTimeStamp: '1 day ago',
		notificationCommented: false,
		notificationCommentedImg: false,
		commentedMsg: null,
		commentedImg: null,
		isGroup: true,
	},
	{
		id: uuidv4(),
		username: 'Rizky Hasanuddin',
		userAvatar: 'assets/images/avatar-rizky-hasanuddin.webp',
		notificationUnread: false,
		notificationType: 'sent you a private message',
		notificationMsg: null,
		notificationTimeStamp: '5 days ago',
		notificationCommented: true,
		notificationCommentedImg: false,
		commentedMsg:
			"Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already havings lots of fun and improving my game",
		commentedImg: null,
		isGroup: null,
	},
	{
		id: uuidv4(),
		username: 'Kimberley Smith',
		userAvatar: 'assets/images/avatar-kimberly-smith.webp',
		notificationUnread: false,
		notificationType: 'commented on your picture',
		notificationMsg: null,
		notificationTimeStamp: '1 week ago',
		notificationCommented: false,
		notificationCommentedImg: true,
		commentedMsg: null,
		commentedImg: 'assets/images/image-chess.webp',
		isGroup: null,
	},
	{
		id: uuidv4(),
		username: 'Nathan Peterson',
		userAvatar: 'assets/images/avatar-nathan-peterson.webp',
		notificationUnread: false,
		notificationType: 'reacted to your recent post',
		notificationMsg: '5 end-game strategies to increase your win rate',
		notificationTimeStamp: '2 weeks ago',
		notificationCommented: false,
		notificationCommentedImg: false,
		commentedMsg: null,
		commentedImg: null,
		isGroup: null,
	},
	{
		id: uuidv4(),
		username: 'Anna Kim',
		userAvatar: 'assets/images/avatar-anna-kim.webp',
		notificationUnread: false,
		notificationType: 'left the group',
		notificationMsg: 'Chess Club',
		notificationTimeStamp: '2 weeks ago',
		notificationCommented: false,
		notificationCommentedImg: false,
		commentedMsg: null,
		commentedImg: null,
		isGroup: true,
	},
]

export default notificationData
