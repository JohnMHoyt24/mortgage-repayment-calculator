import React, { useState } from "react";

interface Payment {
    id: number,
    amount: string,
    term: string,
    rate: string
}

const Calculator: React.FC = () => {
    const [amount, setAmount] = useState("");
    const [term, setTerm] = useState("");
    const [rate, setRate] = useState("");
    const [mortgageType, setMortgageType] = useState<'repayment' | 'interest' | ''>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const regex = /[^0-9.]/;

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if(!amount) newErrors.amount = "Please provide the amount of the loan!";
        if(!term) newErrors.term = "Please provide the term of the loan!";
        if(!rate) newErrors.rate = "Please provide the interest rate of the loan!";

        if(regex.test(amount)){
            newErrors.amount = "The amount must be a number!";
        } else if(regex.test(term)){
            newErrors.term = "The term must be a number!";
        } else if (regex.test(rate)) {
            newErrors.rate = "The rate must be a number!";
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

        const handleCalculation = (e: React.FormEvent) => {
            //The values the user enters are strings, they need to be converted to numbers for calculation
            e.preventDefault();
            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
            } else {
                setErrors({});
                const principal = parseFloat(amount);
                const annualInterestRate = parseFloat(rate) / 100;
                const monthlyInterestRate = annualInterestRate / 12;
                const monthlyPayments = parseFloat(term) * 12;
                let monthlyRepayment: number = (principal) * ((monthlyInterestRate * (Math.pow(1 + monthlyInterestRate, monthlyPayments))) / (Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1));
                let totalRepayment: number = monthlyRepayment * monthlyPayments;
                let interest: number = principal * annualInterestRate;

                if (mortgageType === 'repayment') {
                    //Calculating monthly payment for repayment mortgage

                } else if(mortgageType === 'interest'){
                    //Calculation for interest only mortgage
                }

                //The result needs to be converted from a number to a string
                const strMonthlyRepayment = monthlyRepayment.toString();
            }

            

        }

        return(
        <div>
            <h1>Mortgage Calculator</h1>
            <form>
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
                    <button type="button" onClick={handleCalculation}>
                        Calculate Repayments
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Calculator;