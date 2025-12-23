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
}) });
