import './App.css';
import Navigation from './components/nav/navigation.jsx'
import Header from './components/header/assemblyHeader/ready header';
import Desktop from './components/desktop/desktop';

function App(props) {
  return (
    <div style={{display: "flex", height: "100vh", width: "100vw"}}>
      <Navigation name="Alexander" />
      <div className='mainContent' style={{padding: "32px", width: "100vw", background: "#F9FAFE", overflow: "scroll"}}>
        <Header />
        <Desktop />
      </div>
    </div>
  );
}

export default App;
