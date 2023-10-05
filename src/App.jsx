import React, { useEffect, useState } from "react";
import "./App.css";
import SurveyPopup from "./SurveyPopup";
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAdr8ujMuNVqOTWBDhDnTad15jSSklJ_7s",

  authDomain: "bookexchange-60635.firebaseapp.com",

  databaseURL: "https://bookexchange-60635.firebaseio.com",

  projectId: "bookexchange-60635",

  storageBucket: "bookexchange-60635.appspot.com",

  messagingSenderId: "532023126265",

  appId: "1:532023126265:web:c973f478134728baaf9a28",

  measurementId: "G-WRYPJDG375",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
function App() {
  const questions = [{ type: "star" }, { type: "text" }];

  
  const [config, setConfig] = useState({});

  const db = getDatabase();

  const getConfig = () => {
    get(ref(db, "config")).then((snapshot) => {
      console.log(snapshot.val());
      setConfig(snapshot.val());
    });
  };
  useEffect(() => {
    getConfig();
  }, []);

  const updateConfig = (config) => {
    update(ref(db, "config"), {
      maxTimes: config.maxTimes,
      intervalMinutes: config.intervalMinutes,
      initialDelaySeconds: config.initialDelaySeconds,
    })
      .then(() => {
        alert("updated successfully");
        getConfig();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isComponentVisible, setIsComponentVisible] = React.useState(false);
  return (
    <div className="container">
      {/* Your webpage content here */}
      <h1>Survey Form Creator</h1>
      <p>
        This is a simple survey form creator. You can create a survey form and
        add it to your website.
      </p>
      <div className="box">
        <div>Rating text - {config.ratingText}</div>
        <div>Good Rating text - {config.goodRatingText}</div>
        <div>Bad Rating text - {config.badRatingText}</div>
      </div>
      <div>Max times - {config.maxTimes}</div>
      <div>Interval minutes - {config.intervalMinutes}</div>
      <div>Initial delay seconds - {config.initialDelaySeconds}</div>
      {/* Render the SurveyPopup component */}

      <SurveyPopup
        questions={questions}
        updateConfig={updateConfig}
        config={config}
      />
    </div>
  );
}

export default App;
