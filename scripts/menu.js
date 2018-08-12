const credits = document.querySelector('#credits');
const creditWindow = document.querySelector('.creditWindow');
const remove = document.querySelector('.remove');
const mute = document.querySelector('.mute');
const button = document.querySelectorAll('button');

var audio = new Audio('./audio/main-menu-sound.mp3');

button.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        var audio = new Audio('./audio/main-menu-hover.mp3');
        audio.play();
    })
})


credits.addEventListener('click', () => {
    creditWindow.classList.add('openedWindow');
})

remove.addEventListener('click', () => {
    creditWindow.classList.remove('openedWindow');
})

window.addEventListener("load", function(){
    audio.play();
});

mute.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
})
