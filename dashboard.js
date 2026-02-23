const SECTION_KEYWORDS = {
  "Unit Reviews": ["unit review", "program review"],
  "RHECs": ["rhec"],
  "PCC": ["pcc"],
  "EXST": ["exst"],
  "MSCHE": ["msche"],
  "APAC": ["apac"],
  "Reporting": ["report", "submission", "deadline"]
};

async function loadData() {
  try {
    const res = await fetch("dashboard-data.json?_=" + Date.now());
    const data = await res.json();
    document.getElementById("updated").textContent = `Updated ${new Date(data.generated).toLocaleString()}`;
    render(data.events);
  } catch (err) {
    console.error("Failed to load dashboard data", err);
  }
}

function render(events) {
  const template = document.getElementById("event-card");
  const sections = document.querySelectorAll(".cards");
  sections.forEach(sec => (sec.innerHTML = "<p class='empty'>No upcoming items</p>"));

  events.forEach(evt => {
    const section = document.querySelector(`.cards[data-section="${evt.section}"]`);
    if (!section) return;
    section.innerHTML = "";
    const card = template.content.cloneNode(true);
    card.querySelector(".badge").textContent = evt.type;
    card.querySelector("h3").textContent = evt.title;
    card.querySelector(".time").textContent = `${evt.date} — ${evt.time}`;
    card.querySelector(".location").textContent = evt.location || "—";
    section.appendChild(card);
  });
}

loadData();
setInterval(loadData, 15 * 60 * 1000);
