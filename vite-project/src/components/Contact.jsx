import React from 'react';

const Contact = () => {
  return (
    <form action="https://api.web3forms.com/submit" method="POST">
      <input type="hidden" name="access_key" value="da329137-a3b1-48f7-ad68-b669b3161482" />
      <div className="row">
        <div className="col-md-6 form-group">
          <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
        </div>
        <div className="col-md-6 form-group mt-3 mt-md-0">
          <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
        </div>
      </div>
      <div className="form-group mt-3">
        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
      </div>
      <div className="form-group mt-3">
        <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
      </div>
      <div className="text-center">
        <button type="submit">Send Message</button>
      </div>
    </form>
  );
};

export default Contact;