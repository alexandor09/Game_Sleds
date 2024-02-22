let complex = 0;
function saveName() {
    const textFromInput = document.querySelector('.input_text').value.trim();
    if (textFromInput === '') {
        alert('Пожалуйста, введите ваше имя.');        
        return; // Прерываем выполнение функции, если поле ввода пустое
    }
    localStorage.setItem('currentName', JSON.stringify(textFromInput));
}

function setComplexity(compl)
{
    complex = compl;
    localStorage.setItem('currentComplexity', JSON.stringify(compl))
}

document.getElementById("ratingButton").addEventListener("click", function() {
    window.location.href = "../Rating/index.html";  });

    document.getElementById("HomeButton").addEventListener("click", function() {
        window.location.href = "../../../index.html";  });



        document.getElementById("startButton").addEventListener("click", function() {
            const textFromInput = document.querySelector('.input_text').value.trim();
            if (textFromInput === '') {
                alert('Пожалуйста, введите ваше имя.');
                return; // Прерываем выполнение функции, если поле ввода пустое
            }

            // Здесь выполняются действия при нажатии на кнопку, если поле ввода не пустое
            saveName();
          //  alert('Добро пожалуйста, ' + textFromInput + '!');
            window.location.href = "../Game2/index.html";

            if (complex === 1)
                window.location.href = "../Game2/index.html";
            else
                window.location.href = "../Game2/index.html";  
        });

let currentButton = null; // переменная для хранения ссылки на текущую нажатую кнопку

function setComplexity(compl) {
    // Получаем ссылку на кнопку, которая была нажата
    const button = document.querySelector(`#buttonContainer button:nth-child(${compl + 1})`);

    // Возвращаем предыдущей кнопке исходный цвет, если она существует
    if (currentButton !== null) {
        currentButton.style.backgroundColor = "";
    }

    // Устанавливаем цвет нажатой кнопки
    button.style.backgroundColor = "blue";

    // Обновляем переменную currentButton
    currentButton = button;

    complex = compl;
    localStorage.setItem('currentComplexity', JSON.stringify(compl));
}