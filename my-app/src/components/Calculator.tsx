/**
 * Calculator Component
 * 
 * A React component that provides a mortgage calculator interface.
 * Users can input loan amount, term, interest rate, and select between
 * repayment or interest-only mortgage types. The component calculates
 * and displays the monthly payment amount.
 */

import React, { useState } from "react";
import calcImage from "../assets/icon-calculator.svg";
import Results from "./Results";

const Calculator: React.FC = () => {
    // State for mortgage amount (loan principal) - stored as string for input handling
    const [amount, setAmount] = useState("");
    
    // State for mortgage term in years - stored as string for input handling
    const [term, setTerm] = useState("");
    
    // State for annual interest rate percentage - stored as string for input handling
    const [rate, setRate] = useState("");
    
    // State for mortgage type: 'repayment' (capital + interest) or 'interest' (interest-only)
    const [mortgageType, setMortgageType] = useState<'repayment' | 'interest' | ''>("");
    
    // State for form validation errors - object with field names as keys and error messages as values
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    // State for calculated monthly payment result - stored as formatted string
    const [paymentResult, setPaymentResult] = useState("");
    
    // Regular expression to validate numeric input (allows digits and decimal point)
    const regex = /[^0-9.]/;

    /**
     * Validates the form inputs
     * Checks if required fields are filled and if they contain valid numeric values
     * @returns Object containing validation errors (empty if validation passes)
     */
    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        // Check if required fields are empty
        if(!amount) newErrors.amount = "Please provide the amount of the loan!";
        if(!term) newErrors.term = "Please provide the term of the loan!";
        if(!rate) newErrors.rate = "Please provide the interest rate of the loan!";

        // Validate that inputs contain only numeric characters and decimal points
        if(regex.test(amount)){
            newErrors.amount = "The amount must be a valid number!";
        } else if(regex.test(term)){
            newErrors.term = "The term must be a valid number!";
        } else if (regex.test(rate)) {
            newErrors.rate = "The rate must be a valid number!";
        }

        return newErrors;
    }

    /**
     * Clears the error message for a specific field when user starts typing
     * Provides real-time error clearing for better user experience
     * @param fieldName - The name of the field whose error should be cleared
     */
    const clearErrorOnChange = (fieldName: string) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        })
    }

    /**
     * Calculates the monthly mortgage payment based on user inputs
     * Handles both repayment and interest-only mortgage types
     * Uses the standard amortization formula for repayment mortgages
     * @param e - Form submission event (prevented to avoid page refresh)
     */
    const calculatePayment = (e: React.FormEvent) => {
        // Prevent default form submission behavior
        e.preventDefault();
        
        // Validate inputs before calculation
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        // Clear any previous errors
        setErrors({});
        
        // Convert string inputs to numbers for calculation
        const principal = parseFloat(amount);
        const annualInterestRate = parseFloat(rate) / 100; // Convert percentage to decimal
        const monthlyInterestRate = annualInterestRate / 12; // Convert annual rate to monthly
        const monthlyPayments = parseFloat(term) * 12; // Convert years to months
        
        // Validate term is greater than zero
        if (monthlyPayments === 0) {
            alert("Term must be greater than zero.");
            return;
        }

        // Calculate monthly repayment using amortization formula
        // Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
        // Where M = monthly payment, P = principal, r = monthly interest rate, n = number of payments
        // Special case: if interest rate is 0, simply divide principal by number of payments
        let monthlyRepayment: number;
        if (monthlyInterestRate === 0) {
            monthlyRepayment = principal / monthlyPayments;
        } else {
            monthlyRepayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -monthlyPayments));
        }

        // Calculate and set result based on mortgage type
        if (mortgageType === 'repayment') {
            // Repayment mortgage: includes both principal and interest
            const strMonthlyRepayment = monthlyRepayment.toFixed(2);
            setPaymentResult(strMonthlyRepayment);
        } else if (mortgageType === 'interest'){
            // Interest-only mortgage: monthly payment is only the interest portion
            const interestOnlyMonthly = principal * monthlyInterestRate;
            setPaymentResult(interestOnlyMonthly.toFixed(2));
        } else {
            // No mortgage type selected - clear result
            setPaymentResult("");
        }
        
        // Reset the form after calculation
        setAmount("");
        setTerm("");
        setRate("");
        setMortgageType("");
    }

    /**
     * Clears all form inputs and resets the calculator to initial state
     * Called when user clicks the "Clear All" button
     */
    const clearAll = () => {
        setAmount("");
        setTerm("");
        setRate("");
        setMortgageType("");
    };

    return(
        // Main container: flexbox layout with form on left, results on right
        <div className="flex justify-evenly items-center h-auto bg-gray-100 border border-transparent p- m-50 w-260 rounded-xl shadow-xl">
            {/* Form section: contains all input fields and calculation button */}
            <form className="w-1/2 p-3">
                {/* Header section with title and clear button */}
                <div className="h-16 flex justify-between items-center">
                    <label className="font-semibold text-lg">Mortgage Calculator</label>
                    <button className="underline text-blue-400" onClick={clearAll}>Clear All</button>
                </div>
                
                {/* Mortgage Amount input field */}
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
                        // Apply error styling in Tailwind if there is an error for amount
                    />
                    {/* Display error message if validation fails */}
                    {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                </div>
                
                {/* Mortgage Term and Interest Rate inputs side by side */}
                <div className="flex space-x-4 h-16">
                    {/* Mortgage Term input field */}
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
                            // Apply error styling in Tailwind if there is an error for term
                        />
                        {/* Display error message if validation fails */}
                        {errors.term && <p className="text-red-500">{errors.term}</p>}
                    </div>
                    
                    {/* Interest Rate input field */}
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
                            // Apply error styling in Tailwind if there is an error for rate
                        />
                        {/* Display error message if validation fails */}
                        {errors.rate && <p className="text-red-500">{errors.rate}</p>}
                    </div>
                </div>
                
                {/* Mortgage Type selection: radio buttons for repayment vs interest-only */}
                <label className="text-gray-600 text-sm">Mortgage Type</label>
                <div className="flex flex-col space-y-2">
                    {/* Repayment mortgage option */}
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
                    {/* Interest-only mortgage option */}
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
                
                {/* Calculate button: triggers payment calculation */}
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
            
            {/* Results section: displays calculated monthly payment */}
            <div className="p-0 w-1/2">
                <Results payment={paymentResult} />
            </div>
        </div>
    );
}

export default Calculator;