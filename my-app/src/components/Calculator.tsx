import React, { useState } from "react";
import Results from "./Results";

const Calculator: React.FC = () => {
    const [amount, setAmount] = useState("");
    const [term, setTerm] = useState("");
    const [rate, setRate] = useState("");
    const [mortgageType, setMortgageType] = useState<'repayment' | 'interest' | ''>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [paymentResult, setPaymentResult] = useState("");
    const regex = /[^0-9.]/;

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if(!amount) newErrors.amount = "Please provide the amount of the loan!";
        if(!term) newErrors.term = "Please provide the term of the loan!";
        if(!rate) newErrors.rate = "Please provide the interest rate of the loan!";

        if(regex.test(amount)){
            newErrors.amount = "The amount must be a valid number!";
        } else if(regex.test(term)){
            newErrors.term = "The term must be a valid number!";
        } else if (regex.test(rate)) {
            newErrors.rate = "The rate must be a valid number!";
        }

        return newErrors;
    }

    const clearErrorOnChange = (fieldName: string) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        })
    }

    const calculatePayment = (e: React.FormEvent) => {
        //The values the user enters are strings, they need to be converted to numbers for calculation
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        const principal = parseFloat(amount);
        const annualInterestRate = parseFloat(rate) / 100;
        const monthlyInterestRate = annualInterestRate / 12;
        const monthlyPayments = parseFloat(term) * 12;
        if (monthlyPayments === 0) {
            alert("Term must be greater than zero.");
            return;
        }

        // Calculate monthly repayment safely, handling zero interest
        let monthlyRepayment: number;
        if (monthlyInterestRate === 0) {
            monthlyRepayment = principal / monthlyPayments;
        } else {
            monthlyRepayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -monthlyPayments));
        }

        if (mortgageType === 'repayment') {
            const strMonthlyRepayment = monthlyRepayment.toFixed(2);
            setPaymentResult(strMonthlyRepayment);
        } else if (mortgageType === 'interest'){
            // interest-only: monthly payment is principal * monthly rate
            const interestOnlyMonthly = principal * monthlyInterestRate;
            setPaymentResult(interestOnlyMonthly.toFixed(2));
        } else {
            // no mortgage type selected
            setPaymentResult("");
        }
        //Reset the form after calculation
        setAmount("");
        setTerm("");
        setRate("");
        setMortgageType("");
    }

    return(
        <div className="flex justify-evenly items-center h-auto border p-4 m-50 w-200 rounded shadow-md">
            <form>
                <h1>Mortgage Calculator</h1>
                <h2>Mortgage Amount</h2>
                <div>
                    <input
                        type="text"
                        id="mortgage-amount"
                        placeholder="Enter the amount of the loan..."
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            clearErrorOnChange('amount');
                        }}
                        //Apply error styling in Tailwind if there is an error for amount
                    />
                    {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        id="mortgage-term"
                        placeholder="Enter the term of the loan..."
                        value={term}
                        onChange={(e) => {
                            setTerm(e.target.value);
                            clearErrorOnChange('term');
                        }}
                        //Apply error styling in Tailwind if there is an error for term
                    />
                    {errors.term && <p className="text-red-500">{errors.term}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        id="mortgage-rate"
                        placeholder="Enter the interest rate of the loan..."
                        value={rate}
                        onChange={(e) => {
                            setRate(e.target.value);
                            clearErrorOnChange('rate');
                        }}
                        //Apply error styling in Tailwind if there is an error for rate
                    />
                    {errors.rate && <p className="text-red-500">{errors.rate}</p>}
                </div>
                <h2>Mortgage Type</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="mortgage-type"
                            value="repayment"
                            checked={mortgageType === 'repayment'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMortgageType(e.target.value as 'repayment' | 'interest')}
                        />
                        Repayment
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="mortgage-type"
                            value="interest"
                            checked={mortgageType === 'interest'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMortgageType(e.target.value as 'repayment' | 'interest')}
                        />
                        Interest Only
                    </label>
                </div>
                <div>
                    <button onClick={calculatePayment}>
                        Calculate Repayments
                    </button>
                </div>
            </form>
            <div className="p-4 border rounded shadow-md">
                <Results payment={paymentResult} />
            </div>
        </div>
    );
}

export default Calculator;