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
    const clearAll = (e: React.FormEvent) => {
        e.preventDefault();
        setAmount("");
        setTerm("");
        setRate("");
        setMortgageType("");
        setPaymentResult("");
        setErrors({});
    };

    return(
        // Main container: flexbox layout with form on left, results on right
        <div className="calculator flex flex-col lg:flex-row justify-evenly items-center h-auto bg-gray-100 border border-transparent p-4 md:p-6 lg:p-8 m-4 md:m-6 lg:m-8 w-full max-w-7xl mx-auto rounded-xl shadow-xl">
            {/* Form section: contains all input fields and calculation button */}
            <form className="w-full lg:w-1/2 p-3 md:p-4 lg:p-6">
                {/* Header section with title and clear button */}
                <div className="h-16 flex justify-between items-center mb-2 md:mb-4">
                    <h2 className="font-semibold text-base md:text-lg lg:text-xl">Mortgage Calculator</h2>
                    <button id="clear-button" className="underline text-blue-400 text-sm md:text-base hover:text-blue-600" onClick={clearAll}>Clear All</button>
                </div>
                
                {/* Mortgage Amount input field */}
                <div id="loan-amount" className="flex flex-col h-20 mb-2 md:mb-4">
                    <label htmlFor="mortgage-amount" className="text-gray-600 text-sm md:text-base mb-1">Mortgage Amount ($)</label>
                    <input
                        type="text"
                        id="mortgage-amount"
                        placeholder="Enter the amount of the loan..."
                        className="border focus:outline-lime-300 rounded-sm p-2 md:p-2.5 text-sm md:text-base w-full"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            clearErrorOnChange('amount');
                        }}
                        // Apply error styling in Tailwind if there is an error for amount
                    />
                    {/* Display error message if validation fails */}
                    {errors.amount && <p className="error-message text-red-500 text-xs md:text-sm mt-1">{errors.amount}</p>}
                </div>
                
                {/* Mortgage Term and Interest Rate inputs side by side */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 h-auto mb-2 md:mb-4">
                    {/* Mortgage Term input field */}
                    <div id="loan-term" className="flex flex-col flex-1">
                        <label className="text-gray-600 text-sm md:text-base mb-1">Mortgage Term (years)</label>
                        <input
                            type="text"
                            id="mortgage-term"
                            placeholder="Enter the term of the loan..."
                            className="w-full border focus:outline-lime-300 rounded-sm p-2 md:p-2.5 text-sm md:text-base"
                            value={term}
                            onChange={(e) => {
                                setTerm(e.target.value);
                                clearErrorOnChange('term');
                            }}
                            // Apply error styling in Tailwind if there is an error for term
                        />
                        {/* Display error message if validation fails */}
                        {errors.term && <p className="error-message text-red-500 text-xs md:text-sm mt-1">{errors.term}</p>}
                    </div>
                    
                    {/* Interest Rate input field */}
                    <div id="interest-rate" className="flex flex-col flex-1">
                        <label className="text-gray-600 text-sm md:text-base mb-1">Interest Rate (%)</label>
                        <input
                            type="text"
                            id="mortgage-rate"
                            placeholder="Enter the interest rate of the loan..."
                            className="w-full border focus:outline-lime-300 rounded-sm p-2 md:p-2.5 text-sm md:text-base"
                            value={rate}
                            onChange={(e) => {
                                setRate(e.target.value);
                                clearErrorOnChange('rate');
                            }}
                            // Apply error styling in Tailwind if there is an error for rate
                        />
                        {/* Display error message if validation fails */}
                        {errors.rate && <p className="error-message text-red-500 text-xs md:text-sm mt-1">{errors.rate}</p>}
                    </div>
                </div>
                
                {/* Mortgage Type selection: radio buttons for repayment vs interest-only */}
                <div className="mb-2 md:mb-4">
                    <label className="text-gray-600 text-sm md:text-base block mb-2">Mortgage Type</label>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                        {/* Repayment mortgage option */}
                        <label className="border has-checked:bg-lime-100 has-checked:border-lime-400 rounded-sm w-full sm:w-auto min-w-[140px] p-2 md:p-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                id="mortgage-repayment"
                                type="radio"
                                name="mortgage-type"
                                value="repayment"
                                checked={mortgageType === 'repayment'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMortgageType(e.target.value as 'repayment' | 'interest')}
                                className="mr-2"
                            />
                            <span className="text-sm md:text-base">Repayment</span>
                        </label>
                        {/* Interest-only mortgage option */}
                        <label className="border has-checked:bg-lime-100 has-checked:border-lime-400 rounded-sm w-full sm:w-auto min-w-[140px] p-2 md:p-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                id="interest-only"
                                type="radio"
                                name="mortgage-type"
                                value="interest"
                                checked={mortgageType === 'interest'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMortgageType(e.target.value as 'repayment' | 'interest')}
                                className="mr-2"
                            />
                            <span className="text-sm md:text-base">Interest Only</span>
                        </label>
                    </div>
                </div>
                
                {/* Calculate button: triggers payment calculation */}
                <div id="calculate-button" className="py-2 md:py-4">
                    <button className="border rounded-2xl border-transparent bg-lime-500 font-bold p-2 md:p-3 w-full sm:w-auto
                     hover:bg-lime-600 hover:shadow-md transition-all duration-200 active:scale-95" onClick={calculatePayment}>
                        <div className="flex items-center justify-center space-x-2">
                            <div>
                                <img src={calcImage} alt="Icon of a calculator" className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <div className="text-sm md:text-base">
                                Calculate Payments
                            </div>
                        </div>
                    </button>
                </div>
            </form>
            
            {/* Results section: displays calculated monthly payment */}
            <div className="p-0 w-full lg:w-1/2 mt-4 lg:mt-0">
                <Results payment={paymentResult} />
            </div>
        </div>
    );
}

export default Calculator;