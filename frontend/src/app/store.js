import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/ticket/ticketSlice';
import noteReducer from '../features/note/noteSlice'


//configuring store of redux
//it contains all the global state of the react app
//useSelector() -- hook to get the global state
//useDispatch() -- hook to update the global state
export const store = configureStore({
  reducer: {
    auth : authReducer,
    ticket : ticketReducer,
    note : noteReducer
  }
});
