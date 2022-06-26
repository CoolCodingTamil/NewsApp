let category_lists = document.querySelector(".category__lists");
if(category_lists){
    function categoryNamePrint(){
        let category_names = {
            names : ["business", "entertainment", "general", "health", "science", "sports", "technology"]
        };
        category_names.names.forEach(function(s){
            let category_html_literal = ` <div class="category__name" onclick="printCategory(this)">
            <h5>${s.toLocaleUpperCase()}</h5></div>`;
            category_lists.innerHTML += category_html_literal;
        })
    
    }
    categoryNamePrint();
}

let country_lists = document.querySelector(".country__lists");
if(country_lists){
    function countryNamePrint(){
        let country_names = {
            names : ["India", "China", "USA", "UK", "France", "Singapore", "Australia", "Japan", "Canada", "Russia", "SriLanka", "Ukraine", "Pakistan"],
            codes : ["in", "ch", "us", "uk", "fr", "sg", "au", "jp", "ca", "ru", "lk", "ua", "pk"]
        };
        country_names.names.forEach(function(s, k){        
            let country_html_literal = ` <div class="country__name" data-country-code=${country_names.codes[k]} onclick=countryTarget(this)>
            <h5>${s.toLocaleUpperCase()}</h5></div>`;
            country_lists.innerHTML += country_html_literal;
        })  
    }
    countryNamePrint();
}

let search_input = document.querySelector(".navbar__search-input input");
search_input.addEventListener("keydown", function (e) {    
    if (e.keyCode == 13) {  
        e.preventDefault();
        console.log(e.target.value);
        let host = window.location.host;
        window.location.href = `/search.html?q=${e.target.value}`;
    }
});

let country_name_el = document.querySelectorAll(".country__name");

function countryTarget(s){
    sessionStorage.setItem("countryClicked", s.innerText);
    window.location.href = `./country.html?country=${s.getAttribute('data-country-code')}`;    
}
