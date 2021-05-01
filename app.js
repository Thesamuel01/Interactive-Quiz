(() => {
    const correctAnswers = ['B', 'D', 'A', 'D', 'C', 'A', 'C', 'B'];
    const form = document.querySelector('form');
    const popup = document.querySelector('.popup-wraper');
    const popupTitle = document.querySelector('.popup-title');
    const popupScore = document.querySelector('.popup-score');
    const buttonForm = document.querySelector('button');
    const inputs = document.querySelectorAll('input')

    let shouldReloadPage = false;
    let score = 0;

    const getUserAnswerFeedback = (userAnswer, index) => {
        const correctAnswer = {
            highlight: 'highlight-right-answer',
            textColor: 'text-success'
        };

        const wrongAnswer = {
            highlight: 'highlight-wrong-answer',
            textColor: 'text-danger'
        };

        const isUserAnswerCorrect = userAnswer === correctAnswers[index];

        return isUserAnswerCorrect ? correctAnswer : wrongAnswer;
    };

    const highlightCheckedInputs = (inputs) => {
        let correctAnswersIndex = 0;

        inputs.forEach(input => {
            const isInputChecked = input.checked;

            if (!isInputChecked) {
                return;
            };

            const inputLabel = input.parentElement;
            const inputDiv = inputLabel.parentElement;
            const userAnswer = input.value;

            const { highlight, textColor } =
                getUserAnswerFeedback(userAnswer, correctAnswersIndex++);

            inputDiv.classList.add(highlight);
            inputLabel.classList.add(textColor);
            inputLabel.classList.remove('text-dark');
        });
    };

    const disableAnswersInputs = inputs => {
        inputs.forEach(input => input.disabled = true);
    };

    const getUserAnswers = () => correctAnswers.map((_, index) =>
        form[`inputQuestion${index + 1}`].value);

    const calculateScore = userAnswers => {
        userAnswers.forEach((userAnswer, index) => {
            const isUserAnswerCorrect = userAnswer === correctAnswers[index];

            if (isUserAnswerCorrect) {
                score += 1;
            };
        });
    };

    const showPopup = getScoreFeedback => {
        const { title, className } = getScoreFeedback();

        popup.style.display = 'block';
        popupTitle.textContent = title;
        popupTitle.classList.add(className);

        let counter = 0;

        const timer = setInterval(() => {
            if (counter === score) {
                clearInterval(timer);
            };

            popupScore.textContent = counter++;
        }, 100)
    };

    const getScoreFeedbackMessage = () => {
        const goodScoreMessage = {
            title: "Parabéns!",
            className: 'text-success'
        };

        const badScoreMessage = {
            title: 'Que pena!',
            className: 'text-danger'
        };

        return score >= 4 ? goodScoreMessage : badScoreMessage;
    };

    const releaseReloadPage = () => {
        buttonForm.textContent = `Tentar Novamente`;
        shouldReloadPage = !shouldReloadPage;
    };

    const handleScore = event => {
        if (shouldReloadPage) {
            return;
        };

        event.preventDefault();

        const userAnswers = getUserAnswers();

        calculateScore(userAnswers)
        showPopup(getScoreFeedbackMessage);
        releaseReloadPage();
    };

    const closePopup = event => {
        const classNameOfClickedElement = event.target.classList;
        const classesNames = ['popup-close', 'popup-wraper'];

        const shouldClosePopup = classesNames.some(
            className => className === classNameOfClickedElement[0]
        );

        if (shouldClosePopup) {
            highlightCheckedInputs(inputs)
            disableAnswersInputs(inputs);

            popup.style.display = 'none';
        };
    };

    form.addEventListener('submit', handleScore);
    popup.addEventListener('click', closePopup);
})()