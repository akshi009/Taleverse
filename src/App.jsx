import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import authService from "./appwrite/authService";
import Footer from "./components/Footer";
import { login, logout } from "./store/auth";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="flex flex-col overflow-y-auto bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 right-0 w-full bg-transparent z-10">
        <Header />
      </header>

      {/* Main Content */}
      <main className="  ">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bottom-0  w-full bg-transparent ">
        <Footer />
      </footer>
    </div>
  ) : null;
}

export default App;
