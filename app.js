const correctAnswers = ['B', 'D', 'A', 'D', 'C', 'A', 'C', 'B'];
let score = 0;

const form = document.querySelector('form');
const popup = document.querySelector('.popup-wraper');
const popupParagraph = document.querySelector('.popup-paragraph');

const resetWrongAnswers = (userAnswer, index) => {
    const verifyWrongAnswer = userAnswer.value !== correctAnswers[index];

    if (verifyWrongAnswer) {
        userAnswer.value = 'A';
    }
};

const showPopup = score => {
    popup.style.display = 'block';

    popupParagraph.textContent = `Você acertou ${score} de 8 frases`;
};

const closePopup = event => {
    const classNameOfClickedElement = event.target.classList;
    const classesNames = ['popup-close', 'popup-wraper'];

    const shouldClosePopup = classesNames.some(
        className => className === classNameOfClickedElement[0]
    );

    if (shouldClosePopup) {
        popup.style.display = 'none';
    };
};

const calculateScore = (userAnswer, index) => {
    if (userAnswer.value === correctAnswers[index]) {
        score += 1;
    };
};

const resetScore = () => score = 0;

const handleScore = event => {
    event.preventDefault();

    const userAnswers = [
        form.inputQuestion1,
        form.inputQuestion2,
        form.inputQuestion3,
        form.inputQuestion4,
        form.inputQuestion5,
        form.inputQuestion6,
        form.inputQuestion7,
        form.inputQuestion8,
    ];

    userAnswers.forEach(calculateScore);
    userAnswers.forEach(resetWrongAnswers);

    showPopup(score);
    resetScore();
};

form.addEventListener('submit', handleScore);
popup.addEventListener('click', closePopup);