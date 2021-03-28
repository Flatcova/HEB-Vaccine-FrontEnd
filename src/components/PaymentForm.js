import React, { useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

toast.configure();

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const { err, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email,
        name,
        phone
      }
    });

    console.log(name, email, phone);

    if (!err) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 600,
          id,
          name,
          email,
          phone
        });

        console.log(response.data);

        if (response.data.success) {
          console.log("Success payment!");
          toast(`${response.data.message}`, { type: 'success'})
          setSuccess(true);
        }else{
            toast(`${response.data.message}`, { type: 'error'})
        }
      } catch (error) {
        console.log(`Error:\n ${error}`);
      }
    } else {
      console.log(`Err: \n ${err.message}`);
    }
  };

  return (
    <>
    <ToastContainer style={{fontSize: "15px"}}/>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
          <div className="FormRow">
            <div class="fieldset">
              <input
                id="name"
                name="name"
                data-tid="elements_examples.form.name_label"
                class="field"
                type="text"
                placeholder="Name"
                required=""
                autocomplete="name"
              ></input>
              <input
                id="email"
                name="email"
                data-tid="elements_examples.form.email_label"
                class="field"
                type="email"
                placeholder="Email"
                required=""
                autocomplete="email"
              ></input>
              <input
                id="phone"
                name="phone"
                data-tid="elements_examples.form.phone_label"
                class="field"
                type="tel"
                placeholder="Phone as shown +19561234567"
                required=""
                autocomplete="tel"
              ></input>
            </div>
            </div>
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button type="submit">Pay</button>
        </form>
      ) : (
        <div>
          <h2>
            Thanks for helping us ❤, you will be notify 
            everytime a new spot is available, you will receive
            an SMS to your phone number.
          </h2>
        </div>
      )}
    </>
  );
}
