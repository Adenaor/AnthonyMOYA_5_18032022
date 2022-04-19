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
    const displayItemPrice = itemPrice(item.id);

    const displayPrice = Promise.resolve(displayItemPrice);
    displayPrice.then((value) => {
      console.log(value);
    });

    console.log(displayPrice);

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
if (localStorage.length === 0 || items.length === 0) {
  emptyCart();
} else {
  displayQuantityAndPrice();
}

function displayQuantityAndPrice() {
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let item of items) {
    displayItemPrice = itemPrice(item.id);

    const displayTotalPrice = Promise.resolve(displayItemPrice);
    displayTotalPrice.then((value) => {
      let quantity = item.quantity;
      let price = Number(quantity) * value;

      totalQuantity += Number(quantity);
      totalPrice += Number(price);

      quantityBasket.textContent = totalQuantity;
      priceBasket.textContent = totalPrice;
    });
  }
}

function itemPrice(id) {
  return fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((article) => {
      return article.price;
    })
    .catch((error) => {
      alert("Un problème est survenu.");
    });
}

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

if (localStorage.length === 0) {
  emptyCart();
} else {
  for (k = 0; k < deleteItem.length; k++) {
    deleteItem[k].addEventListener("click", (e) => {
      if (
        window.confirm(
          `Voulez-vous retirer cet article du panier ? Cliquer sur OK pour confirmer`
        )
      ) {
        removeItem(e);
        addToItems();
        displayQuantityAndPrice();
        removeDisplay(e);
        location.reload();
      }
    });
  }
}

function removeItem(e) {
  const article =
    e.target.parentElement.parentElement.parentElement.parentElement;
  const articleId = article.dataset.id;
  const articleColor = article.dataset.color;

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
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

// ------------------------------- Validation de prénom ------------------------------

inputFirstName.addEventListener("change", function () {
  validFirstName(this);
});

const validFirstName = function (inputFirstName) {
  // création de la Regexp pour la validation du prénom

  let nameRegExp = /^[a-zA-ZéèêÉÈÊËîïÎÏ]+([-'\s][a-zA-ZéèêÉÈÊËîïÎÏ])?$/;

  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

  if (nameRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.textContent = "";
    return true;
  } else {
    firstNameErrorMsg.textContent =
      "Attention le prénom saisi n'est pas valide";
    return false;
  }
};

// ------------------------------- Validation du nom ------------------------------

inputLastName.addEventListener("change", function () {
  validLastName(this);
});

const validLastName = function (inputLasttName) {
  // création de la Regexp pour la validation du nom

  let nameRegExp = /^[a-zA-ZéèêÉÈÊËîïÎÏ]+([-'\s][a-zA-ZéèêÉÈÊËîïÎÏ]+)?$/;

  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

  if (nameRegExp.test(inputLasttName.value)) {
    lastNameErrorMsg.textContent = "";
    return true;
  } else {
    lastNameErrorMsg.textContent = "Attention le nom saisi n'est pas valide";
    return false;
  }
};

// ------------------------------- Validation de l'adresse ------------------------------

inputAddress.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAddress) {
  // création de la Regexp pour la validation de l'adresse

  let addressRegExp = /^[0-9*]{1,3}[-'\s]+[a-zA-Zéèêëàäçïî]+/;

  let addressErrorMsg = document.getElementById("addressErrorMsg");

  if (addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.textContent = "";
    return true;
  } else {
    addressErrorMsg.textContent = "Attention l'adresse saisie n'est pas valide";
    return false;
  }
};

// ------------------------------- Validation de la ville -------------------------------

inputCity.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  // création de la Regexp pour la validation de la ville

  let cityRegExp = /^[a-zA-ZéèêÉÈÊËçîïÎÏ'\s]+$/;

  let cityErrorMsg = document.getElementById("cityErrorMsg");

  if (cityRegExp.test(inputCity.value)) {
    cityErrorMsg.textContent = "";
    return true;
  } else {
    cityErrorMsg.textContent = "Attention la ville saisie n'est pas valide";
    return false;
  }
};

// ----------------------------- Validation de l'email ---------------------------------------------

inputEmail.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  // création de la Regexp pour la validation email

  let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[a-z]{2,4}$/g;

  let emailErrorMsg = document.getElementById("emailErrorMsg");

  if (emailRegExp.test(inputEmail.value)) {
    emailErrorMsg.textContent = "";
    return true;
  } else {
    emailErrorMsg.textContent = "Attention l'email n'est pas valide";
    return false;
  }
};

// -------------------------- Envoie du formulaire au serveur ------------------------------

submitForm();

function submitForm() {
  const orderBtn = document.getElementById("order");

  orderBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (localStorage.length === 0 || items.length === 0) {
      alert("Veuillez ajouter un article dans votre panier");
    } else if (
      !inputFirstName.value ||
      !inputLastName.value ||
      !inputAddress.value ||
      !inputCity.value ||
      !inputEmail.value
    ) {
      alert("Veuillez remplir tous les champs du formulaire");
    }

    if (
      validFirstName(inputFirstName) &&
      validLastName(inputLastName) &&
      validAddress(inputAddress) &&
      validCity(inputCity) &&
      validEmail(inputEmail)
    ) {
      const order = requestContact();

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const orderId = data.orderId;
          window.location.href = `./confirmation.html?orderId=${orderId}`;
          localStorage.removeItem("data");
        })
        .catch((error) => {
          alert("Un problème est survenu");
        });
    }
  });
}

function requestContact() {
  const productsId = [];
  for (item of items) {
    productsId.push(item.id);
  }

  const order = {
    contact: {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value,
    },
    products: productsId,
  };

  return order;
}
