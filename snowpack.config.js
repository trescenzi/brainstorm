module.exports = {
  mount: {/* ... */},
  plugins: ['@snowpack/plugin-svelte'],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  devOptions: {
    hmr: false,
  }
}
