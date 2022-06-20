import { useState } from 'react'
import CurrencyImg from '../assets/images/image-currency.jpg'
import RestaurantImg from '../assets/images/image-restaurant.jpg'
import PlaneImg from '../assets/images/image-plane.jpg'
import ConfettiImg from '../assets/images/image-confetti.jpg'

function LatestArticles() {
  const [elData] = useState([
    {
      id: 1,
      img: CurrencyImg,
      author: 'By Claire Robinson',
      title: 'Receive money in any currency with no fees',
      text: 'The world is getting smaller and we’re becoming more mobile. So why should you be forced to only receive money in a single ...',
    },
    {
      id: 2,
      img: RestaurantImg,
      author: 'By Wilson Hutton',
      title: 'Treat yourself without worrying about money',
      text: 'Our simple budgeting feature allows you to separate out your spending and set realistic limits each month. That means you ...',
    },
    {
      id: 3,
      img: PlaneImg,
      author: 'By Wilson Hutton',
      title: 'Take your Easybank card wherever you go',
      text: 'We want you to enjoy your travels. This is why we don’t charge any fees on purchases while you’re abroad. We’ll even show you ...',
    },
    {
      id: 4,
      img: ConfettiImg,
      author: 'By Claire Robinson',
      title: 'Our invite-only Beta accounts are now live!',
      text: 'After a lot of hard work by the whole team, we’re excited to launch our closed beta. It’s easy to request an invite through the site ...',
    },
  ])
  return (
    <section id="latest_articles" className="latest-articles">
      <div className="container-lg">
        <div className="row">
          <div className="latest-articles-wrapper">
            <h3>Latest Articles</h3>
          </div>
          {elData.map((item) => {
            return (
              <div className="col-md-6 col-lg-3" key={item.id}>
                <div className="card mb-5 mx-1">
                  <img
                    src={item.img}
                    alt="blog-post-img"
                    className="card-img-top img-fluid"
                  />
                  <div className="card-body d-flex flex-column bg-white">
                    <div className="card-subtitle">
                      <small>{item.author}</small>
                    </div>
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

export default LatestArticles
