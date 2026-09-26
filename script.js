document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");

  // This event listener checks if the user has scrolled more than 10px
  // If yes, it adds the 'scrolled' class to the header (for styling changes like shrinking)
  // If not, it removes the 'scrolled' class
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // sticky nav 
   const navWrapper = document.getElementById("navWrapper");
  const trigger = document.querySelector(".sticky-trigger");

  const observer = new IntersectionObserver(
      (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        navWrapper.classList.add("sticky-nav-wrapper");
      } else {
        navWrapper.classList.remove("sticky-nav-wrapper");
      }
    });
  },
  {
    rootMargin: "-60px 0px 0px 0px", // triggers earlier, avoids flicker
    threshold: 0
  }
  );

  observer.observe(trigger);

  // back to top logic
  const backToTopBtn = document.getElementById("backToTop");

  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  };

  backToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  seeAnswersButton.addEventListener("click", displayCorrectAnswers);
  document.getElementById("start-quiz-btn").addEventListener("click", () => {
  document.getElementById("quiz-instructions").style.display = "none";
  document.getElementById("quiz-content").style.display = "block";
});
});

// Object to store references to different topic sections by their IDs
let topicElements = {
  aim: document.getElementById("aim"),
  theory: document.getElementById("theory"),
  procedure: document.getElementById("procedure"),
  practice: document.getElementById("practice"),
  code: document.getElementById("code"),
  result: document.getElementById("result"),
  quiz: document.getElementById("quiz"),
  references: document.getElementById("references"),
  tnt: document.getElementById("tnt"),
};

let currentTopic = "aim"; // Track the currently displayed topic
function switchContent(topic) {
    if (topic === currentTopic) {
        return; // Prevent unnecessary updates if the same topic is clicked again
    }

    topicElements[currentTopic].style.display = 'none'; // Hide the previous topic
    topicElements[topic].style.display = 'block'; // Show the selected topic
    currentTopic = topic; // Update the current topic
}

// Generalized function to toggle language-based code blocks
function toggleCode(language) {
  const allCodeBlocks = document.querySelectorAll(".code-block");
  allCodeBlocks.forEach((block) => block.classList.remove("active"));

  const selectedCodeBlock = document.getElementById(language + "Code");
  selectedCodeBlock.classList.add("active");
}

// Clipboard copy function
function copyCode(elementId) {
  const codeBlock = document.getElementById(elementId);
  const code = codeBlock.querySelector("code").innerText;

  // Copy the selected code text to clipboard
  navigator.clipboard
    .writeText(code)
    .then(() => {
      const copyButton = codeBlock.querySelector(".copy-button");
      copyButton.textContent = "Copied!"; // Temporarily change button text
      setTimeout(() => {
        copyButton.textContent = "Copy"; // Reset text after 2 seconds
      }, 2000);
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}

// Event listeners for radio buttons
const cppRadio = document.getElementById("cppRadio");
if (cppRadio) {
  cppRadio.addEventListener("change", () => toggleCode("cpp"));
}

const pythonRadio = document.getElementById("pythonRadio");
if (pythonRadio) {
  pythonRadio.addEventListener("change", () => toggleCode("python"));
}

// Event listener for copy buttons
document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", function () {
    const language = button.closest(".code-block").id.replace("Code", "");
    copyCode(language + "Code");
  });
});

//quiz logic
const quizData = [
    {
      question: "1. What is CPU scheduling?",
      choices: [
        "The process of selecting a process from the ready queue for CPU execution",
        "The process of installing a CPU on the motherboard",
        "The process of allocating memory to a process",
        "The process of formatting a hard disk"
      ],
      answer: 0
    },
    {
      question: "2. What is a process?",
      choices: [
        "A file stored permanently on disk",
        "A program in execution",
        "A section of the CPU's cache",
        "A hardware interrupt signal"
      ],
      answer: 1
    },
    {
      question: "3. What is burst time?",
      choices: [
        "The time a process waits in the ready queue",
        "The time a process enters the system",
        "The amount of CPU time required by a process",
        "The time between two context switches"
      ],
      answer: 2
    },
    {
      question: "4. What is arrival time?",
      choices: [
        "The time at which a process becomes available for execution",
        "The time a process finishes execution",
        "The total CPU time required by a process",
        "The time a process spends in the waiting queue"
      ],
      answer: 0
    },
    {
      question: "5. What is Turnaround Time (TAT)?",
      choices: [
        "TAT = Burst Time − Waiting Time",
        "TAT = Arrival Time − Completion Time",
        "TAT = Waiting Time − Burst Time",
        "TAT = Completion Time − Arrival Time"
      ],
      answer: 3
    },
    {
      question: "6. What is Waiting Time (WT)?",
      choices: [
        "WT = Completion Time − Arrival Time",
        "WT = Turnaround Time − Burst Time",
        "WT = Burst Time − Turnaround Time",
        "WT = Arrival Time − Burst Time"
      ],
      answer: 1
    },
    {
      question: "7. Is FCFS preemptive?",
      choices: [
        "Yes, it can interrupt a running process",
        "No, FCFS is non-preemptive",
        "Only when the time quantum expires",
        "Only for the highest priority process"
      ],
      answer: 1
    },
    {
      question: "8. Is Round Robin preemptive?",
      choices: [
        "Yes",
        "No",
        "Only for the first process",
        "Only in Multilevel Queue mode"
      ],
      answer: 0
    },
    {
      question: "9. What is the main parameter of Round Robin?",
      choices: [
        "Priority number",
        "Burst time",
        "Time Quantum",
        "Arrival time"
      ],
      answer: 2
    },
    {
      question: "10. What is SRTF?",
      choices: [
        "The preemptive version of SJF, based on shortest remaining time",
        "The non-preemptive version of Priority scheduling",
        "Another name for Round Robin",
        "A scheduling algorithm used only for Multilevel Queues"
      ],
      answer: 0
    }
  ];

  let currentIndex = 0;
  let userAnswers = new Array(quizData.length).fill(null);

  const instructionsEl = document.getElementById('quiz-instructions');
  const contentEl = document.getElementById('quiz-content');
  const progressEl = document.getElementById('progress');
  const questionEl = document.getElementById('question');
  const choicesEl = document.getElementById('choices');
  const nextBtn = document.getElementById('next-btn');
  const reportEl = document.getElementById('quiz-report');
  const retakeBtn = document.getElementById('retake-btn');
  const seeAnswersBtn = document.getElementById('see-answers-btn');

  document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', nextQuestion);
  retakeBtn.addEventListener('click', retakeQuiz);
  seeAnswersBtn.addEventListener('click', showAnswerReview);

  function startQuiz() {
    instructionsEl.style.display = 'none';
    contentEl.style.display = 'block';
    currentIndex = 0;
    userAnswers = new Array(quizData.length).fill(null);
    loadQuestion();
  }

  function loadQuestion() {
    reportEl.style.display = 'none';
    retakeBtn.style.display = 'none';
    seeAnswersBtn.style.display = 'none';
    questionEl.style.display = 'block';
    choicesEl.style.display = 'block';
    nextBtn.style.display = 'inline-block';

    const q = quizData[currentIndex];
    progressEl.textContent = `Question ${currentIndex + 1} of ${quizData.length}`;
    questionEl.textContent = q.question;

    choicesEl.innerHTML = '';
    q.choices.forEach((choiceText, i) => {
      const div = document.createElement('div');
      div.className = 'choice';
      div.textContent = choiceText;
      if (userAnswers[currentIndex] === i) div.classList.add('selected');
      div.addEventListener('click', () => selectChoice(i));
      choicesEl.appendChild(div);
    });

    nextBtn.disabled = userAnswers[currentIndex] === null;
    nextBtn.textContent = currentIndex === quizData.length - 1 ? 'Finish' : 'Next';
  }

  function selectChoice(i) {
    userAnswers[currentIndex] = i;
    const choiceDivs = choicesEl.querySelectorAll('.choice');
    choiceDivs.forEach((div, idx) => {
      div.classList.toggle('selected', idx === i);
    });
    nextBtn.disabled = false;
  }

  function nextQuestion() {
    if (currentIndex < quizData.length - 1) {
      currentIndex++;
      loadQuestion();
    } else {
      showReport();
    }
  }

  function showReport() {
    questionEl.style.display = 'none';
    choicesEl.style.display = 'none';
    nextBtn.style.display = 'none';
    progressEl.textContent = '';

    let score = 0;
    quizData.forEach((q, i) => {
      if (userAnswers[i] === q.answer) score++;
    });

    reportEl.style.display = 'block';
    reportEl.innerHTML = `<div class="score-box">You scored ${score} out of ${quizData.length}.</div>`;

    retakeBtn.style.display = 'inline-block';
    seeAnswersBtn.style.display = 'inline-block';
  }

  function showAnswerReview() {
    let html = '<div class="score-box">Answer Review</div>';
    quizData.forEach((q, i) => {
      const userIdx = userAnswers[i];
      const isCorrect = userIdx === q.answer;
      const userText = userIdx !== null ? q.choices[userIdx] : 'Not answered';

      html += `<div class="answer-review">
        <div class="aq">${q.question}</div>
        <div class="your-answer ${isCorrect ? 'right' : 'wrong'}">Your answer: ${userText}</div>
        ${!isCorrect ? `<div class="correct-answer">Correct answer: ${q.choices[q.answer]}</div>` : ''}
      </div>`;
    });
    reportEl.innerHTML = html;
  }

  function retakeQuiz() {
    currentIndex = 0;
    userAnswers = new Array(quizData.length).fill(null);
    loadQuestion();
  }