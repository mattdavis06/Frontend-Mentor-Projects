import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Alert({ text, error }) {
  return (
    <div
      className="alert-wrapper"
      style={error ? { opacity: '1' } : { opacity: '0' }}
    >
      <FontAwesomeIcon icon={faCircleExclamation} />
      <h4>{text}</h4>
    </div>
  )
}

export default Alert
