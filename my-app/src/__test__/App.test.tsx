// Import the render function from React Testing Library for rendering components
import { render } from '@testing-library/react';
// Import the App component to be tested
import App from '../App';

// Describe block groups all tests related to the App component
describe('App Component', () => {
  // Test that verifies the App component renders successfully
  it('renders the App component', () => {
    // Render the App component and get access to the DOM container
    const { container } = render(<App />);
    
    // Query the DOM for the section element that should be rendered
    const section = container.querySelector('section');
    
    // Assert that the section element exists in the document
    expect(section).toBeInTheDocument();
  });
});
