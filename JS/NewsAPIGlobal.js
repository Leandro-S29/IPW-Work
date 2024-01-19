// Definindo a URL da API e a chave de API
const apiUrl = "https://newsnow.p.rapidapi.com/";
const apiKey = "a7151dc613mshfcb614a0c72bbcep1d272cjsn4b9457ed33a2";

// Configurando as opções para a requisição à API
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "newsnow.p.rapidapi.com",
  },
  body: JSON.stringify({
    text: "Aquecimento Global",
    region: "pt-pt",
    language: "pt",
    max_results: 100,
  }),
};

// Aguardando o evento de carregamento do documento antes de chamar a função fetchNews
document.addEventListener("DOMContentLoaded", async function () {
  try {
    await fetchNews();
  } catch (error) {
    console.error("Error fetching news data:", error);
    // Lidar com erro (por exemplo, mostrar uma mensagem ao usuário)
  }
});

// Função assíncrona para buscar notícias
async function fetchNews() {
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  const newsContainer = document.getElementById("newsContainer");

  // Verificando se há dados de notícias e se há notícias disponíveis
  if (data && data.news && data.news.length > 0) {
    // Exibindo as notícias no contêiner especificado
    displayNews(data.news, newsContainer);
  } else {
    // Se não houver notícias, exibe uma mensagem indicando a ausência de artigos
    newsContainer.innerHTML = "<p>No news articles found</p>";
  }
}

// Função assíncrona para buscar notícias por uma tag específica
async function fetchNewsByTag(tag) {
  try {
    const tagOptions = {
      ...options,
      body: JSON.stringify({
        text: tag,
        region: "pt-pt",
        language: "pt",
        max_results: 100,
      }),
    };

    const response = await fetch(apiUrl, tagOptions);
    const data = await response.json();
    const newsContainer = document.getElementById("newsContainer");

    // Verificando se há dados de notícias e se há notícias disponíveis
    if (data && data.news && data.news.length > 0) {
      // Exibindo as notícias no contêiner especificado
      displayNews(data.news, newsContainer);
    } else {
      // Se não houver notícias, exibe uma mensagem indicando a ausência de artigos
      newsContainer.innerHTML = `<p>No news articles found for the tag "${tag}"</p>`;
    }
  } catch (error) {
    console.error("Error fetching news data by tag:", error);
    // Lidar com erro (por exemplo, mostrar uma mensagem ao usuário)
  }
}

// Função para filtrar notícias com base em uma tag específica
function filterNews(tag) {
  if (tag === "all") {
    // Se a tag for "all", busca todas as notícias
    fetchNews();
  } else {
    // Caso contrário, busca notícias pela tag especificada
    fetchNewsByTag(tag);
  }
}

// Função para exibir as notícias no contêiner especificado
function displayNews(articles, container) {
  let newsHTML = '';
  articles.forEach(article => {
    // Construindo o HTML para cada notícia
    newsHTML += `
      <div class="news-card">
        <a class="category" href="#">${article.source}</a>
        <a href="${article.url}" target="_blank">
          <img class="ImgNoti" src="${article.image || 'img/No-Image.jpg'}" alt="News Image">
        </a>
        <div class="section"><a>${formatDate(article.date)}</a></div>
        <h2 class="title"><a href="${article.url}" target="_blank">${article.title}</a></h2>
        <div class="abstract">${article.body || "N/A"}</div>
      </div>`;
  });

  // Inserindo o HTML gerado no contêiner ou exibindo uma mensagem se não houver notícias
  container.innerHTML = newsHTML || "<p>No news articles found</p>";
}

// Função para formatar a data no formato desejado
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString("pt-PT", options);
  return formattedDate;
}
