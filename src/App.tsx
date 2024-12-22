import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { TransactionDetail, TransactionList } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to='/transactions' replace />} />
        <Route path='/transactions' element={<TransactionList />} />
        <Route path='/transactions/:id' element={<TransactionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
