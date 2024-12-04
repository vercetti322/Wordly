import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Error.css';

export default function Error() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="error">
      <h1>Error 404</h1>
      <Button text={'Go Back'} handleClick={handleClick} />
    </div>
  );
}
