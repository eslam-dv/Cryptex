let menu = document.getElementById("menu");
let nav = document.querySelector(".navbar");
let navLinks = document.querySelectorAll(".link a");
let tableBody = document.getElementById("table-body");

// Format price into USD
let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const getCoins = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=${API_KEY}`,
    );
    if (!response.ok) {
      return console.error("Failed to fetch data");
    }
    let coins = await response.json();
    return coins;
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

// populate market with coin information
async function populateTable() {
  let coins = await getCoins();
  tableBody.innerHTML = coins
    .map(
      (coin) =>
        `<tr class="table-row">
      <td>
        <button type="button" class="table-star">
          <ion-icon
            name="star-outline"
            onclick="changeIcon(this, 'star', 'star-outline')"
          ></ion-icon>
        </button>
      </td>
      <td class="bold">${coin.market_cap_rank}</td>
      <td class="bold">
        <div class="coin-details">
          <img src="${coin.image}" alt="${coin.id} icon" width="20" height="20" />
          <div class="coin-name">${coin.name}</div>
          <div class="coin-symbol">${coin.symbol.toUpperCase()}</div>
        </div>
      </td>
      <td class="bold">${USDollar.format(coin.current_price)}</td>
      <td class="${coin.price_change_percentage_24h > 0 ? "green" : "red"}">${coin.price_change_percentage_24h > 0 ? "+" + coin.price_change_percentage_24h.toFixed(2) : coin.price_change_percentage_24h.toFixed(2)}%</td>
      <td class="bold hidden-mobile">${USDollar.format(coin.market_cap)}</td>
      <td><a href="#" class="btn trade">Trade</a></td>
    </tr>`,
    )
    .join("");
}

populateTable();

// Change menu element icon
function changeIcon(el, n1, n2) {
  let name = el.getAttribute("name");
  if (name == n1) {
    el.setAttribute("name", n2);
  } else {
    el.setAttribute("name", n1);
  }
  el.classList.toggle("active");
}

// Toggle Mobile Navigation
menu.addEventListener("click", function() {
  nav.classList.toggle("active");
});

// Highlight link on click & close mobile navigation & change menu icon
navLinks.forEach((link) => {
  link.addEventListener("click", function(e) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    nav.classList.remove("active");
    menu.setAttribute("name", "menu");
  });
});
