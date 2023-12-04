import React from 'react'
import { Link } from 'react-router-dom';

import Base from './Base';

const Contact = () => {
   
    
    const contactForm = () => {
        return (
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="address details">
                  <div className="mt-3 font-bold text-xl">Address</div>
                  <div className="text-one">IIIT-NR</div>
                  <div className="text-two mb-4">Naya Raipur CG, 493661</div>
                </div>
                <div className="phone details">
                  <div className="font-bold text-xl">Phone</div>
                  <div className="text-one">+91.........</div>
                  <div className="text-two mb-4"></div>
                </div>
                <div className="details">
                  <div className="font-bold text-xl">Email</div>
                  <div className="text-one">shivanshu.rkt@gmail.com</div>
                </div>
              </div>
              <div className="col-6">
                <div className="topic-text mt-3 mb-2">Send us a message</div>
                <form action="#">
                  <div className="form-group my-1">
                    <input
                      className="px-2 form-control rounded"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-grup my-1">
                    <input
                      className="px-2 form-control rounded"
                      type="text"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="from-group message-box"></div>
                  <div className="input-box my-2">
                    <textarea
                      className="px-2 form-control rounded"
                      type="text"
                      placeholder="Your message"
                      rows={4}
                      cols={21}
                    />
                  </div>
                  <div className="btn">
                    <Link to="/">
                      <input
                        className="btn-success  px-3 py-2 rounded px-1"
                        type="button"
                        value="Send Now"
                      />
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
    }

    return (
        <Base
            title='Contact page'
            description='Mail for any query/suggestion to the maintainer here'
        >
        {contactForm()}
        </Base>
    )
}

export default Contact