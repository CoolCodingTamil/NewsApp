let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let search = urlParams.get("country");  
let getCountryName = sessionStorage.getItem("countryClicked");
let mainDiv = document.querySelector(".article__container");

if(queryString == ''){
    window.location.pathname = "/index.html";
} else {
    let headline__text = document.querySelector(".headline-text");
    headline__text.innerHTML = `TOP HEADLINES IN ${getCountryName}`;

    let countryurl = `https://newsapi.org/v2/top-headlines?country=${search}&apiKey=a7285fd31a16439aa680977d467c767a`;
    fetch(countryurl)
    .then((response) => response.text())
    .then((result) => countryParse(result));

    function countryParse(ks){
        let data = JSON.parse(ks);
        console.log(data);
        data.articles.forEach(apiData => {
          let title = apiData.title;
          let desc = apiData.description;
          let url = apiData.url;
          let urlToImage = apiData.urlToImage;
          let source = apiData.source.name;
          if(urlToImage != null){
          let htmlLiteralData = `     
          <div class="article__content">
          <div class="article__grid">
              <div class="article__title">
                  <h3><a href="${url}" target="_blank">${title}</a></h3>
              </div>
              <div class="article__description">
                  <p>${desc}</p>
              </div>
              <div class="article__source">
                  <span>Source: ${source}</span>
              </div>
          </div>
          <div class="article__grid-2">
              <div class="article__image">
                  <img src="${urlToImage}" id="myImg" alt="${title}">
              </div>
          </div>
      </div>
          `;
          mainDiv.innerHTML += htmlLiteralData;
          }
        });
    }
}    