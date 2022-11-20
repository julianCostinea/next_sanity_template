import NavBar from "../components/navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app-container">
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
