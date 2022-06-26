var apiKeyForSearch = "a7285fd31a16439aa680977d467c767a";
let mainDiv = document.querySelector(".article__container");
let url = `https://newsapi.org/v2/everything?q="covid-19"&pageSize=80&apiKey=${apiKeyForSearch}`;

/* =========================================FETCH CONTENT========================================*/
function fetchFromWeb() {
    fetch(url)
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
        if (urlToImage != null) {
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

function modal() {
    var modal = document.getElementById("myModal");

    var modalImg = document.getElementById("modal-img");
    var captionText = document.getElementById("caption");

    document.addEventListener("click", (e) => {
        const elem = e.target;
        if (elem.id === "myImg") {
            modal.style.display = "block";
            modalImg.src = elem.dataset.biggerSrc || elem.src;
            captionText.innerHTML = elem.alt;
        }
    })

    var span = document.getElementsByClassName("close")[0];


    span.onclick = function () {
        modal.style.display = "none";
    }
}
modal();

