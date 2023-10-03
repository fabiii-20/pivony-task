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
function SurveyPopup({ questions, surveyCount, delayCountInSeconds, displayFrequencyInMin, ratingTitle,goodRatingTitle,badRatingTitle }:any) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Show the survey pop-up after the specified delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, delayCountInSeconds * 1000);

    return () => clearTimeout(timer);
  }, [delayCountInSeconds]);

  // Function to handle the "Next" button click
  const handleNextClick = () => {
    const response = responses[currentQuestionIndex];
    if (response !== undefined) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Please provide a response.');
    }
  };

  // Function to handle the "Submit" button click
  const handleSubmitClick = () => {
    const response = responses[currentQuestionIndex];
    if (response !== undefined) {
      // You can send the response to your server here for further processing.
      console.log('Response:', response);

      // Hide the survey pop-up
      setShowPopup(false);

      // Update the survey count and timestamp in localStorage
      surveyCount++;
      localStorage.setItem('surveyCount', surveyCount.toString());
      localStorage.setItem('lastSurveyTime', Date.now().toString());
    } else {
      alert('Please provide a response.');
    }
  };

  // Check if the survey should be displayed
  useEffect(() => {
    const lastSurveyTime = parseInt(localStorage.getItem('lastSurveyTime') || '0');
    const currentTime = Date.now();

    if (surveyCount < 3 && (currentTime - lastSurveyTime >= displayFrequencyInMin * 60 * 1000)) {
      setShowPopup(true);
    }
  }, [surveyCount, displayFrequencyInMin]);

  // ...


  

  // Implement the rendering of survey questions here
  const renderSurveyQuestion = (index:any) => {
    const question = questions[index];
    if (!question) {
      return `
        <div>
          Thank you for completing the survey!
        </div>
      `;
    }
  
    switch (question.type) {
      case 'checkbox':
        return `
          <div>
            <p class="title">${question.text}</p>
            ${question.options.map((option:any, index:any) => `
              <label key="${index}">
                <input
                  type="checkbox"
                  value="${option}"
                  // Implement checkbox input handling here
                />
                ${option}
              </label>
            `).join('')}
            <button onClick="handleNextClick()">Next</button>
          </div>
        `;
      case 'star':
        return `
          <div>
            <p>${ratingTitle}</p>
            <input
              type="number"
              min="1"
              max="10"
            />
            <button onClick="handleNextClick()">Next</button>
          </div>
        `;
      case 'text':
        return `
          <div>
            <p class="title"></p>
            <textarea
              rows="4"
              cols="50"
            ></textarea>
            <button onClick="handleSubmitClick()">Send</button>
          </div>
        `;
      default:
        return '';
    }
  };
  
  
 
  // ...

const questionString = "${currentQuestionContent}"
  
// Generate JavaScript code for the survey pop-up
const generateJavaScriptCode = () => {
    const jsCode = `
      // JavaScript code for the survey pop-up
      const surveyPopup = document.createElement('div');

      surveyPopup.innerHTML = \`
        <div class="survey-popup">
            ${renderSurveyQuestion(currentQuestionIndex)}
        </div>
      \`;
  
      // Add the survey pop-up to the body of the webpage
      document.body.appendChild(surveyPopup);
  
      // Array to store responses
      const responses = Array(${questions.length}).fill(null);
  
      // Current question index
      let currentQuestionIndex = 0;
  
      // Function to handle the "Next" button click
      const handleNextClick = () => {
        ${getNextQuestionLogic()}
      };
  
      // Function to handle the "Submit" button click
      const handleSubmitClick = () => {
        ${getSubmitLogic()}
      };
  
      // Display the survey pop-up
      surveyPopup.style.display = 'block';
    `;
  
    return jsCode;
  };
  const myQuestions = questions?.map((question:any, index:any) =>
  ({index:index,content:renderSurveyQuestion(index)})
  )

const renderQuestionByIndex = () =>{
    const data = myQuestions.find((q:any) => q.index == currentQuestionIndex )
    console.log(data)
   return  data?.content

//    return myQuestions?.map((question:any, index:any) => question.content).join('')

}
  // Function to generate logic for displaying the next question
  const getNextQuestionLogic = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const nextQuestion = questions[currentQuestionIndex + 1];
  
    if (currentQuestion.type === 'checkbox') {
      // Handle checkbox input and store selected options in responses array
      return `
        const selectedOptions = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
        responses[${currentQuestionIndex}] = selectedOptions;
      `;
    } else if (currentQuestion.type === 'star') {
      // Handle star rating input and store rating in responses array
      return `
        const ratingInput = document.querySelector('input[type="number"]');
        const rating = parseInt(ratingInput.value);
        
        document.querySelector('.survey-popup').innerHTML = \``+renderSurveyQuestion(currentQuestionIndex+1)+`\`;
        responses[${currentQuestionIndex}] = rating;
        if(rating< 5) {
            document.querySelector('.title').innerHTML = '${badRatingTitle}';
          }else {
            document.querySelector('.title').innerHTML ='${goodRatingTitle}';
          }
      `;
    } else if (currentQuestion.type === 'text') {
      // Handle text input and store text response in responses array
      return `
        const textInput = document.querySelector('textarea');
        const textResponse = textInput.value;
        responses[${currentQuestionIndex}] = textResponse;
      `;
    } else {
      // Handle other question types here
      return '';
    }
  };
  
  // Function to generate logic for handling submission
  const getSubmitLogic = () => {
    const currentQuestion = questions[currentQuestionIndex];
  
    // Send the response data to an API route
    return `
      const response = responses[${currentQuestionIndex}];
      const apiUrl = 'https://your-api-url.com/submit-survey-response';
  
      // Implement the API call here to send the response data
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionType: '${currentQuestion.type}',
          response,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Survey response submitted successfully:', data);
        })
        .catch(error => {
          console.error('Error submitting survey response:', error);
        });
    `;
  };
  
  // ...
  

  return (
    <div>
     
      <div className='copyBox'>
        <div>Code generated!</div>
        <button onClick={() => {
            navigator.clipboard.writeText(generateJavaScriptCode())
            alert(
            "Copied to clipboard!"
            )
        } } className="btleft"><IconContentCopy/></button>
      </div>
     
    </div>
  );
}

export default SurveyPopup;
