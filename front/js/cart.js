const cartItems = document.getElementById("cart__items");
let items = JSON.parse(localStorage.getItem("data"));

// --------------------- Afficahge des produits du panier -----------------------

// ---------------------- Si panier vide ----------------------------------------
const quantityBasket = document.getElementById("totalQuantity");
const priceBasket = document.getElementById("totalPrice");

if (items === null) {
  emptyCart();
} else {
  // --------- Affichage des produits si le panier n'est pas vide ---------------

  let cart = [];
  for (item of items) {
    cart += `
            <article
               
                class="cart__item"
                data-id=${item.id}
                data-color=${item.color} 
            >
             
                <div class="cart__item__img">
                  <img 
                    src=${item.img}
                    alt=${item.alt}
                  />
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${item.title}</h2>
                    <p>${item.color}</p>
                    <p>${item.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input
                        type="number"
                        class="itemQuantity"
                        name="itemQuantity"
                        min="1"
                        max="100"
                        value=${item.quantity}
                      />
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `;
  }
  cartItems.innerHTML = cart;
}

function emptyCart() {
  cartItems.innerHTML = `<p>Votre panier est vide</p>`;
  quantityBasket.textContent = 0;
  priceBasket.textContent = 0;
}

// ---------- Récupération de la quantité et du prix dans le local storage ----------

function displayQuantityAndPrice() {
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let item of items) {
    let quantity = item.quantity;
    let price = Number(quantity) * Number(item.price);

    totalQuantity += Number(quantity);
    totalPrice += Number(price);

    quantityBasket.textContent = totalQuantity;
    priceBasket.textContent = totalPrice;
  }
}

displayQuantityAndPrice();

// ------------------------- Modifier la quantité et du prix---------------------------------

const itemQuantity = document.querySelectorAll(".itemQuantity");

// // -------------  Modifier quantité et prix-----------

for (let j = 0; j < itemQuantity.length; j++) {
  itemQuantity[j].addEventListener("change", (e) => {
    editQuantity(e);
    displayQuantityAndPrice();
    addToItems();
  });
}

function editQuantity(e) {
  const article =
    e.target.parentElement.parentElement.parentElement.parentElement;
  const articleId = article.dataset.id;
  const articleColor = article.dataset.color;

  let newQuantity = e.target.value;

  for (item of items) {
    if (articleId === item.id && articleColor === item.color) {
      item.quantity = newQuantity;
    }
  }
}

// ---------------------- Gérer bouton supprimer -------------

const deleteItem = document.querySelectorAll(".deleteItem");

if (items.length === 0) {
  emptyCart();
} else {
  for (k = 0; k < deleteItem.length; k++) {
    deleteItem[k].addEventListener("click", (e) => {
      window.confirm(
        `Voulez-vous retirer cet article du panier ? Cliquer sur OK pour confirmer`
      );
      removeItem(e);
      addToItems();
      displayQuantityAndPrice();
      removeDisplay(e);

      location.reload();
    });
  }
}
function removeItem(e) {
  const article =
    e.target.parentElement.parentElement.parentElement.parentElement;
  const articleId = article.dataset.id;
  const articleColor = article.dataset.color;

  // let selectIdRemove = items[k].id;
  for (item of items) {
    items = items.filter(
      (item) => item.color != articleColor,
      item.id != articleId
    );
  }
}

function removeDisplay(e) {
  let deleteClicked = e.target;
  deleteClicked.parentElement.parentElement.parentElement.parentElement.remove();
}

function addToItems() {
  localStorage.data = JSON.stringify(items);
}
