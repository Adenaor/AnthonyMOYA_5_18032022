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

// ------------------------- Modifier la quantité et du prix ---------------------------------

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

// --------------------------------- Gestion du formulaire ---------------------------------

// -------------------- Création des expressions régulières ---------------------------

let form = document.querySelector(".cart__order__form");

// ------------------------------- Validation de prénom ------------------------------

form.firstName.addEventListener("change", function () {
  validFirstName(this);
});

const validFirstName = function (inputFirstName) {
  // création de la Regexp pour la validation du prénom

  let nameRegExp =
    /^[a-zA-ZéèêÉÈÊËîïÎÏ][a-zéèêëàäçïî]+([-'\s][a-zA-ZéèêÉÈÊËîïÎÏ][a-zéèêëàäçïî]+)?/;

  let testFirstName = nameRegExp.test(inputFirstName.value);
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

  if (testFirstName) {
    firstNameErrorMsg.textContent = "";
  } else {
    firstNameErrorMsg.textContent =
      "Attention le prénom saisi n'est pas valide";
  }
};

// ------------------------------- Validation du nom ------------------------------
form.lastName.addEventListener("change", function () {
  validLastName(this);

  console.log(form.lasttName);
});

const validLastName = function (inputLasttName) {
  // création de la Regexp pour la validation du nom

  let nameRegExp =
    /^[a-zA-ZéèêÉÈÊËîïÎÏ][a-zéèêëàäçïî]+([-'\s][a-zA-ZéèêÉÈÊËîïÎÏ][a-zéèêëàäçïî]+)?/;

  let testLastName = nameRegExp.test(inputLasttName.value);
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

  if (testLastName) {
    lastNameErrorMsg.textContent = "";
  } else {
    lastNameErrorMsg.textContent = "Attention le nom saisi n'est pas valide";
  }
};

// ------------------------------- Validation de l'adresse------------------------------
form.address.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAddress) {
  // création de la Regexp pour la validation de l'adresse

  let addressRegExp = /^[0-9*]{1,3}[-'\s]+[a-zA-Zéèêëàäçïî]+/;

  let testAddress = addressRegExp.test(inputAddress.value);
  let addressErrorMsg = document.getElementById("addressErrorMsg");

  if (testAddress) {
    addressErrorMsg.textContent = "";
  } else {
    addressErrorMsg.textContent = "Attention l'adresse saisie n'est pas valide";
  }
};

// ------------------------------- Validation de la ville------------------------------

form.city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  // création de la Regexp pour la validation de la ville

  let cityRegExp = /^[a-zA-ZéèêÉÈÊËçîïÎÏ'\s]+/;

  let testCity = cityRegExp.test(inputCity.value);
  let cityErrorMsg = document.getElementById("cityErrorMsg");

  if (testCity) {
    cityErrorMsg.textContent = "";
  } else {
    cityErrorMsg.textContent = "Attention la ville saisie n'est pas valide";
  }
};
// -------------------- Validation de l'email ---------------------------------------------

form.email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  // création de la Regexp pour la validation email

  let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let testEmail = emailRegExp.test(inputEmail.value);
  let emailErrorMsg = document.getElementById("emailErrorMsg");

  if (testEmail) {
    emailErrorMsg.textContent = "";
  } else {
    emailErrorMsg.textContent = "Attention l'email n'est pas valide";
  }
};

// const orderBtn = document.getElementById("order");
// orderBtn.addEventListener("click", (e) => submitForm(e));

// function submitForm(e) {
//   e.preventDefault();
// }
