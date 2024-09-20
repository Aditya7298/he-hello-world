import React, { useState, useRef, useEffect } from 'react';
import JSONEditor from 'jsoneditor';
import defaultInput from './defaultInput';
import 'jsoneditor/dist/jsoneditor.css';

export function countUniqueLibraries(
  dependencies,
  availableVersions,
  libDependencies
) {
  //complete this function
  return 0;
}

export default function App() {
  const [output, setOutput] = useState(null);

  const containerRef = useRef(null);
  const jsonEditor = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      jsonEditor.current = new JSONEditor(containerRef.current, {
        mode: 'code',
      });
      jsonEditor.current.set(defaultInput);
    }

    return () => {
      if (jsonEditor.current) {
        jsonEditor.current.destroy();
      }
    };
  }, []);

  const handleSubmit = () => {
    const { availableVersions, dependencies, libDependencies } =
      jsonEditor.current.get();

    setOutput(
      countUniqueLibraries(dependencies, availableVersions, libDependencies)
    );
  };

  return (
    <div className="flex flex-col my-auto px-10 pt-10 gap-3">
      <div>
        <div className="font-medium pb-3">Enter Test Input below :</div>
        <div className="pb-3">
          <div ref={containerRef} style={{ width: '100%', height: '400px' }} />
        </div>
        <div className="pb-3 font-medium">
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
    </div>
  );
}
