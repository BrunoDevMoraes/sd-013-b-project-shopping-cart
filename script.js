function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove('li');
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener); // Pq só funciona sem os () de cartItemClickListener?
  return li;
}

// 1
async function createItemList() {
  const completeRequest = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const request = await completeRequest.json();
  const computers = request.results;
  const list = document.querySelector('.items');
  computers.forEach((computer) => {
    list.appendChild(createProductItemElement(computer));
  });
}

// 2
function createLiElement(id) {
  const cartItems = document.querySelector('.cart__items');
  fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((request) => request.json())
  .then((data) => cartItems.appendChild(createCartItemElement(data)));
}

function catchId() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const wantedId = getSkuFromProductItem(event.target.parentElement);
      createLiElement(wantedId);
    });
});
}

window.onload = async () => {
  await createItemList();
  catchId();
};
