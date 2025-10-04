import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
export default Layout;

