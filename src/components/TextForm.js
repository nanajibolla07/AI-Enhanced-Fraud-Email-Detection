import { useState } from "react";

export default function TextForm() {
    const predict = async ()=>{ 
        try {
          // Make a POST request to the Flask backend API
          const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          });
          const data = await response.json();
          setResult(data.predictions)
          console.log(result);
          setDisplay(true);
          } catch (error) {
            console.error('Error making prediction:', error);
          }
    }
    const [display,setDisplay] = useState(false); 
    const result_style = ['alert alert-success my-3','alert alert-danger my-3'];
    const [result,setResult] = useState(null);
    // const [subject,setSubject] = useState("");
    const [message,setmessage] = useState("");
    // const subjectChange = (event)=> {
    //     setSubject(event.target.value);
    // }
    const messageChange = (event)=> {
      setDisplay(false);
        setmessage(event.target.value);
    }
    return (
        <>
        <div className="container"> 
            <div className="mb-3"> 
            {/* <h4>Enter Subject</h4>
            <textarea className="form-control" onChange={subjectChange} value={subject} id="subject" rows="2"></textarea> */}
            <h4>Enter Message</h4>
            <textarea className="form-control my-2" onChange={messageChange} value={message} id="message" rows="8"></textarea>
            </div>
            <button className="btn btn-primary mx-1 my-1"  onClick={predict}>Run Analysis</button>
            {display && <div>
                <div className={result_style[result]} role="alert">
                  {result===0?"Genuine":"Fraud"}
                </div>
            </div>}
        </div>
        </>
    )
}