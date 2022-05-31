import Logo from '../assets/images/logo.svg'

function Balance() {
  return (
    <div className="balance-wrapper">
      <div className="my-balance-wrapper">
        <div className="my-balance-text">
          <h1>My balance</h1>
        </div>
        <div className="my-balance">
          <span>$921.48</span>
        </div>
      </div>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
    </div>
  )
}

export default Balance
