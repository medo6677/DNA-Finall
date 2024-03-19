const quizData = [{
    question: "اي مما يلي يمثل النتيجة الطبيعية لاحدي تجارب جريفث  ……",
    options: [
      "سلاله S + فئران= موت الفئران ",
      "سلالة S مقتولة حراريا + فئران = موت الفئران ",
      "سلالة R حية +موت الفئران = موت الفئران ",
      "سلالة S مقتوله حراريا + سلالة R حية + فئران= عدم موت الفئران"
    ],
    answer: "سلالة R حية +موت الفئران = موت الفئران ",
  },

  {
    question: "اي مما يلي يمكن ان تستنتجه من تجارب جريفث ….. ",
    options: [
      " الصبغيات تحمل المادة الوراثية ",
      " البروتين هو المادة الموراثية",
      "DNA هو المادة الوراثية",
      " من الممكن ان تنتقل المادة الوراثية من بكترية مميتة الي اخري حية"
    ],
    answer: "DNA هو المادة الوراثية",
  },

  {
    question: " ماذا تمثل المادة الوراثية في فيروس البكتريوفاج ",
    options: [
      " RNA شريط مفرد ",
      "DNA شريط مزدوج",
      "RNA شريط مزدوج ",
      " DNA شريط مفرد "
    ],
    answer: "DNA شريط مزدوج",
  },

  {
    question: "كم تكون النسبه بين كمية DNA في خلايا الرحم الي كمية DNA في خلايا الكلي في الأنسان علي الترتيب",
    options: [
      "2:1",
      "1:1",
      "1:2",
      "1:3"
    ],
    answer: "1:1",
  },

  {
    question: "ما العملية التي تستعيد بها خلايا الكائن الحي كمية DNA الاصلية ",
    options: [
      "التلقيح ",
      " الاخصاب ",
      " الانقسام الميوزي ",
      " الانقسام الميتوزي "
    ],
    answer: " الانقسام الميتوزي ",
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