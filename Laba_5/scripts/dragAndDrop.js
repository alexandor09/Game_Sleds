document.addEventListener("DOMContentLoaded", () => {    
    const onceAgainButton = document.getElementById('once_again_btn');
    onceAgainButton.onclick = () => {
        placeImages();
    }
    placeImages();
});

const categories = {
    birds: [],
    beasts: [],
    insects: []
};
const figures = document.getElementsByClassName('figure');
let selectedFigure;
const rotateAngle = 45;

function placeImages() {
    categories.birds = [];
    categories.beasts = [];
    categories.insects = [];

    for (let i = 0; i < figures.length; i++) {
        let figure = figures[i];
        figure.style.top = window.innerHeight * 0.3 + (Math.random() * 10000) % window.innerHeight * 0.4 + 'px';
        figure.style.left = (window.innerWidth * 0.3) + (Math.random() * 10000) % window.innerWidth * 0.4 + 'px';
        figure.angle = Number.parseInt(Math.random() * 10, 10) % 8 * rotateAngle;

        rotateFigure(figure);

        if (figure.className.includes('bird')) {
            categories.birds.push(figure);
        } else if (figure.className.includes('beast')) {
            categories.beasts.push(figure);
        } else if (figure.className.includes('insect')) {
            categories.insects.push(figure);
        }
        move(figure);
    }
}

function rotateFigure(figure) {
    figure.children[0].style.transform = `rotate(${figure.angle}deg)`;
}

document.onkeyup = function (e) {
    if (e.key === 'ArrowLeft') {
        selectedFigure.angle -= rotateAngle;
        rotateFigure(selectedFigure);
        check();
    }

    if (e.key === 'ArrowRight') {
        selectedFigure.angle += rotateAngle;
        rotateFigure(selectedFigure);
        check();
    }
}



function move(figure) {
    figure.ondragstart = () => {
        return false;
    };
    figure.onmousedown = (e) => {
        const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
        const mainHeight = document.getElementsByTagName('main')[0].offsetHeight;
        const mainWidth = document.getElementsByTagName('main')[0].offsetWidth;

        document.onmousemove = (e) => {
            selectedFigure = figure;
            const picture = figure.children[0];
            let left = e.pageX - picture.width / 2;
            figure.style.left = Math.max(mainWidth * 0.1 + picture.width, Math.min(mainWidth * 0.9 - picture.width * 2, left)) + 'px';
            let top = e.pageY - picture.height / 2;
            figure.style.top = Math.min(headerHeight + mainHeight - picture.width * 2, Math.max(headerHeight + picture.height * 2, top)) + 'px';
        };

        figure.onclick = () => {
            let pic = figure.querySelector('.bird');
            pic.style.borderColor = 'red';
        };

        figure.onmouseup = () => {
            document.onmousemove = null;
            check();
        };
    };
}

function check() {
    let win = true;
    const birds = categories.birds;
    const beasts = categories.beasts;
    const insects = categories.insects;
    const maxDistance = 70;

    function getDistance(firstAnimal, secondAnimal) {
        const firstX = Number.parseInt(firstAnimal.style.top) / 2
        const firstY = Number.parseInt(firstAnimal.style.left) / 2
        const secondX = Number.parseInt(secondAnimal.style.top) / 2
        const secondY = Number.parseInt(secondAnimal.style.left) / 2
        const dist = Math.sqrt(Math.pow(firstX - secondX, 2) + Math.pow(firstY - secondY, 2))
        return dist;
    }

    for (let i = 0; i < birds.length; i++) {
        for (let j = 0; j < birds.length; j++) {
            const dist = getDistance(birds[i], birds[j])
            if (dist > maxDistance) {
                win = false
                break
            }
        }
        if (!win) break
        for (let j = i + 1; j < beasts.length; j++) {
            const dist = getDistance(birds[i], beasts[j]);
            if (dist < maxDistance) {
                win = false
                break
            }
        }
        if (!win) break
        for (let j = 0; j < insects.length; j++) {
            const dist = getDistance(birds[i], insects[j]);
            if (dist < maxDistance) {
                win = false
                break
            }
        }
    }

    for (let i = 0; i < beasts.length; i++) {
        for (let j = 0; j < beasts.length; j++) {
            const dist = getDistance(beasts[i], beasts[j])
            if (dist > maxDistance) {
                win = false
                break
            }
        }
        if (!win) break
        for (let j = i + 1; j < birds.length; j++) {
            const dist = getDistance(beasts[i], birds[j]);
            if (dist < maxDistance) {
                win = false
                break
            }
        }
        if (!win) break
        for (let j = 0; j < insects.length; j++) {
            const dist = getDistance(beasts[i], insects[j]);
            if (dist < maxDistance) {
                win = false
                break
            }
        }
    }

    for (let i = 0; i < insects.length; i++) {
        for (let j = 0; j < insects.length; j++) {
            const dist = getDistance(insects[i], insects[j])
            if (dist > maxDistance) {
                win = false
                break
            }
        }
        if (!win) break
        for (let j = 0; j < birds.length; j++) {
            const dist = getDistance(insects[i], birds[j]);
            if (dist < maxDistance) {
                win = false
                break
            }
        }
        if (!win) break
        for (let j = 0; j < beasts.length; j++) {
            const dist = getDistance(insects[i], beasts[j]);
            if (dist < maxDistance) {
                win = false
                break
            }
        }
    }

    if (win) {
        for (let i = 0; i < figures.length; i++) {
            const picture = figures[i].children[0];
            console.log("WIN")
            picture.animate([
                { transform: 'translateX(' + 20 + 'px)' },
                { transform: 'translateX(' + (-20) + 'px)' },
                { transform: 'translateX(' + 20 + 'px)' },
                { transform: 'translateX(' + (-20) + 'px)' },
                { transform: 'translateX(' + 20 + 'px)' },
                { transform: 'translateX(' + (-20) + 'px)' },
                { transform: 'translateX(' + 20 + 'px)' }
            ], 1500);
        }
    }
}
