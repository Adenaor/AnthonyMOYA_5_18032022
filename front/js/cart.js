dataStorage = JSON.parse(localStorage.getItem("data"));

const cartItems = document.getElementById("cart__items");
const quantityBasket = document.getElementById("totalQuantity");
const priceBasket = document.getElementById("totalPrice");

// --------------------- Afficahge des produits du panier -----------------------

// ---------------------- Si panier vide ----------------------------------------

if (dataStorage === null) {
  cartItems.innerHTML = `<p>Votre panier est vide</p>`;
} else {
  let displayArticle = [];

  // --------- Affichage des produits si le panier n'est pas vide ---------------

  for (j = 0; j < dataStorage.length; j++) {
    // console.log("il y a " + dataStorage.length + " articles");
    displayArticle =
      displayArticle +
      `
            <article
                class="cart__item"
                data-id=${dataStorage[j].id}
                data-color=${dataStorage[j].color} 
            >
             
                <div class="cart__item__img">
                  <img
                    src=${dataStorage[j].img}
                    alt=${dataStorage[j].alt}
                  />
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${dataStorage[j].title}</h2>
                    <p>${dataStorage[j].color}</p>
                    <p>${dataStorage[j].price} €</p>
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
                        value=${dataStorage[j].quantity}
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
  cartItems.innerHTML = displayArticle;
}

// ---------- Récupération de la quantité et du prix dans le local storage ----------

let totalQuantity = 0;
let totalPrice = 0;

for (let article of dataStorage) {
  quantity = article.quantity;
  price = Number(quantity) * Number(article.price);

  totalQuantity += Number(quantity);
  totalPrice += Number(price);
  // console.log(totalPrice);

  quantityBasket.textContent = totalQuantity;
  priceBasket.textContent = totalPrice;
}
// ------------------------- Modifier la quantité et du prix---------------------------------

const itemQuantity = document.querySelectorAll(".itemQuantity");

// -------------  Modifier quantité -----------

for (let k = 0; k < dataStorage.length; k++) {
  itemQuantity[k].addEventListener("change", (e) => {
    let newQuantity = e.target.value;
    let newTotalQuantity = totalQuantity;
    let newTotalPrice = totalPrice;

    dataStorage[k].quantity = newQuantity;
    // console.log(dataStorage[k].quantity);

    localStorage.data = JSON.stringify(dataStorage);

    // ------------- Modification prix --------------

    // let newPrice =
    //   Number(dataStorage[k].quantity) * Number(dataStorage[k].price);
    // console.log(newPrice);

    // newTotalPrice += newPrice;
    // newTotalQuantity += Number(dataStorage[k].quantity);
    // console.log(newTotalQuantity);
    // quantityBasket.textContent = newTotalQuantity;
    // priceBasket.textContent = newTotalPrice;
  });
}

// ---------------------- Gérer bouton supprimer -------------

const deleteItem = document.querySelectorAll(".deleteItem");

deleteItem.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    let deleteClicked = e.target;

    if (
      window.confirm(
        `Voulez-vous retirer cet article du panier ? Cliquer sur OK pour confirmer`
      )
    ) {
      deleteClicked.parentElement.parentElement.parentElement.parentElement.remove();
    }
  });
});
