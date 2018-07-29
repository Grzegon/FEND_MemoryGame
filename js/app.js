/*
 * Create a list that holds all of your cards
 */
const cardsList = [
    'far fa-gem',
    'far fa-paper-plane',
    'fas fa-anchor',
    'fas fa-bolt',
    'fas fa-cubes',
    'fas fa-anchor',
    'fas fa-leaf',
    'fas fa-bicycle',
    'far fa-gem',
    'fas fa-bomb',
    'fas fa-leaf',
    'fas fa-bomb',
    'fas fa-bolt',
    'fas fa-bicycle',
    'far fa-paper-plane',
    'fas fa-cubes'
];
// Get elements from document
const deck = document.querySelector('.deck');
const counter = document.querySelectorAll('.moves');
const restart = document.querySelector('.restart');
const stars = document.querySelectorAll('.stars');
const modal = document.querySelector('.modal');
const timer = document.querySelectorAll('.timer');
let opened = [];
let matched = [];
let steps = 0;
let seconds = 0;
let minutes = 0;
let t;

/**
 * Listen for click on restart button to start game again
 */
restart.addEventListener('click', event => {
    event.preventDefault();
    restartGame();
})

const restartGame = () => {
    clearInterval(t);
    timer[0].textContent = '00:00';
    deck.innerHTML = '';
    stars.forEach(element => {
        element.innerHTML = '';
    })
    steps = 0;
    matched = [];
    opened = [];
    seconds = 0;
    minutes = 0;

    startGame();
}

/**
 * Renders deck for new game
 */
const startGame = () => {
    const shuffled = shuffle(cardsList);
    counter.forEach(element => {
        element.innerHTML = steps;
    })

    for (let i = 0; i < 3; i++) {
        stars.forEach(element => {
            const star = document.createElement('li');

            star.innerHTML = "<i class='fas fa-star'></i>";
            element.appendChild(star);
        })
    }

    for (let i = 0; i < shuffled.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = "<i class='" + shuffled[i] + "'></i>";
        deck.appendChild(card);
        /**
        * Listen for click on card to open it
        */
        card.addEventListener('click', event => {
            event.preventDefault();
            openCard(card);
        })
    }
}

/**
 * Open card and if its second one, check if both cards match 
 * 
 * @param {Element} card 
 */
const openCard = (card) => {
    if (opened.length === 1) { // If one card is open
        card.classList.add('open', 'show', 'disable');
        opened.push(card);
        checkMatch(card, opened[0]);
    } else if (opened.length < 2) { // Prevent from fast opening three cards
        card.classList.add('open', 'show', 'disable');
        startTimer();
        opened.push(card);
    }
}

/**
 * Check if cards match
 * 
 * @param {Element} currentCard 
 * @param {Element} previousCard 
 */
const checkMatch = (currentCard, previousCard) => {
    countSteps();

    if (currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add('match');
        previousCard.classList.add('match');
        // Clear opened array
        opened = [];
        matched.push(currentCard, previousCard);
        // Check if game should end
        gameOver();

    } else {
        setTimeout(() => {
            currentCard.classList.remove('open', 'show', 'disable');
            previousCard.classList.remove('open', 'show', 'disable');

            opened = [];
        }, 400)
    }
}

/**
 * Shuffle function from http://stackoverflow.com/a/2450976
 * 
 * @param {array} array 
 */
const shuffle = array => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Check if game is over
 */
const gameOver = () => {
    if (matched.length === cardsList.length) {
        clearInterval(t);
        setTimeout(() => {
            renderModal();
        }, 400)
    }
}

/**
 * Increase number of steps
 */
const countSteps = () => {
    steps++;
    counter.forEach(element => {
        element.innerHTML = steps;
    })
    rateGame(steps);
}

const renderModal = () => {
    const restart = document.querySelector('.modal-restartGame');

    modal.style.display = "grid";
    timer[1].textContent =
        (minutes < 10 ? '0' + minutes.toString() : minutes) +
        ':' +
        (seconds < 10 ? '0' + seconds.toString() : seconds)

    restart.addEventListener('click', event => {
        event.preventDefault();
        modal.style.display = "none";
        restartGame();
    })
}

const rateGame = (steps) => {
    if (steps > 10 && steps < 15) {
        stars.forEach(element => {
            element.children[2].children[0].classList.replace('fas', 'far');
        })
    } else if (steps > 15 && steps < 20) {
        stars.forEach(element => {
            element.children[1].children[0].classList.replace('fas', 'far');
        })
    } else if (steps > 20) {
        stars.forEach(element => {
            element.children[0].children[0].classList.replace('fas', 'far');
        })
    }
}

const startTimer = () => {
    clearInterval(t)
    t = setInterval(function () {
        seconds++

        if (seconds === 60) {
            seconds = 0
            minutes++
            if (minutes === 60) {
                minutes = 0
                seconds = 0
            }
        }
        timer[0].textContent =
            (minutes < 10 ? '0' + minutes.toString() : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds.toString() : seconds)
    }, 1000)
}

startGame();
