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
const counter = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const stars = document.querySelector('.stars');
let opened = [];
let matched = [];
let steps = 0;

/**
 * Listen for click on card to open it
 */
deck.addEventListener('click', event => {
    event.preventDefault();
    openCard(event.target);
})

/**
 * Listen for click on restart button to start game again
 */
restart.addEventListener('click', event => {
    event.preventDefault();
    deck.innerHTML = '';
    stars.innerHTML = '';
    steps = 0;
    matched = [];
    opened = [];

    startGame();
})

/**
 * Renders deck for new game
 */
const startGame = () => {
    const shuffled = shuffle(cardsList);
    counter.innerHTML = steps;

    for(let i=0; i<3;i++){
        const star = document.createElement('li');
        star.innerHTML = "<i class='fas fa-star'></i>";
        stars.appendChild(star);
    }

    for (let i = 0; i < shuffled.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = "<i class='" + shuffled[i] + "'></i>";
        deck.appendChild(card);
    }
}

/**
 * Open card and if its second one, check if both cards match 
 * 
 * @param {Element} card 
 */
const openCard = (card) => {
    if (opened.length === 1) { // If one card is open
        card.classList.add('open', 'show');
        opened.push(card);
        checkMatch(card, opened[0]);
    } else if (opened.length < 2) { // Prevent from fast opening three cards
        card.classList.add('open', 'show');
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
            currentCard.classList.remove('open', 'show');
            previousCard.classList.remove('open', 'show');

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
        setTimeout(() => {
            alert('YOU WON!');
        }, 400)
    }
}

/**
 * Increase number of steps
 */
const countSteps = () => {
    steps++;
    counter.innerHTML = steps;
    rateGame(steps);
}

const rateGame = (steps) => {
    console.log('rate');
    if (steps > 10 && steps < 15) {
        console.log('rate less');
        stars.children[2].children[0].classList.replace('fas', 'far');
        console.log(stars.children[2].children[0]);
    } else if (steps > 15 && steps < 20) {
        stars.children[1].children[0].classList.replace('fas', 'far');
    } else if (steps > 20) {
        stars.children[0].children[0].classList.replace('fas', 'far');
    }
}

startGame();
