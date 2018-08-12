const wrapper = document.querySelector('.wrapper');
const loader = document.querySelector('.loader');

// Listen when page is loaded and remove loader and add animations
window.addEventListener("load", function(){
    console.log('asd')
    wrapper.classList.add('loaded');
    loader.classList.add('loader-finished');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});