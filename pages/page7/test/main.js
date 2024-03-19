const quizData = [{
    question: "ماذا يمثل كل كرموسوم في حقيقيات النواة",
    options: [
      " شريط مفرد من DNA ",
      "جزئ واحد من DNA ",
      "جزيئان من DNA ",
      "جزئ DNA وجزئRNA "
    ],
    answer: "جزئ واحد من DNA ",
  },

  {
    question: "ما البلوميرات المسؤلة عن ضم جزيئات DNA الطويلة لتقع في حيز نواة الخلية",
    options: [
      " الكربوهيدرات ",
      "الليبدات ",
      "البروتينات",
      "الهرمونات "
    ],
    answer: "البروتينات",
  },

  {
    question: "اي مما يلي يتفق مع اوليات وحقيقيات النواة  ",
    options: [
      " وجود الكرموسومات ",
      " درجة تعقيد البروتين ",
      " عدم وجود الميتكوندريا ",
      " نوع انزيمات التضاعف "
    ],
    answer: " نوع انزيمات التضاعف ",

  },

  {
    question: "اي مما يلي ليس من خصائص DNA المعزول من انوية خلايا حقيقيات النواة",
    options: [
      "  ينظم في شكل حلقي ",
      "ينظم في شكل كروماتين ",
      "يرتبط مع الهستونات ",
      " قد يحدث طفرة "
    ],
    answer: "  ينظم في شكل حلقي ",
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `لقد حصلت علي ${score} من ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>إحابتك هي :</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>الإحابة الصحيحه:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
  }

  resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();