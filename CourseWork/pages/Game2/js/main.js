let winSquare = [];
let arrOfSquare = [];
let arrOfCoordinates = [];
let indexWinSquare = 0;
const colors = ['green', 'blue', 'red', 'yellow', 'orange', 'BlueViolet', 'Cyan', 'DarkBlue'];

let oneSide = 3;
let score = 0;
let level = 1;
const numberOfSquares = 12;
const width = 25;
const numberOfTries = 4;
const attemptsToWin = 2;
let attemptsLeft = 0;
let attemptsLeftToWin = 1;
let maxSquares = Math.pow(oneSide, 2);
let currentName = null;
let timerInterval;
let goToTheNextLevel = false;

function init() {
    winSquare = [];
    arrOfSquare = [];
    arrOfCoordinates = [];
    for (let i = 0; i < maxSquares; i++) {
        winSquare.push(getRandomElement(colors));
    }
    for (let i = 0; i < numberOfSquares; i++) {
        let buffer = [];
        for (let i = 0; i < maxSquares; i++) {
            buffer.push(getRandomElement(colors));
        }
        arrOfSquare.push(buffer);
    }

    indexWinSquare = Math.floor(Math.random() * arrOfSquare.length);
    arrOfSquare[indexWinSquare] = winSquare;

    const top_row = document.querySelector('.top_row');
    const main_square = top_row.querySelector('.main_square');
    main_square.style.cursor = 'auto';
    main_square.style['grid-template-columns'] = `repeat(${oneSide}, 1fr)`;
    main_square.style.height = `${oneSide * width}px`;
    main_square.style.width = `${oneSide * width}px`;
    main_square.style.position = 'relative';

    const field_for_answer = document.querySelector('.field_for_answer');
    field_for_answer.style.height = `${oneSide * width + 15}px`;
    field_for_answer.style.width = `${oneSide * width + 15}px`;

    const listOfSquare = main_square.querySelectorAll('.mini_square');
    for (let i = 0; i < listOfSquare.length; i++) {
        listOfSquare[i].remove();
    }
    for (let i = 0; i < winSquare.length; i++) {
        const miniSquare = document.createElement('div');
        miniSquare.className = 'mini_square';
        miniSquare.style.background = winSquare[i];
        miniSquare.style.width = width + 'px';
        miniSquare.style.height = width + 'px';
        main_square.appendChild(miniSquare);
    }

    getInfoFromLocaleStorage();

    drawNumbers();
    drawProgressBar();
    drawAllSquare();
    startTimer(); // Запускаем таймер здесь
}


let timerElement = document.getElementById('timerDisplay'); // Получаем элемент таймера
let timeLeft = 60; // Время в секундах

function startTimer() {
    if (!timerInterval) { // Проверяем, что таймер еще не запущен
        timerInterval = setInterval(updateTimer, 1000); // Запускаем таймер с интервалом в 1 секунду
    }
}

function updateTimer() {
    timerElement.textContent = ` ${timeLeft} сек`; // Обновляем отображение времени
    if (timeLeft > 0) {
        timeLeft--; // Уменьшаем время, если оно больше нуля
    } else {
        clearInterval(timerInterval); // Останавливаем таймер
        handleTimerEnd(); // Выполняем действия по завершению времени
    }
}

function playLoseSound() {
    const loseSound = document.getElementById('loseSound');
    loseSound.play();
}

function handleTimerEnd() {
    timerInterval = null; // Сбрасываем переменную интервала таймера
    // Остальной код обработки завершения времени остается без изменений
    let nextLevelScore = Math.pow(3, level);
    if (score >= nextLevelScore) {
        nextLevelScore = Math.pow(3, level + 1);
        let message = `Время вышло!\nВы набрали ${score} очков. Вы победили, ваш уровень ${level}.\nНеобходимо будет набрать ${nextLevelScore} очков, ваше количетство очков ${score}.\nХотите начать новый уровень?`;
        let result = confirm(message);
        if (result) {
            goToTheNextLevel = true;
            level++;
            oneSide =  2 + level;
            maxSquares = Math.pow(oneSide, 2);
            attemptsLeftToWin = 1;
            init();
            timeLeft = 60;
            playWinSound();
            return;
        }
	else {
        // В этом блоке добавляем вызов функции playLoseSound, если пользователь не набрал нужное количество очков
        playLoseSound();}
    }
    


    const menuBtn = document.getElementById('menuBtn');
    const restartBtn = document.getElementById('restartBtn');
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    menuBtn.style.display = 'inline-block';
    restartBtn.style.display = 'inline-block';
    if (score >= nextLevelScore) {
        nextLevelBtn.style.display = 'inline-block';
    }

    let message = 'Время вышло!\nХотите попробовать ещё раз?';
    alert(message);
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function drawNumbers() {
    const left_number = document.querySelector('.left_number h1');
    left_number.innerHTML = score.toString();

    const right_number = document.querySelector('.right_number h1');
    right_number.innerHTML = attemptsLeft.toString();

    
    const level_number = document.querySelector('.level_number h1');
    level_number.innerHTML = level.toString();

}

function drawProgressBar() {
    const green_line = document.querySelector('.green_line');
    const red_line = document.querySelector('.red_line');
    const party = 100 / numberOfTries;
    green_line.style.width = `${100 - party * attemptsLeft}%`;
    red_line.style.width = `${party * attemptsLeft}%`;
}

function drawAllSquare() {
    const bottom_row = document.querySelector('.bottom_row');
    const arrayOfSquare = bottom_row.querySelectorAll('.main_square');
    for (let i = 0; i < arrayOfSquare.length; i++) {
        arrayOfSquare[i].remove();
    }
    const offsetTop = bottom_row.offsetTop + (oneSide * width);
    const offsetLeft = bottom_row.offsetLeft + (oneSide * width);
    const offsetHeight = bottom_row.offsetHeight - (oneSide * width);
    const offsetWidth = bottom_row.offsetWidth - (oneSide * width);

    for (let i = 0; i < arrOfSquare.length; i++) {
        const mainSquare = document.createElement('div');
        mainSquare.className = 'main_square';
        mainSquare.index = i;
        mainSquare.style['grid-template-columns'] = `repeat(${oneSide}, 1fr)`;
        const randomAngle = 90 * Math.floor(Math.random() * 4);
        mainSquare.style.transform = `rotate(${randomAngle}deg)`;
        mainSquare.angle = randomAngle;
        mainSquare.style.height = `${oneSide * width}px`;
        mainSquare.style.width = `${oneSide * width}px`;

        let x = randomIntFromInterval(offsetTop, offsetHeight);
        let y = randomIntFromInterval(offsetLeft, offsetWidth);

        while (arrOfCoordinates.filter(value => {
            return Math.abs(value.x - x) < ((oneSide * width) + 15) && Math.abs(value.y - y) < ((oneSide * width) + 15);
        }).length > 0) {
            x = randomIntFromInterval(offsetTop, offsetHeight);
            y = randomIntFromInterval(offsetLeft, offsetWidth);
        }

        arrOfCoordinates.push({x: x, y: y});
        mainSquare.style.top = x + 'px';
        mainSquare.style.left = y + 'px';

        const square = arrOfSquare[i];
        for (let j = 0; j < square.length; j++) {
            const miniSquare = document.createElement('div');
            miniSquare.className = 'mini_square';
            miniSquare.style.background = square[j];
            miniSquare.style.width = width + 'px';
            miniSquare.style.height = width + 'px';
            mainSquare.appendChild(miniSquare);
        }
        bottom_row.appendChild(mainSquare);
    }
}

function winAnimation() {
    const bottom_row = document.querySelector('.bottom_row');
    bottom_row.onmouseup = null;
    const arrayOfSquare = bottom_row.querySelectorAll('.main_square');
    arrayOfSquare[arrayOfSquare.length - 1].addEventListener('animationend', () => {
        score = score + Math.pow(3, level - 1);
        if (attemptsLeftToWin === attemptsToWin) {
           // increase();
            attemptsLeftToWin = 1;
        } else {
            attemptsLeftToWin++;
        }
        drawNameAndScore(currentName, score);
        init();
    });

    for (let i = 0; i < arrayOfSquare.length; i++) {
        arrayOfSquare[i].style.animation = 'rotate-animation 1s linear forwards';
    }
}

function playWinSound() {
    const winSound = document.getElementById('winSound');
    winSound.play();
}

function lose() {
    const bottom_row = document.querySelector('.bottom_row');
    bottom_row.onmouseup = null;
    if (attemptsLeft === numberOfTries - 1) {
        oneSide = 3;
        maxSquares = Math.pow(oneSide, 2);
        attemptsLeft = 0;
        score = 0;
    } else {
        attemptsLeft++;
    }
    init();
}

 function increase() {
    oneSide++;
    maxSquares = Math.pow(oneSide, 2);
} 

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getInfoFromLocaleStorage() {
    let listOfPlayers = JSON.parse(localStorage.getItem('listOfPlayers'));
    let nameFromLS = JSON.parse(localStorage.getItem('currentName'));

    const list_of_name = document.querySelector('.list_of_name');
    const nameSpan = document.querySelectorAll('.player_name');
    const scoreSpan = document.querySelectorAll('.score');

    if (nameFromLS) {
        const textFromInput = document.querySelector('.input_text');
        textFromInput.value = nameFromLS;
        currentName = nameFromLS;
    }

    for (let i = 1; i < nameSpan.length; i++) {
        nameSpan[i].remove();
    }
    for (let i = 1; i < scoreSpan.length; i++) {
        scoreSpan[i].remove();
    }

    if (listOfPlayers === null) {
        return;
    }
    for (const player of listOfPlayers) {
        const name = document.createElement('span');
        name.className = 'player_name';
        const score = document.createElement('span');
        score.className = 'score';
        name.innerText = player.name;
        score.innerText = player.score;

        list_of_name.appendChild(name);
        list_of_name.appendChild(score);
    }
}

function saveName() {
    const textFromInput = document.querySelector('.input_text').value.trim();
    if (textFromInput === '') {
        alert('безымянных мы не любим');
        return;
    }
    currentName = textFromInput;
    drawNameAndScore(textFromInput, score);
}

function drawNameAndScore(name, score) {
    let listOfPlayers = JSON.parse(localStorage.getItem('listOfPlayers'));

    if (!name) {
        alert('безымянных мы не любим');
        return;
    }

    if (listOfPlayers === null) {
        listOfPlayers = [];
    }
    let player = listOfPlayers.find(value => value.name === name);
    if (player) {
        player.score = score > player.score ? score : player.score;
    } else {
        listOfPlayers.push({name, score});
    }
    localStorage.setItem('listOfPlayers', JSON.stringify(listOfPlayers));
    localStorage.setItem('currentName', JSON.stringify(name));
    getInfoFromLocaleStorage();
}

init();

document.onmousedown = function (e) {
    const targetElement = e.target.parentElement;
    if (targetElement.index === undefined) return;

    document.onkeyup = function (e1) {
        if (e1.key === 'ArrowLeft') {
            targetElement.angle -= 90;
            targetElement.style.transform = `rotate(${targetElement.angle}deg)`;
        }

        if (e1.key === 'ArrowRight') {
            targetElement.angle += 90;
            targetElement.style.transform = `rotate(${targetElement.angle}deg)`;
        }
    };
    document.onmousemove = function (e2) {
        targetElement.style.left = e2.pageX - parseInt(targetElement.style.width) / 2 + 'px';
        targetElement.style.top = e2.pageY - parseInt(targetElement.style.height) / 2 + 'px';
	
    };

    document.onmouseup = function (e3) {
        document.onkeyup = null;
        document.onmousemove = null;
        const field_for_answer = document.querySelector('.field_for_answer');
        const targetX = targetElement.getBoundingClientRect().left;
        const targetY = targetElement.getBoundingClientRect().top;
        const pageX = field_for_answer.getBoundingClientRect().left;
        const pageY = field_for_answer.getBoundingClientRect().top;
        if (Math.abs(targetX - pageX) < 25 && Math.abs(targetY - pageY) < 25) {
            if (targetElement.index === indexWinSquare) {
                winAnimation();
            } else {
                lose();
            }
        }
    };
};

const textFromInput = document.querySelector('.input_text');
textFromInput.addEventListener('keyup', ev => {
    if (ev.key === "Enter") {
        saveName();
    }
});



const menuBtn = document.getElementById('menuBtn');
const restartBtn = document.getElementById('restartBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');

menuBtn.addEventListener('click', () => {
    // Действия при нажатии на кнопку "Главное меню"
    window.location.href = '../MainPage/index2.html';
});

restartBtn.addEventListener('click', () => {
    // Действия при нажатии на кнопку "Начать заново"
    location.reload();
});

nextLevelBtn.addEventListener('click', () => {
    
    let nextLevelScore = Math.pow(3, level);
    if (score >= nextLevelScore) {
        nextLevelScore = Math.pow(3, level + 1);
       // let message = `Отлично, ваших очков хватает для перехода на следующий раунд! Необходимо будет набрать ${nextLevelScore} очков.`;
            goToTheNextLevel = true;
            level++;
            oneSide =  2 + level;
            maxSquares = Math.pow(oneSide, 2);
            attemptsLeftToWin = 1;
            init();
            timeLeft = 60;
            playWinSound();
            return;        
    }
    nextLevelScore = Math.pow(3, level);
   // let message = `Ваших очков не хватает для перехода на следующий раунд! Необходимо будет набрать ${nextLevelScore} очков.`;
    alert('Ваших очков не хватает для перехода на следующий раунд! Необходимо будет набрать ' + nextLevelScore + ' очков.');
    // Действия при нажатии на кнопку "Следующий уровень"
});
