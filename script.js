let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

const total = document.getElementById("total-count");
const interview = document.getElementById("interview-count");
const rejected = document.getElementById("rejected-count");

const allApplications = document.getElementById("JobSelects");
const filterSection = document.getElementById("filter-section");


// ================= COUNT =================

function updateCount() {
  total.innerText = allApplications.children.length;
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;
}

updateCount();


// ================= FILTER BUTTON =================

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

  if (id === "all-btn") {
    allApplications.classList.remove("hidden");
    filterSection.classList.add("hidden");
  }

  if (id === "interview-btn") {
    renderInterview();
  }

  if (id === "rejected-btn") {
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
    descriptions: card.querySelector(".descriptions").innerText
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

  // ===== TRASH =====
  if (e.target.closest(".trash-btn")) {

    interviewList = interviewList.filter(item => item.title !== title);
    rejectedList = rejectedList.filter(item => item.title !== title);

    card.remove();
    updateCount();
  }

});


// ================= RENDER FUNCTIONS =================

function renderInterview() {

  allApplications.classList.add("hidden");
  filterSection.classList.remove("hidden");

  filterSection.innerHTML = "";

  interviewList.forEach(item => {
    filterSection.innerHTML += createCard(item, "Interview");
  });

}

function renderRejected() {

  allApplications.classList.add("hidden");
  filterSection.classList.remove("hidden");

  filterSection.innerHTML = "";

  rejectedList.forEach(item => {
    filterSection.innerHTML += createCard(item, "Rejected");
  });

}


// ================= CARD TEMPLATE =================

function createCard(data, statusText) {

  return `
  <div class="job-card flex justify-between bg-white p-[25px] rounded-md mb-4">
    <div class="space-y-[8px]">
      <h2 class="title text-2xl font-bold">${data.title}</h2>
      <p class="about text-[20px] font-medium text-[#858585]">${data.about}</p>
      <p class="time text-[18px] font-normal">${data.time}</p>
      <button class="status bg-[#e2ecff] text-[#5185ff] px-4 py-2 rounded-lg">
        ${statusText}
      </button>
      <p class="descriptions text-[18px] font-normal">${data.descriptions}</p>
    </div>
  </div>
  `;
}