import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

const server = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const App: React.FC = () => {
  const [changedForm, setChangedForm] = useState<boolean>(false);
  const [invalidForm, setInvalidForm] = useState<boolean>(true);
  const [validCreditCard, setValidCreditCard] = useState<boolean | null>(null);

  const { formState: { errors, isDirty }, getValues, register, reset, watch } = useForm({
    reValidateMode: "onSubmit"
  });

  // see README for an explanation on why I need the explicit validity check, custom onChange, & useEffect
  const invalidFormInput = () => {
    const creditCard = getValues("creditCard");
    return !creditCard || creditCard.toString().length < 15 || creditCard.toString().length > 16;
  }

  const onChangeAttemptToHandleNonDigits = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].some(char => e.target.value.toString().includes(char))) {
      e.preventDefault();
      let eChanged = e;
      eChanged.target.value.replace(/[^0-9]/g, '');
      onChange(eChanged);
    } else {
      onChange(e);
    }
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // console.log(value, name, type) // debug every form input change
      setInvalidForm(invalidFormInput() || !!errors["creditCard"]);
      setChangedForm(isDirty); // not sure why isDirty isn't just working without local state
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const { onChange, ...rest } = register("creditCard", {
    required: true,
    minLength: 15,
    maxLength: 16,
    pattern: /^\d+$/,
    // valueAsNumber: true,
  });

  const validateCreditCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiResponse = await fetch(`${server}/api/validateCreditCard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creditCard: getValues("creditCard") }),
      });
      const response = await apiResponse.json();
      setValidCreditCard(response.isValid);
      setChangedForm(isDirty);
      reset({ creditCard: "", }, { keepValues: true, keepIsValid: true });
    } catch (error) {
      console.error('Error validating credit card number:', error);
    }
  };

  return (
    <div className="p-10 min-h-screen">
      <form onSubmit={validateCreditCard}>
        <input
          className="block mb-4 w-full bg-transparent outline-none border-b-2 px-3 py-2 tracking-wider placeholder-gray-400 text-gray-900 border-gray-400"
          placeholder="Credit card number"
          type="number"
          onChange={onChangeAttemptToHandleNonDigits}
          {...rest}
        />
        <button
          className="inline-block rounded shadow px-5 py-2 bg-blue-500 text-white font-bold disabled:bg-slate-300 disabled:text-slate-200 disabled:border-slate-200"
          disabled={invalidForm}
          type="submit"
        >
          Validate
        </button>
        {validCreditCard !== null && changedForm && (
          <div className={`my-5 px-5 py-2 w-fit rounded shadow text-white font-bold ${validCreditCard ? 'bg-green-600' : 'bg-red-600'}`}>
            {validCreditCard ? 'Valid' : 'Invalid'} credit card number
          </div>
        )}
      </form>
    </div>
  );
};

export default App;