import { useNavigate } from 'react-router-dom';

function withNavigate(WrappedComponent) {
  return function(props) {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
}

export default withNavigate;
