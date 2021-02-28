module.exports = {
  plugins: ['@snowpack/plugin-svelte'],
  mount: {
    public: '/public',
    src: '/src',
    pkg: '/pkg',
  },
  optimize: {
    minify: true,
  },
  devOptions: {
    hmr: false,
  }
}
