const browserSync = require('browser-sync').create();

browserSync.init({
  proxy: 'https://localhost:3000',
  files: ['public/**/*.*'],
  port: 3001,
  logLevel: 'silent',
  ui: false,
  notify: false
});