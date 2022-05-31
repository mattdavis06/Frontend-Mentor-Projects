import data from '../data/data.json'

function Chart() {
  const hoverToolTip = (e) => {
    console.dir(e.target.parentElement)
    e.target.parentElement.lastElementChild.classList.toggle('hover')
  }

  return (
    <div className="chart-outer-wrapper">
      <div className="chart-wrapper">
        <div className="chart-heading">
          <h2> Spending - Last 7 days</h2>
        </div>
        <div className="chart">
          {data.map((item, idx) => {
            return (
              <div className="chart-el" key={idx}>
                <div
                  className={`day ${item.day}`}
                  style={{ height: `${item.amount / 5}rem` }}
                  onMouseEnter={hoverToolTip}
                  onMouseLeave={hoverToolTip}
                ></div>
                <small>{item.day}</small>
                <div
                  className="chart-el-tooltip"
                  style={{ bottom: `${item.amount / 5 + 2}rem` }}
                >
                  ${item.amount}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="total-summary-wrapper">
        <div className="total-this-month">
          <div className="total-text">
            <h3>Total this month</h3>
          </div>
          <div className="total">
            <span>$478.33</span>
          </div>
        </div>
        <div className="total-last-month">
          <p>+2.4%</p>
          <small>from last month</small>
        </div>
      </div>
    </div>
  )
}

export default Chart
