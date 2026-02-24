let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

const total = document.getElementsByClassName("Total");
const interview = document.getElementsByClassName("Interview");
const rejected = document.getElementsByClassName("rejected-count");

const allApplications = document.getElementById("JobSelects");
const filterSection = document.getElementById("filter-section");


// ================= COUNT =================
function updateCount() {
  total.innerText = allApplications.children.length;
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;
}

updateCount();


// ================= FILTER BUTTON STYLE =================
function toggleStyle(id) {

  currentStatus = id;

  const buttons = document.querySelectorAll(
    ".all-btn, .interview-btn, .rejected-btn"
  );

  buttons.forEach(btn => {
    btn.classList.remove("bg-blue-500", "text-white");
    btn.classList.add("bg-gray-300", "text-black");
  });

  const active = document.getElementById(id);
  active.classList.remove("bg-gray-300", "text-black");
  active.classList.add("bg-blue-500", "text-white");

  if (className === "all-btn") {
    allApplications.classList.remove("hidden");
    filterSection.classList.add("hidden");
  }

  if (className === "interview-btn") {
    renderInterview();
  }

  if (className === "rejected-btn") {
    renderRejected();
  }
}


// ================= MAIN CLICK EVENT =================
document.addEventListener("click", function (e) {

  const card = e.target.closest(".job-card");
  if (!card) return;

  const title = card.querySelector(".title").innerText;

  const data = {
    title: title,
    about: card.querySelector(".about").innerText,
    time: card.querySelector(".time").innerText,
    descriptions: card.querySelector(".descriptions").innerText,
  };

  // ===== INTERVIEW =====
  if (e.target.classList.contains("inter-btn")) {

    if (!interviewList.find(item => item.title === title)) {
      interviewList.push(data);
      rejectedList = rejectedList.filter(item => item.title !== title);

      card.querySelector(".status").innerText = "Interview";
    }

    updateCount();
  }

  // ===== REJECT =====
  if (e.target.classList.contains("reject-btn")) {

    if (!rejectedList.find(item => item.title === title)) {
      rejectedList.push(data);
      interviewList = interviewList.filter(item => item.title !== title);

      card.querySelector(".status").innerText = "Rejected";
    }

    updateCount();
  }

  // ===== DELETE =====
  if (e.target.classList.contains("trash-btn")) {

    interviewList = interviewList.filter(item => item.title !== title);
    rejectedList = rejectedList.filter(item => item.title !== title);

    card.remove();
    updateCount();
  }

});


// ================= RENDER INTERVIEW =================
function renderInterview() {

  allApplications.classList.add("hidden");
  filterSection.classList.remove("hidden");
  filterSection.innerHTML = "";

  interviewList.forEach(item => {
    filterSection.appendChild(createCard(item, "Interview"));
  });
}


// ================= RENDER REJECTED =================
function renderRejected() {

  allApplications.classList.add("hidden");
  filterSection.classList.remove("hidden");
  filterSection.innerHTML = "";

  rejectedList.forEach(item => {
    filterSection.appendChild(createCard(item, "Rejected"));
  });
}


// ================= CARD TEMPLATE =================
function createCard(data, statusText) {

  const div = document.createElement("div");
  div.className = "job-card bg-white p-6 rounded-md mb-4";

  div.innerHTML = `
      <div class="space-y-2">
        <h2 class="title text-2xl font-bold">${data.title}</h2>
        <p class="about text-gray-500">${data.about}</p>
        <p class="time">${data.time}</p>

        <button class="status bg-blue-100 text-blue-500 px-4 py-2 rounded-lg">
          ${statusText}
        </button>

        <p class="descriptions">${data.descriptions}</p>
      </div>
  `;

  return div;
}