// Import the render function from React Testing Library for rendering components
import { render } from '@testing-library/react';
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
}) });
