# Credit Card Validator

A take-home interview assessment for an unnamed company.

[https://julietkb.github.io/credit-card-validator/](https://julietkb.github.io/credit-card-validator/)

## Running locally

In a terminal, navigate to the `api` directory and run `npm i` to install dependencies & `npm run start` to start the API server (on port 3001). Then, navigate back to the root directory and run `npm i` to install dependencies & `npm start` to start the client.


## Notes

I spent time on this 11/26 but couldn't get the node stuff working, so I scrapped and started over 12/1.


## Areas of Improvement

- I was having some issued getting React Hook Form to play nice with number only inputs, and unfortunately it still allows `e`, `+`, and `-` in the input
  - I tried to make my own `onChange` handler that plugs into the library's `onChange` and replace `e` and other valid-number-input characters like `+` and `-`, but it wasn't working. Ideally, React Hook Form's `register` function would work correctly with a regex pattern that only allows 15 or 16 digits, and I wouldn't have to specify the input `type='number'` or write my own `onChange`.
- Because of the issues above with React Hook Form, I had to write my own method `invalidFormInput` for enabling/disabling form submit. Ideally I wouldn't have to write this method.
- Also, because of this, I need to update the validity of the form in local state via watching the React Hook Form field values in a `useEffect` which can hinder performance.

## Prompt

### Technical Requirements
- Use React, node.js and typescript for your application
- Authentication and DB are not needed

### Functional Requirements
- The main purpose of this application is to create a webpage to validate a Credit Card number
- Use the Luhn checksum algorithm for validation
- Validation should happen in the back-end (API) not the frontend

### Minimal UI Requirements
- At least one text box should be included for credit card input
- Screen should display if the number is valid or not
