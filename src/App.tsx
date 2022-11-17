import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppHeader from './components/PageHeader/AppHeader';
// import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import ErrorBoundary from './pages/Fallback/ErrorBoundary';
import Router from './routes/Router';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
