import React from "react";
import "./App.css";
import SurveyPopup from "./SurveyPopup.tsx";

function App() {
  const questions = [
    { type: "star"},
    { type: "text"},
  ];

  const surveyCount = 0;
  const delayCountInSeconds = 15;
  const displayFrequencyInMin = 30;
  const [ratingTitle, setRatingTitle] = React.useState("");
  const [goodRatingTitle, setGoodRatingTitle] = React.useState(
    "Thank you for your feedback. Please let us know how we can help you further"
  );
  const [badRatingTitle, setBadRatingTitle] = React.useState(
    "We are sorry to hear that. Please let us know how we can help you further"
  );

  const [isComponentVisible, setIsComponentVisible] = React.useState(false);
  return (
    <div className="container">
      {/* Your webpage content here */}
      <h1>Survey Form Creator</h1>
      <p>
        This is a simple survey form creator. You can create a survey form and
        add it to your website.
      </p>
      <div>
        <label>Enter your Survey Question</label>
        <input
          type="text"
          placeholder="eg: Rate us from 1 to 10"
          value={ratingTitle}
          onChange={(e) => setRatingTitle(e.target.value)}
        />
      </div>
      <div>
        {" "}
        <label>Enter your next Title if rating is greater than 5</label>
        <input
          type="text"
          placeholder="eg: Thank you for your feedback. Please let us know how we can help you further"
          value={goodRatingTitle}
          onChange={(e) => setGoodRatingTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Enter your next Title if rating is less than 5</label>
        <input
          type="text"
          placeholder="eg: We are sorry to hear that. Please let us know how we can help you further"
          value={badRatingTitle}
          onChange={(e) => setBadRatingTitle(e.target.value)}
        />
      </div>
      <button onClick={() => setIsComponentVisible(true)} className="btn">
        Generate
      </button>
      {/* Render the SurveyPopup component */}

      {isComponentVisible && (
        <SurveyPopup
          questions={questions}
          surveyCount={surveyCount}
          delayCountInSeconds={delayCountInSeconds}
          displayFrequencyInMin={displayFrequencyInMin}
          ratingTitle={ratingTitle}
          goodRatingTitle={goodRatingTitle}
          badRatingTitle={badRatingTitle}
        />
      )}
    </div>
  );
}

export default App;
