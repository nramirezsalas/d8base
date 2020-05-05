// Variables
const browserSync_page = 'index.html'; // archivo inicial
const libraries_css = [
  './node_modules/bootstrap/dist/css/bootstrap.min.css',
  './node_modules/@fortawesome/fontawesome-free/css/all.css',
  './node_modules/owl.carousel/dist/assets/owl.carousel.css',
  './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
  './node_modules/aos/dist/aos.css'
];
const jquery_src = './node_modules/jquery/dist/jquery.js';
const libraries_js = [
  './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', // bootstrap.js + popper.js
  './node_modules/owl.carousel/dist/owl.carousel.min.js',
  './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
  './node_modules/aos/dist/aos.js'
];

// Gulp
const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  pug = require('gulp-pug');

const root = './',
  source_css = root + 'src/scss/',
  public_css = root + 'public/css/',
  source_js = root + 'src/js/',
  public_js = root + 'public/js/',
  source_pug = root + 'src/pug/pages/',
  public_pug = root + 'public/',
  source_pug_components = root + 'src/pug/pages/components/',
  public_pug_components = root + 'public/components/';

const watch_file_html = root + 'public/*.html';
const watch_file_pug = root + 'src/pug/**/*.pug';
const watch_file_pug_components = root + 'src/pug/**/*/*.pug';
const watch_file_js = source_js + 'app.js';
const watch_file_css = source_css + '*.scss';

function builder_css_libraries() {
  return gulp.src(libraries_css)
    .pipe(concat('libraries.min.css'))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(public_css));
}
function builder_css_bootstrap() {
  return gulp.src(source_css + 'bootstrap.scss', { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat('bootstrap.css'))
    .pipe(gulp.dest(public_css, { sourcemaps: '.' }));
}
function builder_css_app() {
  return gulp.src(source_css + '*.scss', { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    //.pipe(concat('app.min.css'))
    .pipe(gulp.dest(public_css, { sourcemaps: '.' }));
}

function builder_js_jquery() {
  return gulp.src(jquery_src, { sourcemaps: true })
    .pipe(concat('jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(public_js));
}
function builder_js_libraries() {
  return gulp.src(libraries_js)
    .pipe(concat('libraries.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(public_js));
}
function builder_js_app() {
  return gulp.src(source_js + 'app.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(public_js));
}

function builder_pug() {
  return gulp.src(source_pug + '*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(public_pug));
}

function watch() {
  browserSync.init({
    open: 'external',
    server: {
      baseDir: "./public/",
      index: browserSync_page
    }
  });
  gulp.watch(watch_file_pug, builder_pug);
  gulp.watch(watch_file_css, builder_css_app);
  gulp.watch(watch_file_js, builder_js_app);
  gulp.watch([
    watch_file_html,
    public_js + '*.js',
    public_css + '*.css'
  ]).on('change', reload);
}

exports.builder_pug = builder_pug;
exports.builder_css_app = builder_css_app;
exports.builder_css_bootstrap = builder_css_bootstrap;
exports.builder_js_app = builder_js_app;
exports.watch = watch;

// tareas independientes
gulp.task('css-libraries', builder_css_libraries); // compila librerias css + bootstrap css
gulp.task('css-bootstrap', builder_css_bootstrap); // compila bootstrap
gulp.task('css-app', builder_css_app); // compila css custom

gulp.task('js-jquery', builder_js_jquery); // copia jquery última versión
gulp.task('js-libraries', builder_js_libraries); // compila librerias - no incluye jQuery
gulp.task('js-app', builder_js_app);

gulp.task('pug', builder_pug);

// task default
const build = gulp.series(watch);
gulp.task('default', build);
