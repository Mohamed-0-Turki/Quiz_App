const dataFile = "https://gist.githubusercontent.com/Mohamed-0-Turki/7db470b5f2131cfa03f30b76d00cdd7f/raw/a1c43836cc0a1df8d0ac2e80e51f20b3d14fc035/gistfile1.txt",
  popup = document.querySelector(".popup-container"),
  popupBtnStart = document.querySelector(".popup-container button"),
  popupMessage = document.querySelector(".popup .question p"),
  activeMain = document.querySelector("main")
  questionNum = document.querySelector("main .container .q-num p"),
  question = document.querySelector("main .container .question p"),
  choices = Array.from(document.querySelectorAll("main .container .choices p")),
  btnSubmit = document.querySelector("main .container button");
let numQuestions = 0,
    index = 0,
    userAnswer,
    correctAnswer,
    score = 0;
popupBtnStart.onclick = () => {
  popup.className = "popup-container-not-active";
  activeMain.className = "";
  mcq(dataFile, index);
}
async function mcq(file, qI) {
  try {
    const response = await fetch(file);
    const jsObj = await response.json();
    numQuestions = jsObj.length;
    if (jsObj[qI] !== undefined) {
      questionNum.innerHTML = qI + 1;
      question.innerHTML = jsObj[qI].question;
      correctAnswer = jsObj[qI].answer;
      choices.forEach(choice => {
        let cI = choices.indexOf(choice);
        choice.innerHTML = jsObj[qI].choices[cI];
        choice.onclick = () => {
          removeSelectAnswer(choices);
          choice.className = "select";
          userAnswer = choice.innerHTML;
        }
      });
    }
  }
  catch (error) {
    console.log(error);
  }
}
btnSubmit.onclick = () => {
  removeSelectAnswer(choices);
  checkAnswer(userAnswer, correctAnswer);
  index++;
  if (index < numQuestions) {
    mcq(dataFile, index);
  }
  else {
    popup.className = "popup-container";
    activeMain.className = "not-active";
    popupMessage.innerHTML = `Score is ${score} / ${numQuestions}`;
    popupBtnStart.innerHTML = "Close";
  }
  popupBtnStart.onclick = () => {
    location.reload()
  }
};
function removeSelectAnswer(choicesArray) {
  choicesArray.forEach(choice => {
    choice.className = "";
  });
}
function checkAnswer(answer, correct) {
  score = answer === correct ? score + 1 : score;
}
