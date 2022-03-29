const price = document.getElementById("price");
const title = document.getElementById("title");
const description = document.getElementById("description");
const imageArticle = document.querySelector(".item__img");
const articleColor = document.querySelector("#colors");
const articleQuantity = document.getElementById("quantity");
const addToCardBtn = document.querySelector("button");
const articleId = getArticleId();

// fonction asynchrone apparition info page produit

(async () => {
  articleId;
  const article = await getArticle(articleId);
  displayInfo(article);
  addToCard();
})();

function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

// Retourne l'api d'un seul article

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

// Ajoute les infos de l'article

function displayInfo(article) {
  // Insertion de l'image
  imageArticle.innerHTML = `<img src=${article.imageUrl} alt=${article.altTxt} />`;

  // Insertion du titre
  title.textContent = article.name;

  // Insertion du prix
  price.textContent = article.price;

  // Insertion de la description
  description.textContent = article.description;
  // console.log(article);

  // Insertion des couleursfor
  for (let color of article.colors) {
    colorsOption = document.createElement("option");
    articleColor.appendChild(colorsOption);
    colorsOption.textContent = color;
  }
}

function addToCard() {
  addToCardBtn.addEventListener("click", () => {
    let colorChoise = articleColor.value;
    let quantityChoise = articleQuantity.value;

    if (
      articleQuantity.value >= 1 &&
      articleQuantity.value < 100 &&
      articleColor.value != ""
    ) {
      // Article à ajouter au panier
      let articleAdd = {
        id: articleId,
        price: price.textContent,
        title: title.textContent,
        quantity: quantityChoise,
        color: colorChoise,
        img: imageArticle.innerHTML,
      };

      console.log(articleAdd);

      alert("Cet article a été ajouté à votre panier.");

      // Paramétrer le LocalStorage

      const dataStorage = [];

      localStorage.articleData = JSON.stringify(articleAdd);

      dataStorage.push(articleAdd);

      console.log(dataStorage);
    } else {
      alert("Attention, les informations saisies sont incorrectes.");
    }
  });
}
