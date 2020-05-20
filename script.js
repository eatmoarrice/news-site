let newList = [];
let totalArticles = 20;
let realTotal = 0;
let currentArticles = 0;
let category = "";
let sources = {};
let query = "tech";
let tempName = "";
const apiKey = "a51f0be7ca2b4684ba396ce9e924c893";
const loadNews = async() => {
    let url = `https://newsapi.org/v2/top-headlines?q=${query}&category=${category}&pageSize=${totalArticles}&apiKey=${apiKey}`;
    let data = await fetch(url);
    let result = await data.json();
    newList = result.articles;
    sources = {};
    showTotalSources(newList)
    render(newList);
    renderSources();
    console.log(newList)
}


const render = (list) => {
    realTotal = 0;
    currentArticles = 0;
    let newsHTML = list.map((item, i) => {
        realTotal++;
        if (sources[item.source.name].show) {
            currentArticles++;
            return `
            <div class="news row">
                <div class="contentArea col-12 col-md-6 col-lg-8">
                    <div class="title">${item.title}</div>
                    <div class="source">${item.source.name}</div>
                    <div class="publishDate">${moment(item.publishedAt).fromNow()}</div>
                    <a class="seeMore" href="${item.url}" target="_blank">See More</a>
                </div>
                <div class="imgArea col-12 col-md-6 col-lg-4">
                    <img class="pic" src="${item.urlToImage}">
                </div>
            </div> 
            `
        }
        
    }).join('');
        document.getElementById("newsArea").innerHTML = newsHTML;
        document.getElementById("currentArticles").innerHTML = currentArticles;
        document.getElementById("totalArticles").innerHTML = realTotal;
        // console.log(currentArticles)
        
}

let loadMore = (num) => {
    totalArticles += num;
    loadNews();
}

loadNews();

let renderSources = () => {
    let sourceHTML = "";
    let i = 0;
    for (let [key, value] of Object.entries(sources)) {
        i++;
        sourceHTML += `
    <li>
                    <input type="checkbox" onchange="isChecked()" id="source${i}" name="source${i}">
                    <label for="source${i}"> ${key} (${value.repeat})</label>
                </li>`
    }
    document.getElementById("sourcelist").innerHTML = sourceHTML;
}



let showTotalSources = (list) => {
        list.forEach(item => {
        let name = item.source.name;
        if (!sources[name]) {
            sources[name] = {"repeat":1, "show": true};
        }
        else {
            sources[name].repeat += 1;
        }
    })
    
}

let isChecked = () => {
    let i = 0;
    let y = 0;
    
    for (let [key,value] of Object.entries(sources)) {
        i++;
        if (document.getElementById(`source${i}`).checked == true) {
            value.show = true;
        }
        else value.show = false;
    }

    for (let z = 1; z <= i; z++) {
        if (document.getElementById(`source${z}`).checked == false) {y += 1}
    }

    if (i == y) {
        for (let [key,value] of Object.entries(sources)) {value.show = true;}
    }
    console.log(sources)
    render(newList)
}

let changeQuery = () => {
    query = document.getElementById("queryinput").value;
     newList = [];
    totalArticles = 20;
    currentArticles = 0;
    sources = {};
    loadNews();
}

let changeCategory = () => {
    category = document.getElementById("cat").value;
    newList = [];
    totalArticles = 20;
    currentArticles = 0;
    sources = {};
    loadNews();
}