import { Navigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Game.css';

export default function Game() {
  const { id } = useParams();

  // validate the id
  const isValid = /^[1-9]\d{3}$/;

  if (!isValid.test(id)) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="game">
      <Header text={`#${id}`} />
    </div>
  );
}
