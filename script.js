const products = [
  { id: 1, name: "Organic Apples", category: "produce", unit: "1 kg", price: 4.99 },
  { id: 2, name: "Fresh Milk", category: "dairy", unit: "1 L", price: 1.89 },
  { id: 3, name: "Sourdough Bread", category: "bakery", unit: "1 loaf", price: 3.49 },
  { id: 4, name: "Dish Soap", category: "household", unit: "500 ml", price: 2.99 },
  { id: 5, name: "Greek Yogurt", category: "dairy", unit: "750 g", price: 5.29 },
  { id: 6, name: "Carrots", category: "produce", unit: "1 kg", price: 2.39 },
  { id: 7, name: "Chocolate Muffins", category: "bakery", unit: "4 pack", price: 4.29 },
  { id: 8, name: "Laundry Detergent", category: "household", unit: "2 L", price: 8.59 },
];

const productGrid = document.querySelector("#products");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const cartCount = document.querySelector("#cart-count");
const themeToggle = document.querySelector("#theme-toggle");

let cartItems = 0;

function drawProducts(items) {
  if (!items.length) {
    productGrid.innerHTML = "<p>No products found. Try a different search.</p>";
    return;
  }

  productGrid.innerHTML = items
    .map(
      (item) => `
        <article class="card">
          <p class="meta">${item.category.toUpperCase()} • ${item.unit}</p>
          <h3>${item.name}</h3>
          <p class="price">$${item.price.toFixed(2)}</p>
          <button data-id="${item.id}">Add to cart</button>
        </article>
      `
    )
    .join("");

  productGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      cartItems += 1;
      cartCount.textContent = cartItems;
    });
  });
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = products.filter((item) => {
    const categoryMatch = category === "all" || item.category === category;
    const queryMatch = item.name.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });

  drawProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

document.querySelector("#year").textContent = new Date().getFullYear();
drawProducts(products);
