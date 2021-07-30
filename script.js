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
// Seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener());
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
async function makeButtonsListen() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const item = event.target.parentElement;
      async function requestWantedItem() {
        const completeRequest = await
        fetch(`https://api.mercadolibre.com/items/${item.firstChild.innerText}`);
        const request = await completeRequest.json();
        console.log(request);
        document.querySelector('.cart__items')
        .appendChild(createCartItemElement(
          { sku: request.id, name: request.title, salePrice: request.price },
          ));
      }
      requestWantedItem();
    });
  });
}

window.onload = async () => {
  await createItemList();
  await makeButtonsListen();
};
