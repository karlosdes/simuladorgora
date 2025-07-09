"use client";

import { useState } from "react";

function Mes() {
  let [contador, setContador] = useState(2);

  const sum = () => {
    setContador((prevContador) => Math.min(prevContador + 2, 20));
  };

  const subtraction = () => {
    setContador((prevContador) => Math.max(prevContador - 2, 4));
  };
  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-yellow-300 hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded-full m-5"
        onClick={subtraction}
      >
        -
      </button>

      <h3>{contador}</h3>
      <p className="ml-2">CUOTAS</p>

      <button
        className="bg-yellow-300 hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded-full m-5"
        onClick={sum}
      >
        +
      </button>
    </div>
  );
}

export default Mes;
