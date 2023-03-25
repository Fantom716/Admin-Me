import './App.css';
import BigCard from './components/cards/big card/big-card';
import SmallCard from './components/cards/small card/small-card';
import Navigation from './components/nav/navigation.jsx'
import InformationCard from './components/cards/card for information/informationCard';
import Header from './components/header/assemblyHeader/ready header';
import Statistic from './components/statistic/statistic';

function App(props) {
  return (
    <div style={{display: "flex", height: "100vh", width: "100vw"}}>
      <Navigation name="Alexander" />
      <div className='mainContent' style={{padding: "32px", width: "100vw", background: "#F9FAFE"}}>
        <Header />
        <Statistic />
      </div>
    </div>
  );
}

export default App;
