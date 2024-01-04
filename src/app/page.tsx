'use client'
import { useState } from 'react';

const NumberInput = () => {
  const [output, setOutput] = useState('');
  const [message, setMessage] = useState('');

  function reduceToNonZero(A: number[]): [number, number] {
    let xorResult: number = 0;

    // Calculate the XOR of all elements in the array
    for (let i = 0; i < A.length; i++) {
      xorResult ^= A[i];
    }

    // If the XOR of all elements is already non-zero, return the index of any element and convert it to 0
    if (xorResult !== 0) {
      for (let i = 0; i < A.length; ++i) {
        if ((A[i] ^ xorResult) < A[i]) {
          return [i, A[i] ^ xorResult];
        }
      }
    }

    // If XOR of all elements is zero, return the index of the first element and convert it to 1
    for (let i = 0; i < A.length; ++i) {
      if (A[i] > 0 && A[i]!=1) {
        return [i, 1];
      }
    }

    // If all elements are already 0, return any index and 0
    return [0, A[0]];
  }

  const calculate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numbers=event.target.value;
    const numbersArray = numbers.split(',').map(Number);
    const k: [number, number] = reduceToNonZero(numbersArray);
    
    let ans: number[] = [];
    for (let i = 0; i < numbersArray.length; i++) {
      if (k[0] === i) {
        ans.push(k[1]);
    } else {
      ans.push(numbersArray[i]);
    }
  }

  let s: string = "";
  let message:string ="";

  if(numbersArray.length===0){
    message="Invalid Input";
  }
  
  let count:number=0;
  for (let i = 0; i < ans.length; i++) {
    if(ans[i]===numbersArray[i]){
      count++;
    }

    if(ans[i])
      s += ans[i].toString();

    if (ans[i] && i !== ans.length - 1)
      s += ", ";

    if(Number.isNaN(numbersArray[i]) || numbersArray[i]<0){
      message="Invalid Input";
      break;
    }
  }

  if(s=="" && !message.length){
    message="Congratulations, you won!";
  }

  if((count===numbersArray.length || s===", ") && !message.length){
    message="You can never win";
  }

    setMessage(message);
    setOutput(s);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-red-200 border-8 border-red-600">
        <h1 className="text-5xl text-green-600 text-center font-bold mb-4 animate-bounce absolute md:top-20 top-14">Play My Game</h1>
        <div className="bg-green-300 flex flex-col gap-20 md:gap-40 items-center p-8 rounded-lg shadow-md w-3/4 md:w-1/2 h-1/2">
          <div className="">
            <div className="md:flex gap-2">
              <label className="my-auto md:text-nowrap font-medium text-red-400">
                Enter numbers (comma-separated):
              </label>
              <input
                type="text"
                onChange={calculate}
                className="block w-full border-gray-300 rounded-md p-2 focus:outline-none mt-2 md:mt-0"
                placeholder="e.g. 1, 2, 3, 4"
              />
            </div>
          </div>
          <div className="md:text-3xl text-2xl font-bold text-red-400">
          {message.length>0 ? <div className="">{message}</div> : output.length>0 ? <div className="">My Numbers: <span className="text-red-600">{output}</span></div>: ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default NumberInput;
