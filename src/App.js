import { useState } from "react";
import logo from './HEB-logo.png';
import "./App.css";
import StripeContainer from "./components/StripeContainer";

function App() {
  const [showItem, setShowItem] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {showItem ? (
          <StripeContainer />
        ) : (
          <>
            {" "}
            <h2>HEB Vaccine Notifier</h2>
            <img src={logo} alt="HEB-Logo"></img>
            <p className="mainText">
              Welcome to the HEB-Vaccine notifier, our goal it's to help the
              community get the vaccine the most quickly as we can, with this
              you can help us create a better system, and fight againts
              COVID-19.
              <br />
              With this we'll make sure you get a notification, every time we
              find a spot available. hopping you get a better chance and get a
              vaccine for yourself, or a family member.
            </p>
            <h3>for just $6.00 USD, you can get this service!</h3>{" "}
            <button className="initial-Button" onClick={() => setShowItem(true)}>Get Notifications</button>{" "}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
