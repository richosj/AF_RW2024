import gulp from 'gulp';
import plumber from 'gulp-plumber';
import del from 'del';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import postCss from 'gulp-postcss';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import fileInclude from 'gulp-file-include';
//import newer from 'gulp-newer';
import babelify from 'babelify';
import bro from 'gulp-bro';
import minify from 'gulp-minify';
import cssnano from 'cssnano';
import cached from 'gulp-cached';


const browserSyncInstance = browserSync.create();

const src = './src';
const dist = './dist';
const ass = '/assets';

const path_src = {
  html: src + '/html',
  css: src + ass + '/css',
  images: src + ass + '/images',
  js: src + ass + '/js',
  fonts: src + ass + '/fonts'
};

const path_dist = {
  html: dist,
  css: dist + ass + '/css',
  images: dist + ass + '/images',
  js: dist + ass + '/js',
  fonts: dist + ass + '/fonts'
};

// Error handler
const onErrorHandler = function(error) {
  console.log(error.toString());
  this.emit('end');
};

const clean = () => del([dist], { allowEmpty: true });

const html = () => {
  return gulp.src([
    path_src.html + '/**/*.html',
    '!' + path_src.html + '/**/_*',
    '!' + path_src.html + '/**/_*/**/*',
    '!' + path_src.html + '/include/**'
  ])
  .pipe(plumber({ errorHandler: onErrorHandler }))
  .pipe(fileInclude({ prefix: '@@', basepath: '@file', context : {
    page_main : false,
    page_name : "회사소개"
  } })) 
  .pipe( cached('html') )
  .pipe(gulp.dest(path_dist.html))
  .pipe(browserSyncInstance.stream());
};

const sassOptions = {
  scss: {
    outputStyle: 'expanded',
    indentType: 'tab',
    indentWidth: 4,
    precision: 8,
    sourceComments: true,
  },
  postcss: [autoprefixer({ overrideBrowserslist: 'last 2 versions' }), cssnano()]
};

const css = () => {
  const sassCompiler = gulpSass(sass);
  return gulp.src([path_src.css + '/index.scss'], { allowEmpty: true })
    .pipe(plumber({ errorHandler: onErrorHandler }))
    //.pipe(cached('css'))
    .pipe(browserSyncInstance.stream())
    .pipe(sourcemaps.init())
    .pipe(sassCompiler(sassOptions.scss).on('error', sassCompiler.logError))
    .pipe(postCss(sassOptions.postcss))
    .pipe(rename('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path_dist.css))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path_dist.css))
};

const cssReset = () => {
  const sassCompiler = gulpSass(sass);
  return gulp.src([path_src.css + '/reset.scss'], { allowEmpty: true })
    .pipe(plumber({ errorHandler: onErrorHandler }))
    .pipe(sourcemaps.init())
    .pipe(sassCompiler(sassOptions.scss).on('error', sassCompiler.logError))
    .pipe(postCss(sassOptions.postcss))
    .pipe(rename('reset.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path_dist.css));
};



const js = () => {
  return gulp.src([
    path_src.js + '/**/*.js',
    '!' + path_src.js + '/vendor/**',
    '!' + path_src.js + '/main.js'
  ])
  .pipe(plumber({ errorHandler: onErrorHandler }))
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(bro({
    transform: [
      babelify.configure({ presets: ['@babel/preset-env'] })
      //,
      //['uglifyify', { global: true }]
    ]
  }))
  .pipe(concat('all.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(minify({ ext: { min: '.min.js' }, ignoreFiles: ['-min.js'] }))
  .pipe(gulp.dest(path_dist.js))
  .pipe(browserSyncInstance.stream());
};

const vendors = () => {
  return gulp.src(path_src.js + '/vendor/**')
  .pipe(gulp.dest(path_dist.js + '/vendor'));
}

const fonts = () => {
  return gulp.src(path_src.fonts + '/**/*')
  .pipe(gulp.dest(path_dist.fonts))
  .pipe(browserSyncInstance.stream());
};

const webserver = () => {
  return browserSyncInstance.init({
    port: 8080,
    notify: true,
    reloadDelay: 50,
    server: {
      baseDir: "./dist/"
    },
    files: [path_dist.css + '/**/*.css'] // Ensure BrowserSync watches for CSS changes
  });
};

const copyImages = () => {
  return gulp.src(path_src.images + "/**/*.{jpg,jpeg,png,gif,svg,png}")
    .pipe(plumber({ errorHandler: onErrorHandler }))
    .pipe(gulp.dest(path_dist.images))
    .on('end', () => log('Images copied successfully.'))
    .on('error', (err) => log.error('Error copying images:', err));
};

const watch = () => {
  gulp.watch([path_src.css + "/**/*.scss"], css);
  gulp.watch([path_src.js + "/**/*.js"], js);
  gulp.watch([path_src.html + "/**/*.html"], html);
  //gulp.watch([path_src.images + "/**/*"], copyImages);
};

const live = gulp.parallel(webserver, watch);

export const cleans = gulp.series(clean);
export const build = gulp.series(gulp.parallel(html, css, cssReset, js, fonts , vendors));
export const dev = gulp.series(build, live);
