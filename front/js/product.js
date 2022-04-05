const price = document.getElementById("price");
const title = document.getElementById("title");
const description = document.getElementById("description");
const itemImg = document.querySelector(".item__img");
const articleColor = document.querySelector("#colors");
const articleQuantity = document.getElementById("quantity");
const addToCardBtn = document.querySelector("button");
const imageArticle = document.createElement("img");
const articleId = getArticleId();

// ------- fonction asynchrone apparition info page produit ------------

(async () => {
  articleId;
  const article = await getArticle(articleId);
  displayInfo(article);
  addToCard();
})();

function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

// ---------------- Retourne l'api d'un seul article -------------------

function getArticle(articleId) {
  return fetch(`http://localhost:3000/api/products/${articleId}`)
    .then((res) => {
      return res.json();
    })
    .then((article) => {
      return article;
    })
    .catch((error) => {
      alert(
        "Un problème est survenu lors du chargement de la page. Veuillez réessayer ultérieurement."
      );
    });
}

// ---------------- Ajoute les infos de l'article ---------------------

function displayInfo(article) {
  // Insertion de l'image

  itemImg.appendChild(imageArticle);

  imageArticle.src = article.imageUrl;
  imageArticle.altTxt = article.altTxt;

  // Insertion du titre
  title.textContent = article.name;

  // Insertion du prix
  price.textContent = article.price;

  // Insertion de la description
  description.textContent = article.description;

  // Insertion des couleursfor
  for (let color of article.colors) {
    colorsOption = document.createElement("option");
    articleColor.appendChild(colorsOption);
    colorsOption.textContent = color;
  }
}
//------------ Article à ajouter au panier-------------------

function addToCard() {
  addToCardBtn.addEventListener("click", () => {
    let colorChoise = articleColor.value;
    let quantityChoise = articleQuantity.value;

    if (
      articleQuantity.value >= 1 &&
      articleQuantity.value < 100 &&
      articleColor.value != ""
    ) {
      let articleAdd = {
        id: articleId,
        price: price.textContent,
        title: title.textContent,
        quantity: quantityChoise,
        color: colorChoise,
        img: imageArticle.src,
        alt: imageArticle.altTxt,
      };

      alert("Cet article a été ajouté à votre panier.");

      // --------------- Gestion du LocalStorage -----------------
      //  -------Stocker les données dans le local storage--------
      const dataStorageAdd = () => {
        dataStorage.push(articleAdd);
        localStorage.data = JSON.stringify(dataStorage);
      };

      let dataStorage = JSON.parse(localStorage.getItem("data"));

      newQuantity = () => {
        for (i = 0; i < dataStorage.length; i++) {
          if (
            dataStorage[i].id === articleId &&
            dataStorage[i].color === colorChoise
          ) {
            dataStorage[i].quantity =
              parseInt(dataStorage[i].quantity, 10) +
              parseInt(quantityChoise, 10);

            localStorage.data = JSON.stringify(dataStorage);
          }
        }
      };

      let inCard = false;

      searchInCard = () => {
        for (i = 0; i < dataStorage.length; i++) {
          if (
            dataStorage[i].id === articleId &&
            dataStorage[i].color === colorChoise
          ) {
            inCard = true;
          }
        }
      };

      //- Convertis les données JSON stockées dans le localStorage en objet JS -

      //-------------  Si produits déjà présents dans le localStorage --------
      if (dataStorage) {
        searchInCard();
        //----------------------- Si ID et couleur identique ------------------
        if (inCard) {
          newQuantity();
          console.log(inCard);
        } else {
          dataStorageAdd();
        }
        console.log(dataStorage);
        //------------------------- Si nouveau produit ----------------------------
      }
      //--------------- Si aucun produit enregistré dans le localStorage ---------
      else {
        dataStorage = [];
        dataStorageAdd();
      }
    } else {
      alert("Attention, les informations saisies sont incorrectes.");
    }
  });
}
