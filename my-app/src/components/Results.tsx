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
        <div className="results border border-transparent bg-blue-950 rounded-es-4xl lg:rounded-es-4xl rounded-ee-4xl lg:rounded-ee-none text-center w-full h-auto min-h-[220px] md:min-h-[280px] lg:min-h-[440px] p-4 md:p-6 lg:p-8 flex items-center justify-center">
            {/* Conditional rendering: show payment result or empty state */}
            {payment && payment !== null  ? (
                // Display calculated monthly payment when available
                <p className="show-result text-lg md:text-xl lg:text-2xl font-bold text-white px-2">Monthly Payment: ${payment}</p>
            ) : (
                // Empty state: shown when no calculation has been performed
                <div className="no-result flex justify-center items-center flex-col px-2">
                    {/* Illustration image for empty state */}
                    <img src={emptyImage} alt="Illustration of a calculator, pen, coins, dollars, and note paper." className="w-32 h-32 md:w-40 md:h-40 lg:w-auto lg:h-auto mb-4" />
                    {/* Empty state heading */}
                    <p className="text-lg md:text-xl font-bold text-white mb-2">Results shown here</p>
                    {/* Instructions for user */}
                    <p className="text-gray-400 text-sm md:text-base text-center max-w-md">Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
                </div>
            )}
        </div>
    );
}

export default Results;