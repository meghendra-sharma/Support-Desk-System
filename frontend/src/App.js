import React from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewTicket from './pages/NewTicket';
import Spinner from './components/Spinner';
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';



function App() {
  return (
    <>
    
    <Router>
      <Header/>

      
      
      <Routes>

        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>

        {/* private route -- new-ticket */}
        <Route path='/new-ticket' element = {<PrivateRoute/>}>
        <Route path='/new-ticket' element = {<NewTicket/>}/>
        </Route>

        {/* private route -- tickets */}
        <Route path='/tickets' element = {<PrivateRoute/>}>
        <Route path='/tickets' element = {<Tickets/>}/>
        </Route>

        {/* private route -- ticket:ticketId */}
        <Route path='/ticket/:ticketId' element = {<PrivateRoute/>}>
        <Route path='/ticket/:ticketId' element = {<Ticket/>}/>
        </Route>

      </Routes>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
