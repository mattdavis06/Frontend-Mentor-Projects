import { NotificationDataTypes } from '../data/notificationData'

export default function NotificationCard({
	username,
	userAvatar,
	notificationUnread,
	notificationType,
	notificationMsg,
	notificationTimeStamp,
	notificationCommented,
	notificationCommentedImg,
	commentedMsg,
	commentedImg,
	isGroup,
}: NotificationDataTypes) {
	return (
		<div
			id='_notification-card_id'
			className={`flex w-full items-start rounded-md  ${
				notificationUnread
					? 'bg-veryLightGrayishBlue drop-shadow lg:drop-shadow-sm'
					: 'bg-white'
			} p-4 py-6 `}
		>
			<div className='notification-avatar w-[55px] lg:w-[65px]'>
				<img
					src={userAvatar}
					alt={`${username}-avatar`.toLowerCase().replace(' ', '-')}
					className='h-[45px] w-[45px] rounded-full'
				/>
			</div>
			<div className='notification-content flex-1'>
				<div className='notification-post flex items-start justify-between'>
					<div className='notification-details'>
						<p className='text-grayishBlue'>
							<strong className='transistion-colors inline-flex cursor-pointer text-veryDarkBlue hover:text-primaryBlue'>
								{username}&nbsp;&nbsp;
							</strong>
							{notificationType}&nbsp;&nbsp;
							<strong
								className={`transistion-colors cursor-pointer hover:text-primaryBlue ${
									isGroup
										? 'text-primaryBlue hover:text-primaryBlue/70'
										: 'text-darkGrayishBlue'
								}`}
							>
								{notificationMsg}
							</strong>
							{notificationUnread && (
								<span className='notification-post-status unread mx-1.5 inline-flex h-[10px] w-[10px] rounded-full bg-primaryRed'></span>
							)}
						</p>
						<div className='notification-posted-date'>
							<p className='font-medium text-grayishBlue'>
								{notificationTimeStamp}
							</p>
						</div>
					</div>

					{notificationCommentedImg && commentedImg !== null && (
						<div className='notification-commented-img w-[65px] rounded-sm'>
							<img
								src={commentedImg}
								alt='commented-image'
								className='h-[45px] w-[45px] rounded-md'
							/>
						</div>
					)}
				</div>
				{notificationCommented && (
					<div className='notification-reply border-greyishBlue mt-4 w-full cursor-pointer rounded-md border p-5 transition-colors hover:bg-lightGrayishBlue_1'>
						<p className='text-grayishBlue'>{commentedMsg}</p>
					</div>
				)}
			</div>
		</div>
	)
}
