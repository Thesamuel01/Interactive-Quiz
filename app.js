const correctAnswers = ['B', 'D', 'A', 'D', 'C', 'A', 'C', 'B'];
let shouldReloadPage = false;
let score = 0;

const form = document.querySelector('form');
const popup = document.querySelector('.popup-wraper');
const popupTitle = document.querySelector('.popup-title');
const popupParagraph = document.querySelector('.popup-paragraph');
const button = document.querySelector('button');

const highlightWrongUserAnswer = input => {
    const verifyCheckedWrongAnswer = input.checked;

    if (verifyCheckedWrongAnswer) {
        const labelOfInput = input.parentElement
        const divOfInput = labelOfInput.parentElement;

        divOfInput.classList.add('highlight-wrong-answer');
    };
}

const showWrongAnswers = (radioNodeList, index) => {
    const userAnswer = radioNodeList.value;
    const verifyUserWrongAnswer = userAnswer !== correctAnswers[index];

    if (verifyUserWrongAnswer) {
        radioNodeList.forEach(highlightWrongUserAnswer);
    };
};

const showPopup = (scoreFeedback) => {
    const { title, paragraph, className } = scoreFeedback();

    popup.style.display = 'block';

    popupTitle.textContent = title;
    popupTitle.classList.add(className);

    popupParagraph.textContent = paragraph;
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

const testScore = () => {
    const isAGoodScore = score >= 4;

    const goodScoreMessage = {
        title: "Parabéns!",
        paragraph: `Você acertou ${score} de 8 frases`,
        className: 'text-success'
    };

    const badScoreMessage = {
        title: 'Que pena!',
        paragraph: `Você acertou ${score} de 8 frases, 
            precisa estudar um pouco mais!`,
        className: 'text-danger'
    };

    if (isAGoodScore) {
        return goodScoreMessage;
    }

    return badScoreMessage;
}

const calculateScore = (userAnswer, index) => {
    if (userAnswer.value === correctAnswers[index]) {
        score += 1;
    };
};

const releaseReloadPage = () => {
    button.textContent = `Tentar Novamente`;
    shouldReloadPage = true;
}

const handleScore = event => {
    if (shouldReloadPage) {
        return;
    };

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
    userAnswers.forEach(showWrongAnswers);

    releaseReloadPage();
    showPopup(testScore);
};

form.addEventListener('submit', handleScore);
popup.addEventListener('click', closePopup);