setTimeout(fix_category, 6000);
let apiKey = "a7285fd31a16439aa680977d467c767a";
let mainDiv = document.querySelector(".article__container");
let country = "us";
let queryString = window.location.search;
let headline__text = document.querySelector(".headline-text");
let category = "general";
let categorylists = {
  lists : ['business', 'entertainment' , 'health' , 'science' , 'sports' ,'technology']
}
localStorage.setItem("category", category);
fetch('https://api.ipregistry.co/?key=76jb3dw0rcceqmgl')
    .then(function (response) {
        return response.json();
    })
    .then(function (payload) {
     let countryName = payload.location.country.name;
     let countryCode = getCountryCodeOrName(countryName);
     localStorage.setItem("countryCode", countryCode[0]);
    });

let countryCode = localStorage.getItem("countryCode");
function fix_category(){
    let category_elements = document.querySelectorAll(".category__name");
    category_elements.forEach(function(s){
        s.setAttribute("data-category", s.innerText);        
    })
}

function printCategory(s){
    let p_category_name = s.getAttribute("data-category");
    window.location.href = `./index.html?category=${p_category_name}`;
}

if(location.search != ""){
    let urlParams = new URLSearchParams(queryString);
    let search = urlParams.get("category");  
    headline__text.innerHTML = search + " HEADLINES:";
    let urlToFetch = `https://newsapi.org/v2/top-headlines?category=${search}&country=${countryCode}&pageSize=30&apiKey=${apiKey}`;    
    fetch(urlToFetch)      
    .then((response) => response.text())
    .then((result) => parseCategory(result));

    function parseCategory(getRes){
        let data = JSON.parse(getRes);
      data.articles.forEach(apiData => {
        let title = apiData.title;
        let desc = apiData.description;
        let content = apiData.content;
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
else{
    
/* =========================================FETCH CONTENT========================================*/
function fetchFromWeb(){
    fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=${apiKey}&language=en`)
      .then((response) => response.text())
      .then((result) => parseWithHTML(result));
    }
    fetchFromWeb();
    
    /* =========================================PARSE CONTENT========================================*/
    function parseWithHTML(getRes) {
      let data = JSON.parse(getRes);
    
      data.articles.forEach(apiData => {
        let title = apiData.title;
        let desc = apiData.description;
        let content = apiData.content;
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

/* =========================================MODAL CONTENT========================================*/
function modal(){
    var modal = document.getElementById("myModal");
    
    var modalImg = document.getElementById("modal-img");
    var captionText = document.getElementById("caption");
    
    document.addEventListener("click", (e) => {
      const elem = e.target;
      if (elem.id==="myImg") {
        modal.style.display = "block";
        modalImg.src = elem.dataset.biggerSrc || elem.src;
        captionText.innerHTML = elem.alt; 
      }
    })
    
    var span = document.getElementsByClassName("close")[0];
    
    
    span.onclick = function() { 
      modal.style.display = "none";
    }
    }
    modal();
    