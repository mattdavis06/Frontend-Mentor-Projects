import { useState } from 'react'
import { ReactComponent as OnlineIcon } from '../assets/images/icon-online.svg'
import { ReactComponent as BudgetingIcon } from '../assets/images/icon-budgeting.svg'
import { ReactComponent as OnBoardingIcon } from '../assets/images/icon-onboarding.svg'
import { ReactComponent as APIIcon } from '../assets/images/icon-api.svg'

function WhyEasybank() {
  const [elData] = useState([
    {
      id: 1,
      icon: <OnlineIcon />,
      title: 'Online Banking',
      text: 'Our modern web and mobile applications allow you to keep track of your finances wherever you are in the world.',
    },
    {
      id: 2,
      icon: <BudgetingIcon />,
      title: 'Simple Budgeting',
      text: 'See exactly where your money goes each month. Receive notifications when you’re close to hitting your limits.',
    },
    {
      id: 3,
      icon: <OnBoardingIcon />,
      title: 'Fast Onboarding',
      text: 'We don’t do branches. Open your account in minutes online and start taking control of your finances right away.',
    },
    {
      id: 4,
      icon: <APIIcon />,
      title: 'Open API',
      text: 'Manage your savings, investments, pension, and much more from one account. Tracking your money has never been easier.',
    },
  ])

  return (
    <section id="why_easybank" className="why-easybank">
      <div className="container-lg">
        <div className="row">
          <div className="why-easybank-wrapper">
            <h2>Why choose Easybank?</h2>
            <p>
              We leverage Open Banking to turn your bank account into your
              financial hub. <br />
              Control your finances like never before.
            </p>
          </div>
          {elData.map((item) => {
            return (
              <div className="col-md-6 col-lg-3" key={item.id}>
                <div className="card">
                  <div className="card-body d-flex flex-column">
                    <div className="card-icon">{item.icon}</div>
                    <div className="card-title">
                      <h4>{item.title}</h4>
                    </div>
                    <div className="card-text">
                      <p>{item.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyEasybank
