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
      <img
        className="ashneer-meme"
        src="src\assets\images\ashneer-meme.jpg"
        alt="ashneer-meme"
      />
      <Button text={'Go Back'} handleClick={handleClick} />
    </div>
  );
}
