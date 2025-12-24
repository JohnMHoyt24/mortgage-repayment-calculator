# Frontend Mentor - Mortgage Repayment Calculator
A simple form with text input fields, two radio buttons, a button that clears the form, and a button that calculates monthly mortgage payments.

## Initial State
<img width="1378" height="636" alt="image" src="https://github.com/user-attachments/assets/f5d672e8-cabd-4998-8f02-8336c2d17b45" />

## Missing Values State
<img width="1385" height="611" alt="image" src="https://github.com/user-attachments/assets/bc97253a-70c7-421a-9ea1-9b761176a71d" />

## Invalid Number State
<img width="1323" height="601" alt="image" src="https://github.com/user-attachments/assets/f3825b6b-d434-4e4f-a8da-34b8782dc5d1" />

## Monthly Payment State
<img width="1343" height="626" alt="image" src="https://github.com/user-attachments/assets/e42b49db-799f-4e93-b4a5-8d79308be608" />

## John Hoyt
- Website - [John's World](https://johnmhoyt24.github.io/accessible-portfolio/))
- Frontend Mentor - @JohnHoyt24

## Technologies Used
- HTML
- JavaScript
- TypeScript
- Tailwind CSS
- React
- Flexbox
- Vite
- Jest

## What I Learned
- The importance of writing unit tests to ensure programs function as intended.
- The use of props when passing values from the parent component (Calculator) to the child component (Result)
  ```
   {/* Results section: displays calculated monthly payment */}
    <div className="p-0 w-1/2">
        <Results payment={paymentResult} />
    </div>
  ```
