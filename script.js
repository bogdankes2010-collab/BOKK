"use strict";

const CONTACT_EMAIL = "bogdankes2010@gmai.com";
const STORAGE_KEY = "bok-tech-cart-v1";
const APPLE_CDN = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/";
const APPLE_WEB = "https://www.apple.com";
const imageUrl = (asset, width = 1100, height = 900) =>
  `${APPLE_CDN}${asset}?wid=${width}&hei=${height}&fmt=jpeg&qlt=90`;
function iphoneFinish(series, color, year, proMax = false) {
  if (series.startsWith("16")) {
    const pro = series.endsWith("Pro");
    const screenSize = pro ? (proMax ? "9" : "3") : "1";
    return imageUrl(`iphone-16${pro ? "-pro" : ""}-finish-select-${year}-6-${screenSize}inch-${color}`);
  }
  const model = `iphone-${series.toLowerCase().replace(" ", "-")}`;
  return imageUrl(`${model}-finish-select-${color}-${year}_AV2`);
}
const iPhoneFinish = (model, color, year) =>
  imageUrl(`${model}-finish-select-${color}-${year}_AV2`);
const filters = {
  "Чёрный": "brightness(.55) saturate(.8)",
  "Чёрный титан": "brightness(.5) saturate(.65)",
  "Космический чёрный": "brightness(.48) saturate(.6)",
  "Space Black": "brightness(.48) saturate(.6)",
  "Midnight": "brightness(.58) saturate(.72)",
  "Тёмно-синий": "hue-rotate(175deg) saturate(.7) brightness(.72)",
  "Deep Blue": "hue-rotate(175deg) saturate(.72) brightness(.72)",
  "Glacier": "brightness(1.15) saturate(.55)",
  "Серебристый": "grayscale(.8) brightness(1.12)",
  "Silver": "grayscale(.8) brightness(1.12)",
  "Белый": "grayscale(.4) brightness(1.25)",
  "White": "grayscale(.4) brightness(1.25)",
  "Starlight": "sepia(.18) brightness(1.16)",
  "Золотой": "sepia(.62) saturate(.72) brightness(1.12)",
  "Citrus": "sepia(.8) hue-rotate(15deg) saturate(1.4) brightness(1.1)",
  "Blush": "sepia(.35) hue-rotate(315deg) saturate(.7) brightness(1.13)",
  "Розовый": "sepia(.3) hue-rotate(315deg) saturate(.85) brightness(1.08)",
  "Лавандовый": "hue-rotate(235deg) saturate(.68) brightness(1.08)",
  "Фиолетовый": "hue-rotate(245deg) saturate(.65) brightness(.96)",
  "Голубой": "hue-rotate(165deg) saturate(.68) brightness(1.05)",
  "Blue": "hue-rotate(165deg) saturate(.68) brightness(1.05)",
  "Жёлтый": "sepia(.7) hue-rotate(5deg) saturate(1.45) brightness(1.15)",
  "Оранжевый": "sepia(.8) saturate(1.6) brightness(1.05)",
  "Оливковый": "sepia(.55) hue-rotate(15deg) saturate(.72) brightness(.78)",
  "Space Gray": "grayscale(.72) brightness(.78)"
};

const iphoneColors = {
  "16": [
    ["Ultramarine", "#4857a2", "ultramarine"],
    ["Teal", "#9bc9bd", "teal"],
    ["Pink", "#f2bdc8", "pink"],
    ["White", "#efefed", "white"],
    ["Black", "#272727", "black"]
  ],
  "16 Pro": [
    ["Natural Titanium", "#aca9a1", "naturaltitanium"],
    ["Desert Titanium", "#c9b59b", "deserttitanium"],
    ["White Titanium", "#efeee9", "whitetitanium"],
    ["Black Titanium", "#454440", "blacktitanium"]
  ],
  "17": [
    ["Lavender", "#d6c9e8", "lavender"],
    ["Sage", "#c4d4c5", "sage"],
    ["Mist Blue", "#c5d8e9", "mistblue"],
    ["White", "#f1f0ed", "white"],
    ["Black", "#272727", "black"]
  ],
  "17 Pro": [
    ["Silver", "#d8d9d6", "silver"],
    ["Cosmic Orange", "#d8793f", "cosmicorange"],
    ["Deep Blue", "#394960", "deepblue"]
  ],
  "18 Pro": [
    ["Burgundy", "#722f43", "burgundy"],
    ["Glacier", "#dce1e5", "glacier"],
    ["Silver", "#dededb", "silver"],
    ["Black", "#202020", "black"]
  ]
};

function colorsFrom(names, baseImage, makeImage) {
  return names.map(([name, hex, slug]) => ({
    name,
    hex,
    image: makeImage ? makeImage(slug) : baseImage,
    fallback: baseImage,
    filter: filters[name] || "none"
  }));
}

function phone(name, series, price, year, storage = ["128 GB", "256 GB", "512 GB"]) {
  const proMax = name.includes("Pro Max");
  const base = iphoneFinish(series, iphoneColors[series][0][2], year, proMax);
  return {
    id: name.toLowerCase().replaceAll(" ", "-"),
    name,
    category: "phones",
    type: "iPhone",
    price,
    label: `${series} / iPhone`,
    description: "Выбери точную модель, цвет корпуса и объём памяти.",
    storage,
    gallery: [base, base, base],
    colors: colorsFrom(iphoneColors[series], base, (slug) => iphoneFinish(series, slug, year, proMax))
  };
}

const products = [
  phone("iPhone 16", "16", 849, "202409"),
  phone("iPhone 16 Pro", "16 Pro", 1099, "202409", ["128 GB", "256 GB", "512 GB", "1 TB"]),
  phone("iPhone 16 Pro Max", "16 Pro", 1199, "202409", ["256 GB", "512 GB", "1 TB"]),
  phone("iPhone 17", "17", 949, "202509"),
  phone("iPhone 17 Pro", "17 Pro", 1249, "202509", ["256 GB", "512 GB", "1 TB"]),
  phone("iPhone 17 Pro Max", "17 Pro", 1449, "202509", ["256 GB", "512 GB", "1 TB", "2 TB"]),
  phone("iPhone 18 Pro", "18 Pro", 1299, "202609", ["256 GB", "512 GB", "1 TB", "2 TB"]),
  phone("iPhone 18 Pro Max", "18 Pro", 1499, "202609", ["256 GB", "512 GB", "1 TB", "2 TB"]),
  {
    id: "macbook-neo",
    name: "MacBook Neo",
    category: "laptops",
    type: "MacBook · 13″",
    price: 699,
    label: "НОВИНКА / A18 Pro",
    description: "13-дюймовый MacBook для повседневных задач.",
    storage: ["256 GB", "512 GB"],
    gallery: ["silver", "blush", "citrus"],
    colors: [
      { name: "Silver", hex: "#c5c7c9", image: `${APPLE_WEB}/v/macbook-neo/c/images/overview/product-viewer/pv_colors_silver__bhbd7o8mxxzm_large.jpg`, fallback: `${APPLE_WEB}/v/macbook-neo/c/images/overview/highlights/highlights_colors_endframe__c5rr2wp9mp0m_large.jpg`, filter: "none" },
      { name: "Blush", hex: "#e8b9bd", image: `${APPLE_WEB}/v/macbook-neo/c/images/overview/product-viewer/pv_colors_blush__fji4uke74w2m_large.jpg`, fallback: `${APPLE_WEB}/v/macbook-neo/c/images/overview/highlights/highlights_colors_endframe__c5rr2wp9mp0m_large.jpg`, filter: "none" },
      { name: "Citrus", hex: "#d7dc78", image: `${APPLE_WEB}/v/macbook-neo/c/images/overview/product-viewer/pv_colors_citrus__flplef60bpim_large.jpg`, fallback: `${APPLE_WEB}/v/macbook-neo/c/images/overview/highlights/highlights_colors_endframe__c5rr2wp9mp0m_large.jpg`, filter: "none" },
      { name: "Indigo", hex: "#5e648a", image: `${APPLE_WEB}/v/macbook-neo/c/images/overview/product-viewer/pv_colors_indigo__ee1m3vsakryq_large.jpg`, fallback: `${APPLE_WEB}/v/macbook-neo/c/images/overview/highlights/highlights_colors_endframe__c5rr2wp9mp0m_large.jpg`, filter: "none" }
    ]
  },
  ...["13″", "15″"].map((size, index) => {
    const base = [
      "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_skyblue__eepkvlvjzcia_large.jpg",
      "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_silver__dcf8hwixw2uu_large.jpg",
      "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_starlight__dtojfd6ibywm_large.jpg",
      "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_midnight__fvf2p6124tqq_large.jpg"
    ][0];
    const colors = [
      ["Sky Blue", "#9bcbe7", "skyblue"],
      ["Silver", "#d8d9da", "silver"],
      ["Starlight", "#e8ddca", "starlight"],
      ["Midnight", "#303744", "midnight"]
    ].map(([name, hex, slug], colorIndex) => ({
      name, hex,
      image: [
        "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_skyblue__eepkvlvjzcia_large.jpg",
        "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_silver__dcf8hwixw2uu_large.jpg",
        "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_starlight__dtojfd6ibywm_large.jpg",
        "https://www.apple.com/v/macbook-air/z/images/overview/design/color/design_top_midnight__fvf2p6124tqq_large.jpg"
      ][colorIndex],
      fallback: base,
      filter: filters[name] || "none"
    }));
    return {
      id: `macbook-air-${index === 0 ? "13" : "15"}`,
      name: `MacBook Air ${size}`,
      category: "laptops",
      type: `MacBook Air · M5 · ${size}`,
      price: index === 0 ? 1199 : 1499,
      label: "M5 / FANLESS",
      description: "Тонкий и лёгкий ноутбук с бесшумной конструкцией.",
      storage: ["16 GB / 512 GB", "16 GB / 1 TB", "24 GB / 1 TB"],
      gallery: [base, base, base],
      colors
    };
  }),
  ...["14″", "16″"].map((size, index) => {
    const base = imageUrl("mac-macbook-pro-size-unselect-202601-gallery-1");
    return {
      id: `macbook-pro-${index === 0 ? "14" : "16"}`,
      name: `MacBook Pro ${size}`,
      category: "laptops",
      type: `MacBook Pro · ${size}`,
      price: index === 0 ? 1799 : 2799,
      label: index === 0 ? "M5 / M5 PRO / M5 MAX" : "M5 PRO / M5 MAX",
      description: "Высокая производительность для сложных творческих задач.",
      storage: ["16 GB / 512 GB", "24 GB / 1 TB", "36 GB / 1 TB"],
      gallery: [base, base, base],
      colors: colorsFrom([
        ["Space Black", "#28292b", "spaceblack"],
        ["Silver", "#dededc", "silver"]
      ], base)
    };
  }),
  {
    id: "ipad-pro-11",
    name: "iPad Pro 11″",
    category: "tablets",
    type: "iPad Pro · M5",
    price: 999,
    label: "M5 / PRO DISPLAY",
    description: "Компактный профессиональный планшет с дисплеем Ultra Retina XDR.",
    storage: ["256 GB", "512 GB", "1 TB", "2 TB"],
    gallery: ["spaceblack", "silver"],
    colors: colorsFrom([["Space Black", "#28292b", "spaceblack"], ["Silver", "#dededc", "silver"]], imageUrl("ipad-pro-11-witb-spaceblack-wifi-202405"), (slug) => imageUrl(`ipad-pro-11-witb-${slug}-wifi-202405`))
  },
  {
    id: "ipad-pro-13",
    name: "iPad Pro 13″",
    category: "tablets",
    type: "iPad Pro · M5",
    price: 1299,
    label: "M5 / PRO DISPLAY",
    description: "Большой профессиональный планшет для творчества и работы.",
    storage: ["256 GB", "512 GB", "1 TB", "2 TB"],
    gallery: ["spaceblack", "silver"],
    colors: colorsFrom([["Space Black", "#28292b", "spaceblack"], ["Silver", "#dededc", "silver"]], imageUrl("ipad-pro-13-witb-spaceblack-wifi-202405"), (slug) => imageUrl(`ipad-pro-13-witb-${slug}-wifi-202405`))
  },
  ...["11″", "13″"].map((size, index) => {
    const base = imageUrl("ipad-air-witb-blue-11in-wifi-202405");
    return {
      id: `ipad-air-${index === 0 ? "11" : "13"}`,
      name: `iPad Air ${size}`,
      category: "tablets",
      type: `iPad Air · M4 · ${size}`,
      price: index === 0 ? 699 : 899,
      label: "M4 / ALL-ROUND",
      description: "Универсальный планшет для учёбы, работы и развлечений.",
      storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
      gallery: ["blue", "purple", "starlight"],
      colors: colorsFrom([
        ["Blue", "#8db5d5", "blue"],
        ["Purple", "#bbb2cf", "purple"],
        ["Starlight", "#e8ddca", "starlight"],
        ["Space Gray", "#777a7f", "spacegray"]
      ], base, (slug) => imageUrl(`ipad-air-witb-${slug}-${index === 0 ? "11" : "13"}in-wifi-202405`))
    };
  }),
  {
    id: "ipad",
    name: "iPad",
    category: "tablets",
    type: "iPad · A16",
    price: 449,
    label: "A16 / EVERYDAY",
    description: "Универсальный iPad для общения, видео и повседневных дел.",
    storage: ["128 GB", "256 GB", "512 GB"],
    gallery: [imageUrl("ipad-compare-header-202405"), imageUrl("ipad-compare-header-202405"), imageUrl("ipad-compare-header-202405")],
    colors: colorsFrom([
      ["Blue", "#8db5d5", "blue"],
      ["Pink", "#e5b8c1", "pink"],
      ["Yellow", "#e6d16b", "yellow"],
      ["Silver", "#dededc", "silver"]
    ], imageUrl("ipad-compare-header-202405"))
  },
  {
    id: "ipad-mini",
    name: "iPad mini",
    category: "tablets",
    type: "iPad mini · A17 Pro",
    price: 649,
    label: "A17 PRO / COMPACT",
    description: "Компактный планшет, который удобно брать с собой.",
    storage: ["128 GB", "256 GB", "512 GB"],
    gallery: ["spacegray", "blue", "purple"],
    colors: colorsFrom([
      ["Space Gray", "#777a7f", "spacegray"],
      ["Blue", "#8db5d5", "blue"],
      ["Purple", "#bbb2cf", "purple"],
      ["Starlight", "#e8ddca", "starlight"]
    ], imageUrl("ipad-mini-witb-wifi-spacegray-202410"), (slug) => imageUrl(`ipad-mini-witb-wifi-${slug}-202410`))
  }
];

const productGrid = document.querySelector("#productGrid");
const resultCount = document.querySelector("#resultCount");
const emptyResults = document.querySelector("#emptyResults");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const cartDrawer = document.querySelector("#cartDrawer");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const cartLines = document.querySelector("#cartLines");
const cartCount = document.querySelector("#cartCount");
const drawerCount = document.querySelector("#drawerCount");
const cartSubtotal = document.querySelector("#cartSubtotal");
const startCheckout = document.querySelector("#startCheckout");
const checkoutDialog = document.querySelector("#checkoutDialog");
const checkoutForm = document.querySelector("#checkoutForm");
const formError = document.querySelector("#formError");
const productDialog = document.querySelector("#productDialog");
const detailImage = document.querySelector("#detailImage");
const galleryThumbnails = document.querySelector("#galleryThumbnails");

let selectedCategory = "all";
let cart = loadCart();
let activeProduct = null;
let activePhotoIndex = 0;
let selectedStorage = "";
let selectedColor = "";

function loadCart() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((line) => {
      const product = products.find((item) => item.id === line.id);
      return product && product.storage.includes(line.storage) &&
        product.colors.some((color) => color.name === line.color) &&
        Number.isInteger(line.quantity) && line.quantity > 0;
    });
  } catch (error) {
    console.error("Не удалось загрузить корзину из браузера.", error);
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function formatPrice(value) {
  return `€${value.toLocaleString("de-DE")}`;
}

function installImageFallback(image, fallback, filter) {
  image.onerror = () => {
    if (image.dataset.didFallback === "true") return;
    image.dataset.didFallback = "true";
    image.src = fallback;
    image.style.filter = filter;
  };
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  let visible = products.filter((product) => {
    const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
    const text = `${product.name} ${product.type} ${product.description}`.toLocaleLowerCase("ru");
    return matchCategory && text.includes(query);
  });
  if (sortSelect.value === "price-asc") visible.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "price-desc") visible.sort((a, b) => b.price - a.price);
  if (sortSelect.value === "name") visible.sort((a, b) => a.name.localeCompare(b.name, "ru"));
  productGrid.innerHTML = visible.map((product) => {
    const color = product.colors[0];
    return `
      <article class="product-card">
        <div class="product-photo" data-product="${product.id}" role="button" tabindex="0" aria-label="Подробнее: ${product.name}">
          <img src="${color.image}" alt="${product.name}, цвет ${color.name}" loading="lazy" style="filter:${color.filter}" data-fallback="${color.fallback}">
          <span class="product-label">${product.label}</span>
        </div>
        <div class="product-info">
          <div class="product-title-line">
            <h3><button class="product-name" type="button" data-product="${product.id}">${product.name}</button></h3>
            <span class="product-price">от ${formatPrice(product.price)}</span>
          </div>
          <p class="product-description">${product.type} · ${product.colors.length} цвета</p>
          <div class="product-actions"><button class="add-button" type="button" data-product="${product.id}">Выбрать цвет и память ↗</button></div>
        </div>
      </article>
    `;
  }).join("");
  productGrid.querySelectorAll(".product-photo img").forEach((image) => {
    installImageFallback(image, image.dataset.fallback, image.style.filter);
  });
  resultCount.textContent = `Показано ${visible.length} из ${products.length} устройств`;
  emptyResults.hidden = visible.length !== 0;
}

function openProduct(id) {
  showProduct(id);
  history.pushState({ bokProduct: id, bokCategory: selectedCategory }, "", `#product/${encodeURIComponent(id)}`);
}

function showProduct(id) {
  activeProduct = products.find((product) => product.id === id);
  if (!activeProduct) return;
  activePhotoIndex = 0;
  selectedStorage = activeProduct.storage[0];
  selectedColor = activeProduct.colors[0].name;
  document.querySelector("#detailType").textContent = activeProduct.type.toUpperCase();
  document.querySelector("#detailTitle").textContent = activeProduct.name;
  document.querySelector("#detailPrice").textContent = `от ${formatPrice(activeProduct.price)}`;
  document.querySelector("#detailDescription").textContent = activeProduct.description;
  document.querySelector("#detailLabel").textContent = activeProduct.label;
  document.querySelector("#storageLabel").textContent = activeProduct.category === "laptops" ? "Конфигурация" : "Память";
  renderGallery();
  renderOptions();
  if (!productDialog.open) productDialog.showModal();
}

function renderGallery() {
  const color = activeProduct.colors.find((item) => item.name === selectedColor);
  const src = color.image;
  detailImage.src = src;
  detailImage.dataset.didFallback = "false";
  detailImage.alt = `${activeProduct.name}, ${color.name}`;
  detailImage.style.filter = color.filter;
  detailImage.style.transform = ["scale(1)", "scale(1.2)", "scale(1.4)"][activePhotoIndex];
  installImageFallback(detailImage, color.fallback, color.filter);
  document.querySelector("#galleryPosition").textContent = `${activePhotoIndex + 1} / ${activeProduct.gallery.length}`;
  galleryThumbnails.innerHTML = activeProduct.gallery.map((_, index) => `
    <button class="gallery-thumbnail ${index === activePhotoIndex ? "is-active" : ""}" type="button" data-photo-index="${index}" aria-label="Показать ракурс ${index + 1}">
      <img src="${src}" alt="" loading="lazy" style="filter:${color.filter};transform:${["scale(1)", "scale(1.2)", "scale(1.4)"][index]}" data-fallback="${color.fallback}">
    </button>
  `).join("");
  galleryThumbnails.querySelectorAll("img").forEach((image) => installImageFallback(image, image.dataset.fallback, color.filter));
}

function renderOptions() {
  document.querySelector("#selectedColorName").textContent = selectedColor;
  document.querySelector("#colorOptions").innerHTML = activeProduct.colors.map((color) => `
    <button class="color-option ${color.name === selectedColor ? "is-active" : ""}" type="button" data-color="${color.name}" aria-label="Цвет ${color.name}" aria-pressed="${color.name === selectedColor}">
      <span style="background-color:${color.hex}"></span>
    </button>
  `).join("");
  document.querySelector("#storageOptions").innerHTML = activeProduct.storage.map((value) => `
    <button class="size-option ${value === selectedStorage ? "is-active" : ""}" type="button" data-storage="${value}" aria-pressed="${value === selectedStorage}">${value}</button>
  `).join("");
}

function changePhoto(index) {
  activePhotoIndex = (index + activeProduct.gallery.length) % activeProduct.gallery.length;
  renderGallery();
}

function renderCart() {
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.id);
    return sum + (product ? product.price * line.quantity : 0);
  }, 0);
  cartCount.textContent = String(count);
  drawerCount.textContent = `(${count})`;
  cartSubtotal.textContent = formatPrice(subtotal);
  startCheckout.disabled = cart.length === 0;
  if (!cart.length) {
    cartLines.innerHTML = '<p class="cart-empty">Корзина пока пуста. Выбери устройство из каталога.</p>';
    return;
  }
  cartLines.innerHTML = cart.map((line) => {
    const product = products.find((item) => item.id === line.id);
    const color = product.colors.find((item) => item.name === line.color);
    return `
      <article class="cart-line">
        <img src="${color.image}" alt="" loading="lazy" style="filter:${color.filter}" data-fallback="${color.fallback}">
        <div class="cart-line-main">
          <strong>${product.name}</strong>
          <span>${line.storage} · ${line.color}</span>
          <div class="quantity-control" aria-label="Количество">
            <button type="button" data-quantity="${product.id}|${line.storage}|${line.color}|-1" aria-label="Уменьшить количество">−</button>
            <span>${line.quantity}</span>
            <button type="button" data-quantity="${product.id}|${line.storage}|${line.color}|1" aria-label="Увеличить количество">+</button>
          </div>
        </div>
        <div class="cart-line-side">
          <strong>${formatPrice(product.price * line.quantity)}</strong>
          <span class="cart-swatch" title="${line.color}" style="background-color:${color.hex}"></span>
          <button class="remove-line" type="button" data-remove="${product.id}|${line.storage}|${line.color}">Удалить</button>
        </div>
      </article>
    `;
  }).join("");
  cartLines.querySelectorAll("img").forEach((image) => installImageFallback(image, image.dataset.fallback, image.style.filter));
}

function addToCart() {
  const existing = cart.find((item) =>
    item.id === activeProduct.id && item.storage === selectedStorage && item.color === selectedColor);
  if (existing) existing.quantity += 1;
  else cart.push({ id: activeProduct.id, storage: selectedStorage, color: selectedColor, quantity: 1 });
  saveCart();
  renderCart();
  productDialog.close();
  openCart();
}

function updateQuantity(id, storage, color, delta) {
  const line = cart.find((item) => item.id === id && item.storage === storage && item.color === color);
  if (!line) return;
  line.quantity += delta;
  if (line.quantity <= 0) cart = cart.filter((item) => item !== line);
  saveCart();
  renderCart();
}

function removeLine(id, storage, color) {
  cart = cart.filter((item) => item.id !== id || item.storage !== storage || item.color !== color);
  saveCart();
  renderCart();
}

function setCategory(category, pushHistory) {
  selectedCategory = category;
  document.querySelectorAll("[data-filter]").forEach((button) =>
    button.classList.toggle("is-active", button.dataset.filter === category));
  if (pushHistory) history.pushState({ bokCategory: category }, "", `#catalog/${category}`);
  renderProducts();
}

function closeProductAndHistory() {
  if (history.state?.bokProduct === activeProduct?.id) history.back();
  else productDialog.close();
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  drawerBackdrop.hidden = false;
  document.body.classList.add("drawer-open");
  document.querySelector("#closeCart").focus();
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  drawerBackdrop.hidden = true;
  document.body.classList.remove("drawer-open");
  document.querySelector("#openCart").focus();
}

function createOrderMessage(form) {
  const lines = cart.map((line) => {
    const product = products.find((item) => item.id === line.id);
    return `- ${product.name}, ${line.storage}, цвет: ${line.color}, количество: ${line.quantity}, сумма: ${formatPrice(product.price * line.quantity)}`;
  });
  const subtotal = cart.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.id);
    return sum + product.price * line.quantity;
  }, 0);
  return [
    "Здравствуйте! Хочу оформить заказ BOK.", "", "УСТРОЙСТВА:", ...lines,
    `Сумма: ${formatPrice(subtotal)}`, "Доставка: прошу уточнить.", "",
    "ДАННЫЕ ПОКУПАТЕЛЯ:",
    `Имя: ${form.get("name")}`,
    `Телефон: ${form.get("phone")}`,
    `E-mail: ${form.get("email")}`,
    `Адрес доставки: ${form.get("address")}`,
    `Пожелания: ${form.get("notes")?.toString().trim() || "Нет"}`
  ].join("\n");
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.filter !== selectedCategory) setCategory(button.dataset.filter, true);
  });
});
document.querySelectorAll("[data-category-link]").forEach((link) => {
  link.addEventListener("click", () => setCategory(link.dataset.categoryLink, true));
});
productGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-product]");
  if (trigger) openProduct(trigger.dataset.product);
});
productGrid.addEventListener("keydown", (event) => {
  const trigger = event.target.closest('[data-product][role="button"]');
  if (trigger && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openProduct(trigger.dataset.product);
  }
});
document.querySelector("#colorOptions").addEventListener("click", (event) => {
  const option = event.target.closest("[data-color]");
  if (!option) return;
  selectedColor = option.dataset.color;
  renderOptions();
  renderGallery();
});
document.querySelector("#storageOptions").addEventListener("click", (event) => {
  const option = event.target.closest("[data-storage]");
  if (!option) return;
  selectedStorage = option.dataset.storage;
  renderOptions();
});
galleryThumbnails.addEventListener("click", (event) => {
  const button = event.target.closest("[data-photo-index]");
  if (button) changePhoto(Number(button.dataset.photoIndex));
});
document.querySelector("#galleryPrev").addEventListener("click", () => changePhoto(activePhotoIndex - 1));
document.querySelector("#galleryNext").addEventListener("click", () => changePhoto(activePhotoIndex + 1));
document.querySelector("#detailAddToCart").addEventListener("click", addToCart);
document.querySelector("#closeProduct").addEventListener("click", closeProductAndHistory);
document.querySelector("#closeProductMobile").addEventListener("click", closeProductAndHistory);
productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) closeProductAndHistory();
});
productDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeProductAndHistory();
});
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);
document.querySelector("#openCart").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);
drawerBackdrop.addEventListener("click", closeCart);
document.querySelector("#clearCart").addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});
cartLines.addEventListener("click", (event) => {
  const quantity = event.target.closest("[data-quantity]");
  const remove = event.target.closest("[data-remove]");
  if (quantity) {
    const [id, storage, color, delta] = quantity.dataset.quantity.split("|");
    updateQuantity(id, storage, color, Number(delta));
  }
  if (remove) {
    const [id, storage, color] = remove.dataset.remove.split("|");
    removeLine(id, storage, color);
  }
});
startCheckout.addEventListener("click", () => {
  if (!cart.length) return;
  closeCart();
  formError.hidden = true;
  checkoutDialog.showModal();
});
document.querySelector("#closeCheckout").addEventListener("click", () => checkoutDialog.close());
checkoutDialog.addEventListener("click", (event) => {
  if (event.target === checkoutDialog) checkoutDialog.close();
});
checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) {
    formError.textContent = "Корзина пуста. Добавь устройство перед оформлением.";
    formError.hidden = false;
    return;
  }
  const form = new FormData(checkoutForm);
  const subject = encodeURIComponent("Заказ техники из магазина BOK");
  const body = encodeURIComponent(createOrderMessage(form));
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  checkoutDialog.close();
});
window.addEventListener("popstate", (event) => {
  if (event.state?.bokProduct) {
    selectedCategory = event.state.bokCategory || selectedCategory;
    showProduct(event.state.bokProduct);
    return;
  }
  if (productDialog.open) productDialog.close();
  if (event.state?.bokCategory) setCategory(event.state.bokCategory, false);
  else if (window.location.hash === "#catalog") setCategory("all", false);
});

renderProducts();
renderCart();
