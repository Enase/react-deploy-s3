module.exports = {
  compact: true,
  plugins: [
    ['@babel/plugin-transform-runtime', {
      'regenerator': true
    }]
  ],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: '8.10'
        },
        shippedProposals: true,
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  ignore: [/node_modules/]
};
