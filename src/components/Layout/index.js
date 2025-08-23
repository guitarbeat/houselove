import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import BackToTop from '../BackToTop';
import './index.scss';

const Layout = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="page">
        <Outlet />
      </div>
      <BackToTop />
    </div>
  );
};

export default Layout;
