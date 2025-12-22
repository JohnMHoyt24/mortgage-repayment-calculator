import React, { useState } from "react";
import calcImage from "../assets/icon-calculator.svg";
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

    const clearAll = () => {
        setAmount("");
        setTerm("");
        setRate("");
        setMortgageType("");
    };

    return(
        <div className="flex justify-evenly items-center h-auto bg-gray-100 border border-transparent p- m-50 w-260 rounded-xl shadow-xl">
            <form className="w-1/2 p-3">
                <div className="h-16 flex justify-between items-center">
                    <label className="font-semibold text-lg">Mortgage Calculator</label>
                    <button className="underline text-blue-400" onClick={clearAll}>Clear All</button>
                </div>
                <div className="flex flex-col h-16">
                    <label className="text-gray-600 text-sm">Mortgage Amount </label>
                    <input
                        type="text"
                        id="mortgage-amount"
                        placeholder="Enter the amount of the loan..."
                        className="border focus:outline-lime-300 rounded-sm p-0.5"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            clearErrorOnChange('amount');
                        }}
                        //Apply error styling in Tailwind if there is an error for amount
                    />
                    {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                </div>
                <div className="flex space-x-4 h-16">
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-sm">Mortgage Term </label>
                        <input
                            type="text"
                            id="mortgage-term"
                            placeholder="Enter the term of the loan..."
                            className="w-50 border focus:outline-lime-300 rounded-sm p-0.5"
                            value={term}
                            onChange={(e) => {
                                setTerm(e.target.value);
                                clearErrorOnChange('term');
                            }}
                            //Apply error styling in Tailwind if there is an error for term
                        />
                        {errors.term && <p className="text-red-500">{errors.term}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-sm">Interest Rate </label>
                        <input
                            type="text"
                            id="mortgage-rate"
                            placeholder="Enter the interest rate of the loan..."
                            className="w-70 border focus:outline-lime-300 rounded-sm p-0.5"
                            value={rate}
                            onChange={(e) => {
                                setRate(e.target.value);
                                clearErrorOnChange('rate');
                            }}
                            //Apply error styling in Tailwind if there is an error for rate
                        />
                        {errors.rate && <p className="text-red-500">{errors.rate}</p>}
                    </div>
                </div>
                <label className="text-gray-600 text-sm">Mortgage Type</label>
                <div className="flex flex-col space-y-2">
                    <label className="border has-checked:bg-lime-100 has-checked:border-lime-400 rounded-sm w-40 p-1">
                        <input
                            type="radio"
                            name="mortgage-type"
                            value="repayment"
                            checked={mortgageType === 'repayment'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMortgageType(e.target.value as 'repayment' | 'interest')}
                        />
                        Repayment
                    </label>
                    <label className="border has-checked:bg-lime-100 has-checked:border-lime-400 rounded-sm w-40 p-1">
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
                <div className="py-4">
                    <button className="border rounded-2xl border-transparent bg-lime-500 font-bold p-2
                     hover:bg-lime-600 hover:shadow-md" onClick={calculatePayment}>
                        <div className="flex items-center space-x-2">
                            <div>
                                <img src={calcImage} alt="Icon of a calculator" />
                            </div>
                            <div>
                                Calculate Payments
                            </div>
                        </div>
                    </button>
                </div>
            </form>
            <div className="p-0 w-1/2">
                <Results payment={paymentResult} />
            </div>
        </div>
    );
}

export default Calculator;