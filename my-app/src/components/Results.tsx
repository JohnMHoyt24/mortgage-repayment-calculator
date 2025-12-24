/**
 * Results Component
 * 
 * A React component that displays the calculated monthly mortgage payment result.
 * Shows either the calculated payment amount or an empty state with instructions
 * when no calculation has been performed yet.
 */

import React from 'react';
import emptyImage from '../assets/illustration-empty.svg';

/**
 * Results component props
 * @param payment - The calculated monthly payment amount as a formatted string (e.g., "1234.56")
 *                  Empty string or null indicates no calculation has been performed
 */
const Results: React.FC<{ payment: string }> = ({ payment }) => {
    return (
        // Main results container with dark blue background and rounded corners
        <div className="results border border-transparent bg-blue-950 rounded-es-4xl text-center w-full h-110 p-6 min-h-[220px]">
            {/* Conditional rendering: show payment result or empty state */}
            {payment && payment !== null  ? (
                // Display calculated monthly payment when available
                <p className="show-result text-2xl font-bold text-white">Monthly Payment: ${payment}</p>
            ) : (
                // Empty state: shown when no calculation has been performed
                <div className="no-result flex justify-center items-center flex-col">
                    {/* Illustration image for empty state */}
                    <img src={emptyImage} alt="Illustration of a calculator, pen, coins, dollars, and note paper." />
                    {/* Empty state heading */}
                    <p className="text-xl font-bold text-white">Results shown here</p>
                    {/* Instructions for user */}
                    <p className="text-gray-400">Complete the form an click "calculate repayments" to see what your monthly repayments would be.</p>
                </div>
            )}
        </div>
    );
}

export default Results;