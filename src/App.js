import './App.css';
import BigCard from './components/cards/big card/big-card';
import SmallCard from './components/cards/small card/small-card';
import Navigation from './components/nav/navigation.jsx'

function App() {
  return (
    <>
      <Navigation name="Alexander" />
      <BigCard />
      <SmallCard />
    </>
  );
}

export default App;
