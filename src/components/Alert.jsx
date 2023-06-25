import { PropTypes } from "prop-types";

function Alert({ message, color }) {

  Alert.propTypes = {
    message: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }

  return (
    <div className={`mt-5 alert alert-${color} text-center`} role="alert">
      {message}
    </div>
  )
}

export default Alert;