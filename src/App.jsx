import "./App.css";
import { Outlet } from "react-router-dom";
import Layout from "./layouts/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
}

export default App;
