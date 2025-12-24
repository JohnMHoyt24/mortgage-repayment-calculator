// Import the render function from React Testing Library for rendering components
import { render } from '@testing-library/react';
// Import the Calculator component to be tested
import Results from '../components/Results';

// Describe block groups all tests related to the Calculator component
describe('Results Component', () => {
    // Test that verifies the Results component renders successfully
    it('renders the Results component', () => {
      // Render the Results component and get access to the DOM container
      const { container } = render(<Results payment="" />);
      
      // Query the DOM for the div element with a class of results that should be rendered
      const div = container.querySelector('.results');
      
      // Assert that the div element exists in the document
      expect(div).toBeInTheDocument();
    })

    it('displays the calculated payment or an empty state', () => {
      // Test case 1: When payment is provided, show-result should be displayed
      const { container: containerWithPayment } = render(<Results payment="350.75" />);
      const showResult = containerWithPayment.querySelector('.show-result');
      const noResultWithPayment = containerWithPayment.querySelector('.no-result');
      
      // Assert that show-result exists and no-result does not
      expect(showResult).toBeInTheDocument();
      expect(noResultWithPayment).not.toBeInTheDocument();
      expect(showResult?.textContent).toBe('Monthly Payment: $350.75');

      // Test case 2: When payment is empty, no-result should be displayed
      const { container: containerWithoutPayment } = render(<Results payment="" />);
      const noResult = containerWithoutPayment.querySelector('.no-result');
      const showResultWithoutPayment = containerWithoutPayment.querySelector('.show-result');
      
      // Assert that no-result exists and show-result does not
      expect(noResult).toBeInTheDocument();
      expect(showResultWithoutPayment).not.toBeInTheDocument();

      // If neither element exists, throw an error
      if(!showResult && !noResult){
        throw new Error('No element found.');
      }
    })
});
