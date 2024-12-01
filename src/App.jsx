import './App.css';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import Description from './components/Description/Description';
import CopyRight from './components/CopyRight/CopyRight';
import GridPreview from './components/GridPreview/GridPreview';

export default function App() {
  return (
    <div className="home">
      <Header />
      <Description />
      <GridPreview />
      <div className="home-buttons">
        <Button
          handleClick={() => console.log('New Button clicked')}
          text={'New Game'}
        />
        <Button
          handleClick={() => console.log(`Demo Button clicked`)}
          text={'Demo Game'}
        />
      </div>
      <CopyRight />
    </div>
  );
}
