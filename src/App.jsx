import './App.css';
import GridPreview from './components/GridPreview/GridPreview';
import Header from './components/Header/Header';
import Description from './components/Description/Description';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Description />
      <GridPreview />
    </div>
  );
}
