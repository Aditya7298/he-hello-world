const { countUniqueLibraries } = require('../countUniqueLibraries');

test('Test Case 1', () => {
  const dependencies = {
    libX: '^2.1.0',
  };

  const availableVersions = {
    libX: ['2.1.0', '2.1.1', '2.2.0', '3.0.0'],
  };

  const libDependencies = {
    libX: {
      '2.1.0': {},
      '2.1.1': {},
      '2.2.0': {},
      '3.0.0': {},
    },
  };

  expect(
    countUniqueLibraries(dependencies, availableVersions, libDependencies)
  ).toBe(1);
});

test('Test Case 2', () => {
  const dependencies = {
    app: '^1.0.0',
  };

  const availableVersions = {
    app: ['1.0.0', '1.0.1', '1.1.0', '2.0.0'],
    libA: ['1.0.0', '1.0.1', '1.1.0'],
    libB: ['1.0.0', '1.0.1', '1.1.0'],
    libC: ['1.0.0'],
  };

  const libDependencies = {
    app: {
      '1.1.0': { libA: '^1.0.0' },
    },
    libA: {
      '1.0.0': { libB: '~1.0.0' },
      '1.0.1': { libB: '~1.0.0' },
      '1.1.0': { libB: '~1.0.0' },
    },
    libB: {
      '1.0.0': {},
      '1.0.1': {
        libC: '1.0.0',
      },
    },
  };

  expect(
    countUniqueLibraries(dependencies, availableVersions, libDependencies)
  ).toBe(4);
});

test('Test Case 3', () => {
  const dependencies = {
    libA: '1.0.0',
  };

  const availableVersions = {
    libA: ['1.0.0', '1.1.0', '2.0.0'],
    libB: ['1.0.0', '2.0.0'],
  };

  const libDependencies = {
    libA: {
      '1.0.0': { libB: '1.0.0' },
    },
    libB: {
      '1.0.0': {},
      '2.0.0': {},
    },
  };

  expect(
    countUniqueLibraries(dependencies, availableVersions, libDependencies)
  ).toBe(2);
});

test('Test Case 4', () => {
  const dependencies = {
    libA: '^1.0.0',
    libD: '~2.0.0',
  };

  const availableVersions = {
    libA: ['1.0.0', '1.1.0', '1.2.0', '2.0.0'],
    libB: ['1.0.0', '1.0.1', '1.1.0', '2.0.0'],
    libC: ['1.0.0', '1.0.1', '1.1.0'],
    libD: ['2.0.0', '2.0.1', '2.1.0'],
    libE: ['1.0.0', '1.1.0', '1.2.0'],
    libF: ['1.0.0', '1.1.0', '2.0.0'],
    libG: ['1.0.0', '1.1.0', '1.1.1'],
  };

  const libDependencies = {
    libA: {
      '1.0.0': { libB: '^1.0.0', libC: '~1.0.0' },
      '1.1.0': { libB: '~1.0.1' },
      '1.2.0': { libD: '^2.0.0' },
    },
    libB: {
      '1.0.0': { libE: '~1.0.0' },
      '1.1.0': { libF: '^1.0.0' },
    },
    libC: {
      '1.0.0': {},
      '1.0.1': { libE: '^1.1.0' },
      '1.1.0': { libG: '~1.0.0' },
    },
    libD: {
      '2.0.1': { libE: '~1.1.0' },
      '2.1.0': { libF: '^1.1.0' },
    },
    libE: {
      '1.0.0': {},
      '1.1.0': { libG: '~1.1.0' },
      '1.2.0': { libG: '~1.1.0' },
    },
    libF: {
      '1.1.0': {},
      '2.0.0': {},
    },
    libG: {
      '1.0.0': {},
      '1.1.0': {},
      '1.1.1': {},
    },
  };

  expect(
    countUniqueLibraries(dependencies, availableVersions, libDependencies)
  ).toBe(6);
});
