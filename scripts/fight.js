const player = document.querySelector('.player img');
const bot = document.querySelector('.bot img');

const playerHealthBar = document.querySelector('.player-health');
const botHealthBar = document.querySelector('.bot-health');

const btn = document.querySelector('#spin');
const spinnerInner = document.querySelector('.spinner-inner');
const spinner = document.querySelector('.spinner');

const msg = document.querySelector('.msg');

var playerHealth = 100;
var botHealth = 100;
var animationDuration = 3000;
var numberOfItemsToScroll = 100;

function spin(whoPlays) {
    spinnerInner.style.transition = animationDuration + 'ms';
    var min = 2500;
    var max = 4500;
    var distance = Math.floor(Math.random() * (max - min + 1)) + min;

    spinnerInner
        .style
        .transform = `translateX(-${distance}px)`;

    btn.disabled = true;
    randomOrder(distance, whoPlays);
}

function randomOrder(distance, whoPlays) {

    var list = [];
    const numbers = [2, 5, 6, 3, 6, 3, 3, 3, 4, 1, 4, 1, 4, 1, 4, 4, 4, 4, 4, 4];
    // GRAY are 4 and 1
    // BLUE are 6 and 3
    // GOLD are 2 and 5
    
    while (spinnerInner.firstChild) {
        spinnerInner.removeChild(spinnerInner.firstChild);
    }

    for(var i = 1; i < numberOfItemsToScroll; i++) {
        const result = numbers[Math.floor(Math.random() * numbers.length)];
    
        var listItem = {index: i, num: result};
    
        // Filling array with list objects
        list.push(listItem);
    
        // Creating boxes
        var item = document.createElement('div');
        item.classList.add(`item`, `item${result}`);
        spinnerInner.appendChild(item);
    }

    // Number where it lands
    var winner = Math.floor(distance / 100 + 3);
    
    // Finding out the winning card in array
    var winnerItem = list.find(item => {
        return item.index === winner
    });
    
    // Styling selected box
    setTimeout(() => {
        const itemBox = spinnerInner.querySelectorAll('div');
        itemBox.forEach(item => {
            item.style.opacity = 0.4;
        });     
        itemBox[winnerItem.index - 1].style.opacity = 1;
    }, animationDuration);

    
    // All possible outcomes
    setTimeout(() => {
        switch(winnerItem.num) {
            case 1:
                heal(10, whoPlays, 'Small Heal');
                break;
            case 2:
                heal(35, whoPlays, 'Heavy Heal');
                break;
            case 3:
                hit(20, whoPlays, 'Medium Hit');
                break;
            case 4:
                hit(10, whoPlays, 'Weak Hit');
                break;
            case 5:
                hit(35, whoPlays, 'Hard Hit');
                break;
            case 6:
                heal(20, whoPlays, 'Medium Heal');
                break;
            default:
                console.log('Error in CASE expression');
        }
    }, animationDuration + 500);
}

function hit(strenght, whoPlays, mssg) {
    msg.innerHTML = mssg;
    setTimeout(() => {
        msg.innerHTML = ''
    }, 1500);
    if (whoPlays === 'Human') {
        if (strenght === 10 || strenght === 20) {
            player.src = './images/fighters/subzero/reg-attack.gif';
            setTimeout(() => {
                player.src = './images/fighters/subzero/stance.gif';
            }, 810);
        } else {
            player.src = './images/fighters/subzero/super-attack.gif';
            setTimeout(() => {
                player.src = './images/fighters/subzero/stance.gif';
            }, 860);
        }
    
        var hitSound = new Audio('./audio/sub-reg-attack.mp3');
        hitSound.play();
        hitSound.volume = 0.4;
    
        botHealth -= strenght;
        botHealthBar.style.width = botHealth + '%';
        setTimeout(() => {
            resetSpinner(); 
        }, 500);
        if (botHealth <= 0) {
            endGame('You Win');
        } else {
            setTimeout(() => {
                botPlays(); 
            }, 1000); // Time when bot start spinning after player 
        }
    } else if (whoPlays === 'Bot') {
        bot.src = './images/fighters/scorpion/reg-attack.gif';
        setTimeout(() => {
            bot.src = './images/fighters/scorpion/stance.gif';
            bot.style.marginBottom = 0;
        }, 600);

        var hitSound = new Audio('./audio/sub-reg-attack.mp3');
        hitSound.play();
        hitSound.volume = 0.4;
    
        playerHealth -= strenght;
        playerHealthBar.style.width = playerHealth + '%';
        if (playerHealth <= 0) {
            endGame('Bot Wins');
        } else {
            setTimeout(() => {
                resetSpinner(); 
                btn.disabled = false;
            }, 500);
        }
    }
}

function heal(amount, whoPlays, mssg) {
    msg.innerHTML = mssg;
    setTimeout(() => {
        msg.innerHTML = ''
    }, 1500);
    if (whoPlays === 'Human') {
        if(playerHealth < 91) {
            playerHealth += amount;
            playerHealthBar.style.width = playerHealth + '%';
        } else if(playerHealth > 91) {
            playerHealthBar.style.width = 100 + '%';
        }
        setTimeout(() => {
            resetSpinner(); 
        }, 500);
        setTimeout(() => {
            botPlays(); 
        }, 1000); // Time when bot start spinning after heal 
    } else {
        if(botHealth < 91) {
            botHealth += amount;
            botHealthBar.style.width = botHealth + '%';
        } else if(botHealth > 91) {
            botHealthBar.style.width = 100 + '%';
        }
        setTimeout(() => {
            resetSpinner(); 
            btn.disabled = false;
        }, 500);
    }

}

function botPlays() {
    spin('Bot');
}

function resetSpinner() {
    spinnerInner.style.transform = `translateX(0px)`;
    spinnerInner.style.transition = '1ms';
}

function endGame(msg) {
    const winMsg = document.querySelector('.msg');

    if (msg === 'Bot Wins') {
        playerHealthBar.style.width = 0 + '%';
        var hitSound = new Audio('./audio/scorpion-wins.mp3');
        hitSound.play();
    } else {
        botHealthBar.style.width = 0 + '%';
        var hitSound = new Audio('./audio/sub-wins.mp3');
        hitSound.play();
    }
    winMsg.innerHTML = msg;
    btn.disabled = true;
}

// Do stuff when page fully loads
window.addEventListener("load", () => {
    const fightSign = document.querySelector('.fightSign');

    var audio = new Audio('./audio/roundone-fight.mp3');
    audio.play();

    btn.disabled = true;

    setTimeout(() => {
        btn.disabled = false;
        fightSign.style.display = 'block';
        spinner.style.display = 'block';
        fightSign.classList.add('fade');
        spinner.classList.add('fade');

        var arenaAudio = new Audio('./audio/arena-bg.mp3');
        arenaAudio.play();
        arenaAudio.volume = 0.3;
        arenaAudio.loop = true;
    }, 2000);
});

// Spin wheel when clicked
btn.addEventListener('click', function(){spin('Human')});
