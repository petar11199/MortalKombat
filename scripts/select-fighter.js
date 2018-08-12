const mute = document.querySelector('.mute');
const button = document.querySelectorAll('.character');
const select = document.querySelector('.select');

var audio = new Audio('../audio/char-select-sound.mp3');
audio.loop = true;

button.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        var audio = new Audio('../audio/main-menu-hover.mp3');
        audio.play();
    })
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

function goToFight() {
    var clickAudio = new Audio('../audio/go-to-fight.mp3');
    clickAudio.play();
    audio.volume = 0.3;
    
    setTimeout(() => {
        window.location.href = "../fight.html";
    }, 3000);
}

select.addEventListener('click', goToFight);