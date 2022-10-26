import { useEffect, useState } from "react";

export default function NewActivity({ addCallback }) {
  const [input, setInput] = useState("");
  return (
    <div className="flex w-full h-16 px-6 my-12 text-lg leading-tight text-gray-700 align-middle bg-white rounded shadow appearance-none focus:outline-none focus:shadow-outline">
      <form
        className="flex-1"
        onSubmit={(e) => {
          {
            addCallback(e, input, null);
            setInput("");
          }
        }}
      >
        <input
          className="w-full h-16 border-none focus:ring-0 outline-0 input "
          placeholder="What we gonna do?"
          type="text"
          maxLength="24"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
      </form>
    </div>
  );
}
