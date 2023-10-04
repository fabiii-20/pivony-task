import React, { useState, useEffect } from 'react';
function IconContentCopy(props:any) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path d="M19 21H8V7h11m0-2H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2m-3-4H4a2 2 0 00-2 2v14h2V3h12V1z" />
      </svg>
    );
  }
function SurveyPopup({ questions, config, updateConfig }:any) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
 

  
// Generate JavaScript code for the survey pop-up
const generateJavaScriptCode = () => {
  const getRatingCode = () =>  `<div>
  <p>${config.ratingText}</p>
  <input
    type="number"
    min="1"
    max="10"
  />
  <button id="nextBtn">Next</button>
</div>`;

const getTextCode = () =>  ` <div>
<p class="title"></p>
<textarea
  rows="4"
  cols="50"
></textarea>
<button id="submitBtn">Send</button>
</div>`;

  const jsCode = `
  <script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

  // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

  // Add Firebase products that you want to use
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
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

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
  const intervalMinutes = ${config.initialDelaySeconds};
  const maxTimes = ${config.maxTimes};
  const initialDelaySeconds = ${config.initialDelaySeconds};
  let dataCaptured = false;
  let closeCount = 0;
  let result = {};
  let surveyPopup; 
  function handleNextClick()  {
      
      const ratingInput = document.querySelector('input[type="number"]');
      const rating = parseInt(ratingInput.value);
      result["rating"] = rating
      document.querySelector('.survey-popup').innerHTML = \`${getTextCode()}\`;
      // responses[0] = rating;
      if(rating< 5) {
          document.querySelector('.title').innerHTML = \'${config.badRatingText}\';
        }else {
          document.querySelector('.title').innerHTML =\'${config.goodRatingText}\';
        }
        const submitBtn = document.querySelector("#submitBtn"); 
      submitBtn?.addEventListener("click", handleSubmitClick);
    
  };
  
  // Function to handle the "Submit" button click
  function handleSubmitClick()  {
    const textArea = document.querySelector('textarea');
    const text = textArea.value;
    console.log("text", text)
    result["text"] = text
    const db = getDatabase()
    set(ref(db, 'survey/' + Date.now()), result).then(() => {document.querySelector(".survey-popup").style.display="none"
    dataCaptured= true
     alert("Thank you for your feedback")
  }).catch((error) => {console.log(error,"Error occured")})
  };
  
  function displayModal() {
  
      surveyPopup = document.createElement("div");
      surveyPopup.className = "survey-popup"

      surveyPopup.innerHTML = \`${getRatingCode()}\`;
      
    
      surveyPopup.style.position = "fixed";
      surveyPopup.style.top = "50%";
      surveyPopup.style.left = "50%";
      surveyPopup.style.transform = "translate(-50%, -50%)";
      surveyPopup.style.backgroundColor = "white";
      surveyPopup.style.padding = "20px";
      surveyPopup.style.borderRadius = "5px";
      surveyPopup.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
      surveyPopup.style.zIndex = "1000";
    
      // Close button
      const closeButton = document.createElement("span");
      closeButton.textContent = "×";
      closeButton.style.cursor = "pointer";
      closeButton.style.position = "absolute";
      closeButton.style.top = "10px";
      closeButton.style.right = "10px";
      closeButton.addEventListener("click", () => {
        surveyPopup.style.display = "none";
        closeCount = closeCount + 1;
        console.log("closeCount", closeCount);
      });
      surveyPopup.appendChild(closeButton);
    
      // Show the survey pop-up
      surveyPopup.style.display = "block";
    
      // Add the survey pop-up to the body of the webpage
      document.body.appendChild(surveyPopup);
    
      // Array to store responses
      const responses = Array(2).fill(null);
    
      // Current question index
      let currentQuestionIndex = 0;
    
      // Function to handle the "Next" button click
    
      // Function to handle the "Submit" button click
    
      // Display the survey pop-up
      const nextBtn = document.querySelector("#nextBtn"); 
      nextBtn?.addEventListener("click", handleNextClick);
      
      surveyPopup.style.display = "block";
    }
  
  setTimeout(displayModal, initialDelaySeconds * 1000);
  
  
    setInterval(() => {
      if ((closeCount < maxTimes) && surveyPopup.style.display!== "block" && !dataCaptured ) {
        displayModal();
      }
    }, intervalMinutes * 60 * 1000);
    
  
</script>
    `;  
    return jsCode;
  };

  const [dummyConfig, setDummyConfig] = useState({
    maxTimes: config.maxTimes,
    intervalMinutes: config.intervalMinutes,
    initialDelaySeconds: config.initialDelaySeconds,
  })

  useEffect(() => {
    console.log("dummyConfig", dummyConfig)
  },[dummyConfig]
)



  return (
    <div>
     
      <div className='copyBox'>
        <div> Click on copy btn to copy the js code. paste it inside body tab.</div>
        <button onClick={() => {
            navigator.clipboard.writeText(generateJavaScriptCode())
            alert(
            "Copied to clipboard!"
            )
        } } className="btleft"><IconContentCopy/></button>
      </div>

      <div className='updateArea'>
        <h1>Update Config Values</h1>
        <div>
          <label>Choose how much time to wait before showing the survey (In seconds) </label>
          <input type="number"
          max={1000}
          value={dummyConfig?.initialDelaySeconds} onChange={(e) => setDummyConfig({
            ...dummyConfig,
            initialDelaySeconds: parseInt(e.target.value)
          })} /> 
        </div>
        <div>
          <label>Choose how many times to show the survey (In Times)</label>
          <input
          max={5}
          type="number" value={dummyConfig?.maxTimes} onChange={(e) => setDummyConfig({
            ...dummyConfig,
            maxTimes:parseInt(e.target.value)
          })} /> 
      </div>
        <div>
          <label>Choose how frequently to show the survey (In Minutes)</label>
          <div>
          <select onChange={(e) => setDummyConfig({
              ...dummyConfig,
              intervalMinutes: parseInt(e.target.value)
            })}>
            <option value={1}>1 min</option>
            <option value={5}>5 min</option>
            <option value={30}>30 min</option>

          </select>
          </div>
        
          </div>
     <button className='updateBtn' onClick={() => updateConfig(dummyConfig)}> UPDATE CONFIG </button>
    </div>
    </div>
  );
}

export default SurveyPopup;
