cards = document.querySelector(".cards");
const APIKEY = "Bd32azkab3GXSIrnwPN0xCFNsvHYDNGhTmzvDUSF";
search = document.querySelector(".search-input");
select = document.querySelector("select");
let countries = [];

fetch(`https://restcountries.com/v2/all?apikey=${APIKEY}`)
  .then((response) => response.json())
  .then((data) => {
    countries.push(data);
    showData();
  });

search.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredCountries = countries[0].filter((country) => {
    return country.name.toLowerCase().includes(searchText);
  });
  clearCards();
  showFilteredData(filteredCountries);
});
select.addEventListener("change", (e) => {
  const filteredCountries = countries[0].filter((country) => {
    return country.region.includes(e.target.value);
  });
  clearCards();
  showFilteredData(filteredCountries);
});

const clearCards = () => {
  cards.innerHTML = "";
};
const showData = () => {
  countries[0].map((country) => {
    createCard(country);
  });
  regions = [];
  countries[0]?.map((contry) => {
    regions.push(contry.region);
    regionSet = new Set(regions);
  });
  regionArray = Array.from(regionSet);
  regionArray.map((region) => {
    option = document.createElement("option");
    select.append(option);
    option.textContent = region;
  });
};

const showFilteredData = (filteredData) => {
  filteredData.map((country) => {
    createCard(country);
  });
};
const createCard = (country) => {
  const card = document.createElement("div");
  card.classList.add("card");
  cards.append(card);
  const img_div = document.createElement("div");
  img_div.classList.add("img_div");
  card.append(img_div);

  const img = document.createElement("img");
  img.setAttribute("src", country.flags.png);
  img_div.append(img);

  const description_div = document.createElement("div");
  description_div.classList.add("description_div");
  card.append(description_div);

  const title = document.createElement("h3");
  title.textContent = "Name: " + country.name.slice(0, 20);

  const capital = document.createElement("h3");
  capital.textContent = "Capital: " + country.capital;

  const area = document.createElement("h3");
  area.textContent = "Area: " + country.area + " km²";

  description_div.append(title, capital, area);
};
