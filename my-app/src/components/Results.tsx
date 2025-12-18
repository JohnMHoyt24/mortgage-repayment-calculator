import React from 'react';
import emptyImage from '../assets/illustration-empty.svg';

const Results: React.FC<{ payment: string }> = ({ payment }) => {
    return (
        <section>
            {payment && payment !== null  ? (
                <h2>Monthly Payment: ${payment}</h2>
            ) : (
                <div>
                    <img src={emptyImage} alt="Illustration of a calculator, pen, coins, dollars, and note paper." />
                    <p>Results shown here</p>
                    <p>Complete the form an click "calculate repayments" to see what your monthly repayments would be.</p>
                </div>
            )}
        </section>
    );
}

export default Results;