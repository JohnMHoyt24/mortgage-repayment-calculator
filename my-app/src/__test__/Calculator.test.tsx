// Import the render function from React Testing Library for rendering components
import { render, fireEvent } from '@testing-library/react';
// Import the Calculator component to be tested
import Calculator from '../components/Calculator';

// Describe block groups all tests related to the Calculator component
describe('Calculator Component', () => {
    // Test that verifies the Calculator component renders successfully
    it('renders the Calculator component', () => {
        // Render the Calculator component and get access to the DOM container
        const { container } = render(<Calculator />);
        
        // Query the DOM for the div element with a class of calculator that should be rendered
        const div = container.querySelector('.calculator');
        
        // Assert that the div element exists in the document
        expect(div).toBeInTheDocument();
    })

    it('should calculate monthly repayment amount correctly', () => {
        // Render the Calculator component and get access to the DOM container
        const { container } = render(<Calculator />);
        
        /* Query the DOM for the input elements and the button element. The elements are HTMLInputElement or HTMLElement types 
        or null if not found */
        const loanAmountInput = container.querySelector('#loan-amount') as HTMLInputElement | null;
        const interestRateInput = container.querySelector('#interest-rate') as HTMLInputElement | null;
        const loanTermInput = container.querySelector('#loan-term') as HTMLInputElement | null;
        const mortgageRepaymentRadio = container.querySelector('#mortgage-repayment') as HTMLInputElement | null;
        const interestOnlyRadio = container.querySelector('#interest-only') as HTMLInputElement | null;
        const calculateButton = container.querySelector('#calculate-button') as HTMLElement | null;

        // If any of the elements are not found, throw an error
        if (!loanAmountInput || !interestRateInput || !loanTermInput || !calculateButton) {
            throw new Error('Input elements or calculate button not found');
        }
        
        // Set the values of the input elements
        loanAmountInput.value = '100000';
        interestRateInput.value = '5';
        loanTermInput.value = '30';

        if(!mortgageRepaymentRadio || !interestOnlyRadio) {
            throw new Error('Radio buttons not found');
        }

        fireEvent.click(mortgageRepaymentRadio);
        expect(mortgageRepaymentRadio).toBeChecked();
        expect(interestOnlyRadio).not.toBeChecked();
        
            // Simulate a click event on the calculate button
            calculateButton.click();
        });
    });

    it('should display error message for invalid input', () => {
        // Render the Calculator component and get access to the DOM container
        const { container } = render(<Calculator />);
        
        /* Query the DOM for the input elements and the button element. The elements are HTMLInputElement or HTMLElement types 
        or null if not found */
        const loanAmountInput = container.querySelector('#loan-amount') as HTMLInputElement | null;
        const interestRateInput = container.querySelector('#interest-rate') as HTMLInputElement | null;
        const loanTermInput = container.querySelector('#loan-term') as HTMLInputElement | null;
        const calculateButton = container.querySelector('#calculate-button') as HTMLElement | null;

        // If any of the elements are not found, throw an error
        if (!loanAmountInput || !interestRateInput || !loanTermInput || !calculateButton) {
            throw new Error('Input elements or calculate button not found');
        }
        
        // Set the values of the input elements to invalid values
        loanAmountInput.value = '-100000';
        interestRateInput.value = '-5';
        loanTermInput.value = '-30';

        // Simulate a click event on the calculate button
        calculateButton.click();
    
    it('should clear input fields when clear button is clicked', () => {
        // Render the Calculator component and get access to the DOM container
        const { container } = render(<Calculator />);
        
        /* Query the DOM for the input elements and the button element. The elements are HTMLInputElement or HTMLElement types 
        or null if not found */
        const loanAmountInput = container.querySelector('#loan-amount') as HTMLInputElement | null;
        const interestRateInput = container.querySelector('#interest-rate') as HTMLInputElement | null;
        const loanTermInput = container.querySelector('#loan-term') as HTMLInputElement | null;
        const mortgageRepaymentRadio = container.querySelector('#mortgage-repayment') as HTMLInputElement | null;
        const interestOnlyRadio = container.querySelector('#interest-only') as HTMLInputElement | null;
        const clearButton = container.querySelector('#clear-button') as HTMLElement | null;

        // If any of the elements are not found, throw an error
        if (!loanAmountInput || !interestRateInput || !loanTermInput || !clearButton) {
            throw new Error('Input elements or clear button not found');
        }

        if(!mortgageRepaymentRadio || !interestOnlyRadio) {
            throw new Error('Radio buttons not found');
        }

        if(!clearButton) {
            throw new Error('Clear button not found');
        }
        
        // Set the values of the input elements
        loanAmountInput.value = '100000';
        interestRateInput.value = '5';
        loanTermInput.value = '30';
        mortgageRepaymentRadio.

        // Simulate a click event on the clear button
        clearButton.click();

        // Assert that the input fields are cleared
        expect(loanAmountInput.value).toBe('');
        expect(interestRateInput.value).toBe('');
        expect(loanTermInput.value).toBe('');
    }
});