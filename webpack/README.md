
<h1>ДЛЯ КОРРЕКТНОЙ РАБОТЫ НЕОБХОДИМ NODE JS V 12.11.1 И NPM 6.11.3</h1>
<p align="center">
  <a href="https://webpack.js.org">
    <img alt="Webpack" src="https://img.shields.io/badge/webpack-v4.27.0-0072b8.svg"></a>
  <a href="http://getbootstrap.com/">
    <img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-v4.1.3-563d7c.svg"></a>
  <a href="https://sass-lang.com">
    <img alt="Sass" src="https://img.shields.io/badge/node--sass-v4.10.0-df5a9c.svg"></a>
  <a href="https://jquery.com/">
    <img alt="jQuery" src="https://img.shields.io/badge/jquery-v3.3.1-ffa200.svg"></a>
  <a href="">
    <img alt="Webpack Dev Server" src="https://img.shields.io/badge/webpack--dev--server-live--reloading-orange.svg"></a>
</p>

### Requirements
* Please make sure you have NodeJS installed, as this contains `npm`, which is necessary
for installing dependencies, starting the appropriate scripts, and building your web project.

### Quick Start

Install all packages and dependencies required for this project:

    npm install
    
Start the development environment (then, navigate to http://localhost:8080):

    npm start
 
Then, open a browser and navigate to: http://localhost:8080/ 
    
Building files can be done as follows:

    npm run build (production build /maxi2020/main.js)
    npm run build-dev (dev build /maxi2020/main.js)
    npm run build-neworder  (production build /maxi2020/neworder.js)
    npm run build-neworder-dev  (dev build /maxi2020/neworder.js)

### How To Use
* Add your HTML files by inserting or including them in the `src` directory (By default `index.html` is added to your `src` directory, feel free to edit it and 
experiment with the changes live.)
    
    * Make sure you restart development server after adding new HTML files

* Add images to your `src/assets` folder.
* Add sass (SCSS) files to `src/scss` folder.
  * Make sure you import the scss file in `main.scss` 
    
```sass
    @import "filename";
```

