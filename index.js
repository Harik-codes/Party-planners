let party = [];
let singleParty = null;

const div1 = document.querySelector(".div1");
const div2 = document.querySelector(".div2");

const fetchParty = async () => {
  const response = await fetch(
    "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2605-FTB-ET-WEB-FT/events",
  );
  const data = await response.json();
  party = data.data;
};

const fetchSingleParty = async (id) => {
  const response = await fetch(
    `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2605-FTB-ET-WEB-FT/events/${id}`,
  );
  const data = await response.json();
  singleParty = data.data;
};

div1.addEventListener("click", async (event) => {
  if (event.target.classList.contains("hulk")) {
    await fetchSingleParty(event.target.dataset.partyid);

    render();
  }
});

function render() {
  const html = party.map((element) => {
    return `<h3 class="hulk" data-partyid=${element.id}>${element.name}</h3>`;
  });

  div1.innerHTML = `<h1>Upcoming Parties</h1>${html.join("")}`;

  if (!singleParty) {
    div2.innerHTML = "Please select a party";
  } else {
    div2.innerHTML = `<h1>Party details</h1>
      <h4>${singleParty.name}${singleParty.id}</h4>
      <p>${singleParty.date}</p>
      <p>${singleParty.location}</p>
      <p>${singleParty.description}</p>`;
  }
}

const init = async () => {
  await fetchParty();
  render();
};

init();
