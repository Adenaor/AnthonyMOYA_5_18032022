const items = document.getElementById("items");

// articles sur la page principale

(async function () {
  const articles = await getArticles();
  for (let article of articles) {
    displayArticle(article);
  }
})();

// appel API récupération articles

function getArticles() {
  return fetch("http://localhost:3000/api/products")
    .then((res) => {
      return res.json();
    })
    .then((articles) => {
      return articles;
    })
    .catch((error) => {
      alert(
        "Un problème est survenu lors du chargement de la page. Veuillez réessayer ultérieurement."
      );
    });
}

// apparition de chaque article

function displayArticle(article) {
  items.innerHTML += ` <a href=./product.html?id=${article._id}>
  <article>
    <img src=${article.imageUrl} alt=${article.altTxt}>
    <h3 class="productName">${article.name}</h3>
    <p class="productDescription">${article.description}</p>
  </article>
</a> `;
}
