import React, { useEffect, useState } from "react";
import "./App.css";
import SurveyPopup from "./SurveyPopup";
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, update } from "firebase/database";
import { toast } from "react-toastify";

const List = ({ title, value }) =>  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 divider">
<dt className="text-sm font-semibold font-medium leading-6 text-gray-900">{title}</dt>
<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
</div>

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
    try{
      update(ref(db, "config"), {
        maxTimes: config.maxTimes,
        intervalMinutes: config.intervalMinutes,
        initialDelaySeconds: config.initialDelaySeconds,
      })
        .then(() => {
          toast.success("Config updated");
          getConfig();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error updating config");
        });
    }catch(err){
      console.log(err);
      toast.error("Error updating config");
    }
  };

  const [isComponentVisible, setIsComponentVisible] = React.useState(false);
  return (
   <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 py-10">
     <div className="bg-white mx-auto max-w-7xl sm:px-6 lg:px-8 py-8 rounded-lg">
      
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Survey Form Creator</h2>
      <div className="my-4 relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
      This is a simple survey form creator. You can create a survey form and
add it to your website.
</div>
<p>

</p>
<dl className="divide-y divide-gray-100">
<List title="Rating text" value={config.ratingText} />
<List title="Good Rating text" value={config.goodRatingText} />
<List title="Bad Rating text" value={config.badRatingText} />
<List title="Max times" value={config.maxTimes} />
<List title="Interval minutes" value={config.intervalMinutes} />
<List title="Initial delay seconds" value={config.initialDelaySeconds} />


</dl>


<SurveyPopup
questions={questions}
updateConfig={updateConfig}
config={config}
/>
</div>
   </div>
  );
}

export default App;
