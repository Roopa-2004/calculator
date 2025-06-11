(function() {
  const display = document.getElementById("calcDisplay");
  if (!display) return;

  const buttons = document.querySelectorAll(".calc-btn");
  let current = "", resetNext = false;

  buttons.forEach(btn => {
    const val = btn.dataset.value;
    btn.addEventListener("click", () => {
      if (btn.id === "calcClear") {
        current = ""; display.value = "";
      } else if (btn.id === "calcEqual") {
        try { current = eval(current).toString(); }
        catch { current = "Error"; }
        display.value = current; resetNext = true;
      } else {
        if (resetNext) { current = ""; resetNext = false; }
        current += val; display.value = current;
      }
    });
  });
})();

const tutorials = [
  { title: "Java Basics", topic: "java", difficulty: "beginner", description: "Learn Java fundamentals." },
  { title: "Python for Data Science", topic: "python", difficulty: "intermediate", description: "Analyze data with Python." },
  { title: "Advanced C++ Templates", topic: "cpp", difficulty: "advanced", description: "Master templates in C++." }
];

const projects = [
  { title: "Simple calculator", difficulty: "beginner", description: "Build a calculator app." },
];

function renderCards() {
  const tutEl = document.getElementById("tutorialCards");
  const projEl = document.getElementById("projectCards");
  if (tutEl) tutEl.innerHTML = tutorials.map(t => cardHTML(t, true)).join("");
  if (projEl) projEl.innerHTML = projects.map(p => cardHTML(p, false)).join("");
}

function cardHTML(item, isTutorial) {
  return `<div class="card" data-topic="${item.topic || ''}" data-difficulty="${item.difficulty}">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <p><strong>Difficulty:</strong> ${item.difficulty}</p>
    ${isTutorial 
      ? '<button class="btn primary">Start Tutorial</button>' 
      : '<a class="btn primary" href="calculator.html">Try Now</a>'}
  </div>`;
}

renderCards();

const diffFilter = document.getElementById("difficultyFilter");
const topicFilter = document.getElementById("topicFilter");
function applyFilters() {
  const diffVal = diffFilter.value;
  const topicVal = topicFilter.value;
  document.querySelectorAll("#tutorialCards .card").forEach(card => {
    const show = (diffVal === "all" || card.dataset.difficulty === diffVal) &&
                 (topicVal === "all" || card.dataset.topic === topicVal);
    card.style.display = show ? "block" : "none";
  });
}
if (diffFilter) diffFilter.addEventListener("change", applyFilters);
if (topicFilter) topicFilter.addEventListener("change", applyFilters);

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(query) ? "block" : "none";
    });
  });
}

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const username = prompt("Enter your name (demo):");
    if (username) {
      alert(`Welcome, ${username}!`);
    }
  });
}
