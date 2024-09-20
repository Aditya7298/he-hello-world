import React, { useState } from 'react';
import defaultInput from './defaultInput';
import { countUniqueLibraries } from './countUniqueLibraries';

export default function App() {
  const [output, setOutput] = useState(null);
  const [input, setInput] = useState(
    JSON.stringify(defaultInput, undefined, 4)
  );

  const handleSubmit = () => {
    const { availableVersions, dependencies, libDependencies } =
      JSON.parse(input);

    setOutput(
      countUniqueLibraries(dependencies, availableVersions, libDependencies)
    );
  };

  return (
    <div
      style={{ height: '100vh' }}
      className="flex flex-col my-auto px-10 py-5 gap-5"
    >
      <div className="font-medium">
        Note: complete this function{' '}
        <pre className="inline">countUniqueLibraries</pre> and do NOT make
        changes anywhere else
      </div>
      <div className="font-medium">Enter Test Input below :</div>
      <textarea
        className="border-2 p-4 h-3/4 rounded border-slate-300 border-solid"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="font-medium">
        Output:{' '}
        {output !== null ? output : 'Press Test button to generate output'}
      </div>
      <button
        onClick={handleSubmit}
        className="flex-none h-fit self-end rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Test
      </button>
    </div>
  );
}
