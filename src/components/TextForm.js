import { useState} from "react";

export default function TextForm() {

  const predict = async () => {
    try {
      // Make a POST request to the Flask backend API
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      const data = await response.json();
      setResult(data.predictions)
      // console.log(result);
      setToDisplayMeessage(true);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  }
  const [toDisplayMeessage, setToDisplayMeessage] = useState(false);
  const resultStyle = ['alert alert-success my-3', 'alert alert-danger my-3'];
  const [result, setResult] = useState(null);
  const [message, setmessage] = useState("");
  const [isContentAddedToDb, setIsContentAddedToDb] = useState(false);

  const onMessageChange = (event) => {
    setToDisplayMeessage(false);
    setmessage(event.target.value);
  }
  
  const showContentAddedToDbMsg = ()=>{
    setIsContentAddedToDb(true);
    setTimeout(() => {
      setIsContentAddedToDb(false);
      setToDisplayMeessage(false);
    }, 3000);
  }
  const saveMessage = async () => {
    if (message === ""){
      console.log("No auth token");
      return;
    } 
      
    let authtoken = localStorage.getItem("authtoken");
    if (authtoken === null) {
      console.log("User has not logged in");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/message/addmessage",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
          },
          body: JSON.stringify({ messageContent: message, result })
        });
        const json  = await response.json();
        if(json.success === true){
          showContentAddedToDbMsg();
        }
        else{
          console.log(json);
        }
    }
    catch {
      console.log("Error in saving the addmessage");
    }
  }


  return (
    <div className="textform-container">
      <h3 className="col-white">Enter Your Email</h3>
      <textarea className="email-text" onChange={onMessageChange} value={message} id="message" rows="8"></textarea>
      <button className="btn-size mr-1" onClick={predict}>Run Analysis</button>
      {toDisplayMeessage && <button className="btn-size mr-1" onClick={saveMessage}>Save Message</button>}
      {toDisplayMeessage && <div>
        <div className={resultStyle[result]} role="alert">
          {result === 0 ? "Genuine" : "Fraud"}
        </div>
      </div>}
      {isContentAddedToDb && <div>
        <div className="alert alert-dark" role="alert">
          The Message sucessfully added to Data Base
        </div>
      </div>}
    </div>
  )
}