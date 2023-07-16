import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Quotes from './Components/Quotes/Quotes';
import AddEditQuote from './Containers/AddEditQuote/AddEditQuote';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Quotes />}/>
            <Route path='/quotes' element={<Quotes />}/>
            <Route path='/quotes/:category' element={<Quotes />} />
            <Route path='/quotes/:id/edit' element={<AddEditQuote />} />
            <Route path='/add-quote' element={<AddEditQuote />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;