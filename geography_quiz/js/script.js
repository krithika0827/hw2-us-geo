var score = 0;
var totalAttempts = 0;

document.querySelector(".btn-submit").addEventListener("click", gradeQuiz);

const checkmarkImg = `<img src="img/checkmark.png" alt="Correct" style="width:20px; height:20px;">`;
const xmarkImg = `<img src="img/xmark.png" alt="Incorrect" style="width:20px; height:20px;">`;

function displayQ4Choices() {
  const q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  const shuffled = _.shuffle(q4ChoicesArray);
  const container = document.querySelector("#q4Choices");
  container.innerHTML = "";
  for (let i = 0; i < shuffled.length; i++) {
    container.innerHTML += `
      <div class="form-check">
        <input type="radio" name="q4" id="${shuffled[i]}" value="${shuffled[i]}" class="form-check-input" />
        <label for="${shuffled[i]}" class="form-check-label">${shuffled[i]}</label>
      </div>`;
  }
}

function rightAnswer(index) {
  score++;
  document.querySelector(`#markImg${index}`).innerHTML = checkmarkImg;
  document.querySelector(`#q${index}Feedback`).className = "bg-success text-white p-2";
  document.querySelector(`#q${index}Feedback`).textContent = "Correct";
  updateTotalScore();
}

function wrongAnswer(index) {
  document.querySelector(`#markImg${index}`).innerHTML = xmarkImg;
  document.querySelector(`#q${index}Feedback`).className = "bg-danger text-white p-2";
  document.querySelector(`#q${index}Feedback`).textContent = "Incorrect";
  updateTotalScore();
}

function updateTotalScore() {
  const points = score * 10;
  document.querySelector("#totalScore").textContent = `Score: ${points}/100`;
  const msg = document.querySelector("#congratsMsg");
  if (points >= 80) {
    msg.textContent = "Congratulations! Great job.";
    msg.style.color = "green";
  } else {
    msg.textContent = "";
  }
}

function isFormValid() {
  let unanswered = [];
  if (!document.querySelector("#q1").value.trim()) unanswered.push(1);
  if (!document.querySelector("#q2").value) unanswered.push(2);
  if (
    !document.querySelector("#Jackson").checked &&
    !document.querySelector("#Franklin").checked &&
    !document.querySelector("#Jefferson").checked &&
    !document.querySelector("#Roosevelt").checked
  )
    unanswered.push(3);
  if (!document.querySelector("input[name=q4]:checked")) unanswered.push(4);
  if (!document.querySelector("input[name=q5]:checked")) unanswered.push(5);
  if (!document.querySelector("#q6").value.trim()) unanswered.push(6);
  if (!document.querySelector("#q7").value) unanswered.push(7);
  if (
    !document.querySelector("#Superior").checked &&
    !document.querySelector("#Michigan").checked &&
    !document.querySelector("#Erie").checked &&
    !document.querySelector("#Tahoe").checked
  )
    unanswered.push(8);
  if (!document.querySelector("#q9").value.trim()) unanswered.push(9);
  if (
    !document.querySelector("#Washington").checked &&
    !document.querySelector("#Montana").checked &&
    !document.querySelector("#Georgia").checked
  )
    unanswered.push(10);

  if (unanswered.length > 0) {
    document.querySelector("#validationFdbk").textContent =
      `Please answer Question${unanswered.length > 1 ? 's' : ''} ${unanswered.join(", ")}.`;
    return false;
  }
  document.querySelector("#validationFdbk").textContent = "";
  return true;
}

function gradeQuiz() {
  score = 0;
  if (!isFormValid()) return;

  // Q1
  const q1Answer = document.querySelector("#q1").value.trim().toLowerCase();
  q1Answer === "sacramento" ? rightAnswer(1) : wrongAnswer(1);

  // Q2
  const q2Answer = document.querySelector("#q2").value.toLowerCase();
  q2Answer === "mississippi" ? rightAnswer(2) : wrongAnswer(2);

  // Q3
  const q3Jackson = document.querySelector("#Jackson").checked;
  const q3Franklin = document.querySelector("#Franklin").checked;
  const q3Jefferson = document.querySelector("#Jefferson").checked;
  const q3Roosevelt = document.querySelector("#Roosevelt").checked;
  if (
    !q3Jackson &&
    !q3Franklin &&
    q3Jefferson &&
    q3Roosevelt
  ) rightAnswer(3);
  else wrongAnswer(3);

  // Q4
  const q4Answer = document.querySelector("input[name=q4]:checked").value;
  q4Answer.toLowerCase() === "rhode island" ? rightAnswer(4) : wrongAnswer(4);

  // Q5
  const q5Answer = document.querySelector("input[name=q5]:checked").value.toLowerCase();
  q5Answer === "california" ? rightAnswer(5) : wrongAnswer(5);

  // Q6
  const q6Answer = document.querySelector("#q6").value.trim().toLowerCase();
  q6Answer === "alaska" ? rightAnswer(6) : wrongAnswer(6);

  // Q7
  const q7Answer = document.querySelector("#q7").value.toLowerCase();
  q7Answer === "atlantic" ? rightAnswer(7) : wrongAnswer(7);

  // Q8
  const q8Superior = document.querySelector("#Superior").checked;
  const q8Michigan = document.querySelector("#Michigan").checked;
  const q8Erie = document.querySelector("#Erie").checked;
  const q8Tahoe = document.querySelector("#Tahoe").checked;
  if (
    q8Superior &&
    q8Michigan &&
    q8Erie &&
    !q8Tahoe
  ) rightAnswer(8);
  else wrongAnswer(8);

  // Q9
  let q9Response = document.querySelector("#q9").value.trim().toLowerCase();
  if (q9Response === "denali") {
    rightAnswer(9);
  } else {
    wrongAnswer(9);
  }

  // Q10
  const q10Washington = document.querySelector("#Washington").checked;
  const q10Montana = document.querySelector("#Montana").checked;
  const q10Georgia = document.querySelector("#Georgia").checked;
  if (
    q10Washington &&
    q10Montana &&
    !q10Georgia
  ) rightAnswer(10);
  else wrongAnswer(10);

  totalAttempts = localStorage.getItem("total_attempts");
  totalAttempts = totalAttempts ? parseInt(totalAttempts) + 1 : 1;
  localStorage.setItem("total_attempts", totalAttempts);
  document.querySelector("#totalAttempts").textContent = `Total Attempts: ${totalAttempts}`;
}

displayQ4Choices();
updateTotalScore();
