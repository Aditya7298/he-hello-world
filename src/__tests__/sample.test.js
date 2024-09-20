const { countUniqueLibraries } = require('./index.js');

// Sample test cases
test('Test Case 1', () => {
  const dependencies = {
    app: '^1.0.0',
  };

  const availableVersions = {
    app: ['1.0.0', '1.0.1', '1.1.0', '2.0.0'],
    libA: ['1.0.0', '1.1.0', '2.0.0'],
  };

  const libDependencies = {
    app: {
      '1.0.0': { libA: '~1.0.0' },
      '1.1.0': { libA: '^1.0.0' },
    },
    libA: {
      '1.0.0': {},
      '1.1.0': {},
    },
  };

  expect(
    countUniqueLibraries(dependencies, availableVersions, libDependencies)
  ).toBe(2);
});

test('Test Case 2', () => {
  const dependencies = {
    app: '1.0.0',
  };

  const availableVersions = {
    app: ['1.0.0', '2.0.0'],
  };

  const libDependencies = {
    app: {
      '1.0.0': {},
    },
  };

  expect(
    countUniqueLibraries(dependencies, availableVersions, libDependencies)
  ).toBe(1);
});
