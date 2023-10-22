import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const List = ({ title, value }) =>  <div className="px-4 py-4 sm:flex sm:gap-4 sm:px-0 divider">
<dt className="sm:w-8/12 text-sm font-semibold font-medium leading-6 text-gray-900">{title}</dt>
<dd className="sm:w-4/12 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
</div>

function IconContentCopy(props) {
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
function SurveyPopup({ questions, config, updateConfig }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
 

  

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

  
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

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
  let intervalMinutes;
      let maxTimes;
      let initialDelaySeconds;

      async function fetchConfig() {
        const db = getDatabase();
        const configRef = ref(db, "config"); // Assuming you have a "config" node in your database

        try {
          const snapshot = await get(configRef);
          if (snapshot.exists()) {
            const configData = snapshot.val();
            let intervalMinutes = configData.intervalMinutes;
            let maxTimes = configData.maxTimes;
            let initialDelaySeconds = configData.initialDelaySeconds;
            console.log("configData", configData);
            setTimeout(displayModal, initialDelaySeconds * 1000);

            setInterval(() => {
              if (
                closeCount < maxTimes &&
                surveyPopup.style.display !== "block" &&
                !dataCaptured
              ) {
                displayModal();
              }
            }, intervalMinutes * 60 * 1000);

          } else {
            console.error("Config data not found in Firebase.");
          }
        } catch (error) {
          console.error("Error fetching config data:", error);
        }
      }

      // Call the fetchConfig function to fetch and use the config values
      fetchConfig();
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
     
      <div className='copyBox block max-w-sm p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' >
        <div> Click on copy btn to copy the js code. paste it inside body tab.</div>
        <button 
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 btleft m-2"
        onClick={() => {
            navigator.clipboard.writeText(generateJavaScriptCode())
            toast.success(
            "Copied to clipboard!"
            )
        } } ><IconContentCopy/></button>
      </div>

      <div className="border-t border-gray-200 pb-5 mt-10 py-4">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Update Config Value</h3>
      <div className="mt-2 max-w-4xl text-sm text-gray-500">
      
       

      <List title="Choose how much time to wait before showing the survey (In seconds)" value={ <input type="number"
          max={1000}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={dummyConfig?.initialDelaySeconds} onChange={(e) => setDummyConfig({
            ...dummyConfig,
            initialDelaySeconds: parseInt(e.target.value)
          })} /> } />
      <List title="Choose how many times to show the survey (In Times)" value={ <input
          max={5}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

          type="number" value={dummyConfig?.maxTimes} onChange={(e) => setDummyConfig({
            ...dummyConfig,
            maxTimes:parseInt(e.target.value)
          })} /> }/>

          <List title="Choose how frequently to show the survey (In Minutes)" value={   <select onChange={(e) => setDummyConfig({
              ...dummyConfig,
              intervalMinutes: parseInt(e.target.value)
            })}
            className='        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"'
            >
            <option value={1}>1 min</option>
            <option value={5}>5 min</option>
            <option value={30}>30 min</option>

          </select>} />
     <button         className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => updateConfig(dummyConfig)}> UPDATE CONFIG </button>
    </div>
    </div>
      </div>
  );
}

export default SurveyPopup;
