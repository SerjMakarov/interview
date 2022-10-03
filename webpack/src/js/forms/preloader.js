let mainGenerated = document.querySelector('.main')
let mainHeight = mainGenerated.offsetHeight
let preloadGenerated = document.querySelector('.preloader')
let preloadHeight = document.querySelector('.preloader').style.height = mainHeight + 'px'
console.log(mainHeight);
console.log(preloadHeight);
