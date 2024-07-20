import React from 'react';
import './Contact.css';
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import send from '../../assets/send.png'; // Correct import name
import discord_icon from '../../assets/discord.png'

const Contact = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "43431de8-4bf5-409c-be78-fb498c24e85f");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("We Received Your Email Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className='contact container' name='contact'>
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="" /></h3>
        <p>
            Feel free to reach out through contact form or find our contact
            information below. Your feedback, questions, and suggestions are
            important to us as we strive to provide exceptional content.
        </p>
        <ul>
            <li><img src={discord_icon} alt="" />Discord ID: rayen057494</li>
            <li><img src={mail_icon} alt="" />rayenomri23p@gmail.com</li>
            <li><img src={location_icon} alt="" />Tunisia, Tunis</li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your name</label>
          <input type="text" name='name' placeholder='Enter you name' required/>
          <label>Discord ID</label>
          <input type="text" name='phone' placeholder='Enter your Discord ID' required/>
          <label>Write your messages here</label>
          <textarea name="message"  rows="6" placeholder='Enter you message' required></textarea>
          <button id='btn2'>Submit now <img src={send} alt='Dark Arrow' /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
}

export default Contact;