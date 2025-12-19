import React from 'react';
import emptyImage from '../assets/illustration-empty.svg';

const Results: React.FC<{ payment: string }> = ({ payment }) => {
    return (
        <div className="border border-transparent bg-blue-950 rounded-es-4xl text-center w-full h-full p-6 min-h-[220px]">
            {payment && payment !== null  ? (
                <h2>Monthly Payment: ${payment}</h2>
            ) : (
                <div className="flex justify-center items-center flex-col">
                    <img src={emptyImage} alt="Illustration of a calculator, pen, coins, dollars, and note paper." />
                    <p className="text-xl font-bold text-white">Results shown here</p>
                    <p className="text-gray-400">Complete the form an click "calculate repayments" to see what your monthly repayments would be.</p>
                </div>
            )}
        </div>
    );
}

export default Results;