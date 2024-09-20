const DATA = {
  dependencies: {
    libA: '^1.0.0',
  },
  availableVersions: {
    libA: ['1.0.0', '1.0.1', '1.1.0', '2.0.0'],
    libB: ['1.0.0', '1.0.1', '1.1.0', '2.0.0'],
    libC: ['1.0.0', '1.0.1'],
  },
  libDependencies: {
    libA: {
      '1.0.0': {
        libB: '^1.0.0',
      },
      '1.1.0': {
        libB: '~1.0.0',
        libC: '~1.0.0',
      },
    },
    libB: {
      '1.0.0': {},
      '1.1.0': {},
      '1.0.1': {
        libC: '1.0.0',
      },
    },
  },
};

export default DATA;
