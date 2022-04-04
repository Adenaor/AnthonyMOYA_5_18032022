dataStorage = JSON.parse(localStorage.getItem("data"));

const cartItems = document.getElementById("cart__items");
const deleteArticle = document.getElementsByClassName("deleteItem");
// ------------------ Afficahge des produits du panier -----------------

// Si panier vide

if (dataStorage === null) {
  cartItems.innerHTML = `<p>Votre panier est vide</p>`;
} else {
  let displayArticle = [];
  // Affichage des produits si le panier n'est pas vide
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

// ----------------------- Supprimer les articles ----------------------------------
