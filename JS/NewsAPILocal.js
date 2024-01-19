document.addEventListener("DOMContentLoaded", function () {
  // Chave de API para acessar o NewsAPI
  const apiKey = "561c00b59e9a40aeb8a64a7c052641a3";

  // Seleciona o contêiner onde as notícias serão exibidas
  const newsContainer = document.querySelector(".Container-Cards-Noticias");

  // Função para buscar notícias com base no tema fornecido
  function searchNews(theme) {

    // Constrói a URL da API com o tema fornecido e a chave de API
    const apiUrl = `https://newsapi.org/v2/everything?q=${theme}&language=pt&apiKey=${apiKey}`;

    // Faz uma requisição fetch para a API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Verifica se a resposta da API é bem-sucedida e se há artigos disponíveis
        if (
          data.status === "ok" &&
          data.articles &&
          data.articles.length > 0
        ) {
          // Exibe as notícias na página
          displayNews(data.articles);
        } else {
          // Se não houver artigos, lança um erro
          throw new Error("Nenhum artigo de notícia encontrado");
        }
      })
      .catch((error) => {
        // Trata erros de requisição
        console.error("Erro ao buscar dados de notícias:", error.message);
        newsContainer.innerHTML = `<p>${error.message}</p>`;
      });
  }

  // Função para exibir as notícias na página
  function displayNews(articles) {
    let newsHTML = "";
    articles.forEach((article) => {
      // Verifica se o título do artigo não contém a string "[Removed]"
      if (article.title && !article.title.includes("[Removed]")) {
        // Obtém informações relevantes do artigo
        const categoryName = article.source && article.source.name ? article.source.name : "Desconhecido";
        const imageUrl = article.urlToImage ? article.urlToImage : "img/No-Image.jpg";
        const publishedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Desconhecido";

        // Constrói a estrutura HTML para cada notícia
        newsHTML += `
          <div class="news-card">
              <a class="category" href="#">${categoryName}</a>
              <a href="${article.url}" target="_blank"><img src="${imageUrl}" class="ImgNoti" alt="image"></a>
              <div class="section"><a>${publishedDate}</a></div>
              <h2 class="title"><a href="${article.url}" target="_blank">${article.title}</a></h2>
              <div class="abstract">${article.description}</div></div>`;
      }
    });

    // Exibe as notícias no contêiner ou uma mensagem se não houver notícias
    newsContainer.innerHTML = newsHTML || "<p>Nenhum artigo de notícia encontrado</p>";
  }

  // Seleciona todos os elementos com a classe "tag" (etiquetas de temas)
  const tags = document.querySelectorAll(".tag");

  // Adiciona um evento de clique a cada etiqueta de tema
  tags.forEach((tag) => {
    tag.addEventListener("click", function () {
      // Obtém o texto da etiqueta clicada
      const theme = tag.innerText.trim();
      // Chama a função de busca de notícias com o tema selecionado
      searchNews(theme);
    });
  });

  // Busca inicial com a Tag "Reciclagem"
  searchNews("Reciclagem");
});

