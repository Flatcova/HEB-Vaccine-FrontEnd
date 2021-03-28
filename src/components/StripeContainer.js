import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_test_L7PBgPEgBJP9UXDjAMBafmkT004wtRJdTO"

const stripePromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    )
}
