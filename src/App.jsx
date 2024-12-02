import './App.css';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import Description from './components/Description/Description';
import CopyRight from './components/CopyRight/CopyRight';
import DemoModal from './components/DemoModal/DemoModal';
import GridPreview from './components/GridPreview/GridPreview';
import { useState } from 'react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

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
        <Button handleClick={() => setIsOpen(true)} text={'Try Demo'} />
        <DemoModal open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
      <CopyRight />
    </div>
  );
}
