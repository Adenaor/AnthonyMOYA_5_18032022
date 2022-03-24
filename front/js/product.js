const price = document.getElementById("price");
const title = document.getElementById("title");
const description = document.getElementById("description");
const imageArticle = document.querySelector(".item__img");
// console.log(imageArticle);

// fonction asynchrone apparition info page produit

(async function () {
  const articleId = getArticleId();
  //   console.log(articleId);
  const article = await getArticle(articleId);
  // console.log(article);
  displayInfo(article);
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
      //   console.log(articles);
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
  title.textContent = `${article.name}`;

  // Insertion du prix
  price.textContent = `${article.price}`;

  // Insertion de la description
  description.textContent = `${article.description}`;
  // console.log(article);
}
