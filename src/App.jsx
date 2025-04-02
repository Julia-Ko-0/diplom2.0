
import './App.css';
// import { Homes } from './components/Home/Home';
import {post} from './data/elem'
import { NovBar } from './components/NovBar/novbar';
import { Outlet } from 'react-router';


function App() {
  return (
    // <div className="App">
    // <NovBar/>
  
    // </div>
    
    <>
     <div className="App"> 
     <NovBar/>
     <Outlet/>
     </div>

  
    </>
  );
}

export default App;
