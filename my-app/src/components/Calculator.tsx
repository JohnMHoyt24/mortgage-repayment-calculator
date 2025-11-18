import React, { useState } from "react";

interface Payment {
    id: number,
    amount: number,
    term: number,
    rate: number
}

const Calculator: React.FC = () => {
    const [amount, setAmount] = useState("");
    const [term, setTerm] = useState("");
    const [rate, setRate] = useState("");
    const [type, setType] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const regex = /[^0-9.]/;

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if(!amount) newErrors.amount = "Please provide the amount of the loan!";
        if(!term) newErrors.term = "Please provide the term of the loan!";
        if(!rate) newErrors.rate = "Please provide the interest rate of the loan!";

        if(regex.test(amount)){
            newErrors.amount = "The amount must be a number!";
        }

        return newErrors;
    }

    return(
        <div>
            <h1>Mortgage Calculator</h1>
            <form>

            </form>
        </div>
    );
}

export default Calculator;