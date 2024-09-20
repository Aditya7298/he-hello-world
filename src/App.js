import React, { useState, useRef, useEffect } from 'react';
import JSONEditor from 'jsoneditor';
import defaultInput from './defaultInput';
import 'jsoneditor/dist/jsoneditor.css';

function semverMatches(version, constraint) {
  if (!constraint.includes('^') && !constraint.includes('~')) {
    return version === constraint;
  }

  const [major, minor, patch] = version.split('.').map(Number);
  const [cMajor, cMinor, cPatch] = constraint.slice(1).split('.').map(Number);

  if (constraint.startsWith('^')) {
    return (
      major === cMajor &&
      (minor > cMinor || (minor === cMinor && patch >= cPatch))
    );
  } else if (constraint.startsWith('~')) {
    return major === cMajor && minor === cMinor && patch >= cPatch;
  }
  return false;
}

function getHighestVersion(available, constraint) {
  for (let i = available.length - 1; i >= 0; i--) {
    if (semverMatches(available[i], constraint)) {
      return available[i];
    }
  }
  return null;
}

export function countUniqueLibraries(
  dependencies,
  availableVersions,
  libDependencies
) {
  const installed = new Set();

  function resolveLibrary(lib, constraint) {
    const available = availableVersions[lib];
    const version = getHighestVersion(available, constraint);
    if (!version || installed.has(`${lib}@${version}`)) return;

    installed.add(`${lib}@${version}`);

    const deps = (libDependencies[lib] && libDependencies[lib][version]) || {};
    for (const [depLib, depConstraint] of Object.entries(deps)) {
      resolveLibrary(depLib, depConstraint);
    }
  }

  for (const [lib, constraint] of Object.entries(dependencies)) {
    resolveLibrary(lib, constraint);
  }

  return installed.size;
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

    console.log(
      availableVersions,
      dependencies,
      libDependencies,
      countUniqueLibraries(dependencies, availableVersions, libDependencies)
    );
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
