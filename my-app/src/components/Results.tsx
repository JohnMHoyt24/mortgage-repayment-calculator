import React from 'react';

const Results: React.FC<{ payment: string }> = ({ payment }) => {
    return (
        <div>
            {payment ? (
                <h2>Monthly Payment: ${payment}</h2>
            ) : (
                <p>Enter details to calculate mortgage.</p>
            )}
        </div>
    );
}

export default Results;