import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Contact.css";
import Footer from "./Footer";
import { Toaster,toast } from "react-hot-toast";

const Contact = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  // Review Form
  const {
    register: reviewRegister,
    handleSubmit: handleReviewSubmit,
    reset:reviewReset,
    formState: { errors: reviewErrors },
  } = useForm();

  // Support Form
  const {
    register: supportRegister,
    handleSubmit: handleSupportSubmit,
    reset:supportReset,
    formState: { errors: supportErrors },
  } = useForm();

  const reviewSubmit = async(data) => {
   await fetch("http://localhost:3000/contact",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
   });
   toast.success("Message submitted successfully!")
   reviewReset()
  };

  const problemSubmit = async(data) => {
    await fetch("http://localhost:3000/problem",{
     method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
     body:JSON.stringify(data)
    });
    toast.success("Ticket raised successfully!")
    supportReset()
  };

  return (
    <>
    <div className="contact-container">

      {/* Review Section */}
      <div className="review-container">
        <h1>Your Voice Matters</h1>
        <h3>
          Your feedback means a lot to us. We are a growing startup dedicated to providing quality products
          and a better shopping experience. Every review, suggestion, and opinion helps us improve our service
          and motivates us to grow. Please share your honest experience with us —
          your words will help shape the future of our journey.
        </h3>

        <form
          className="review-form"
          onSubmit={handleReviewSubmit(reviewSubmit)}
        >
          <input
            {...reviewRegister("username", {
              required: "Username is required",
            })}
            placeholder="Username"
          />
          {reviewErrors.username && (
            <div>{reviewErrors.username.message}</div>
          )}

          <input
            {...reviewRegister("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Email"
          />
          {reviewErrors.email && (
            <div>{reviewErrors.email.message}</div>
          )}

          <textarea
            {...reviewRegister("reviewMessage", {
              required: "Please write your review",
            })}
            placeholder="Write your review..."
          />
          {reviewErrors.reviewMessage && (
            <div>{reviewErrors.reviewMessage.message}</div>
          )}

          <button type="submit">
            Submit Review
          </button>
        </form>
      </div>
      <h1>General Queries</h1>
      <div className="fstqs">
        <h2 onClick={() => setOpenQuestion(openQuestion === 1 ? null : 1)}>
          How many days those delivery take?
        </h2>
        {openQuestion === 1 && (
          <p>
            Delivery usually takes 3–7 business days depending on your location and product availability.
          </p>
        )}

      </div>
      <div className="sndqs">
        <h2 onClick={() => setOpenQuestion(openQuestion === 2 ? null : 2)}>
          Can I return or exchange a product?
        </h2>
        {openQuestion === 2 && (
          <p>
            Yes, products can be returned or exchanged according to our return policy within the eligible period.
          </p>
        )}
      </div>
      <div className="trdqs">
        <h2 onClick={() => setOpenQuestion(openQuestion === 3 ? null : 3)}>
          What payment methods do you accept?
        </h2>
        {openQuestion === 3 && (
          <p>
            We accept various secure payment methods including UPI, debit cards, credit cards, and online banking.
          </p>
        )}
      </div>
      <div className="fthqs">
        <h2 onClick={() => setOpenQuestion(openQuestion === 4 ? null : 4)}>
          What should I do if my product arrives damaged or is not working?
        </h2>
        {openQuestion === 4 && (
          <p>
            Please use the "Raise a Problem" section or contact our support team with your order details.
          </p>
        )}
      </div>
      <div className="fifthqs">
        <h2 onClick={() => setOpenQuestion(openQuestion === 5 ? null : 5)}>
          How can I track my order?
        </h2>
        {openQuestion === 5 && (
          <p>
            After your order is confirmed, tracking details will be shared through your registered email or phone number.
          </p>
        )}
      </div>
      <div className="sixthqs">
        <h2 onClick={() => setOpenQuestion(openQuestion === 6 ? null : 6)}>
          Is my personal information safe?
        </h2>
        {openQuestion === 6 && (
          <p>
            Yes, we protect your information and use secure methods to keep your data safe.
          </p>
        )}
      </div>
      <div className="seventhqs">
        <h2 onClick={() => setOpenQuestion(openQuestion === 7 ? null : 7)}>
          How can I contact customer support?
        </h2>
        {openQuestion === 7 && (
          <p>
            You can use our Contact Us page, submit a query, or report an issue through the support forms.
          </p>
        )}
      </div>
      <div className="support-container">
        <h1>Raise a Problem</h1>
        <h3>Experiencing a problem with your product? Let us know what went wrong.
          Describe your issue clearly, and our team will review your request and get back to
          you with the best possible solution.</h3>
        <form
          className="support-form"
          onSubmit={handleSupportSubmit(problemSubmit)}
        >
          <input
            {...supportRegister("username", {
              required: "Username is required",
            })}
            placeholder="Username"
          />

          <input
            {...supportRegister("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Email"
          />

          <input
            {...supportRegister("productname", {
              required: "Product name is required",
            })}
            placeholder="Product Name"
          />
          <label>Problem Type</label>

          <select
            {...supportRegister("problemtype", {
              required: "Select a problem type",
            })}
          >
            <option value="">Select your problem</option>
            <option value="damaged">Product Damaged</option>
            <option value="notWorking">Product Not Working</option>
            <option value="delivery">Delivery Issue</option>
            <option value="other">Other</option>
          </select>

          <textarea
            {...supportRegister("problemmessage", {
              required: "Describe your problem",
            })}
            placeholder="Describe your problem..."
          />

          <button type="submit">
            Raise Ticket
          </button>
        </form>
      </div>
    </div>
    <Footer/>
</>
  );
};

export default Contact;