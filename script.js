let newList = [];
let totalArticles = 20;
let currentArticles = 0;
let sources = {};
let tempName = "";
const apiKey = "a51f0be7ca2b4684ba396ce9e924c893";
const loadNews = async() => {
    let url = `http://newsapi.org/v2/everything?q=tech&sortBy=popularity&pageSize=${totalArticles}&apiKey=${apiKey}`;
    let data = await fetch(url);
    let result = await data.json();
    newList = result.articles;
    showTotalSources(newList)
    render(newList);
    renderSources();
    console.log(newList)
}


const render = (list) => {
    currentArticles = 0;
    let newsHTML = list.map((item, i) => {
        if (sources[item.source.name].show) {
            currentArticles += 1;
            return `
            <div class="news row">
                <div class="contentArea col-8">
                    <div class="title">${item.title}</div>
                    <div class="source">${item.source.name}</div>
                    <div class="publishDate">${moment(item.publishedAt).fromNow()}</div>
                    <a class="seeMore" href="${item.url}">See More</a>
                </div>
                <div class="imgArea col-4">
                    <img class="pic img-fluid" src="${item.urlToImage}">
                </div>
            </div> 
            `
        }
        
    }).join('');
        document.getElementById("newsArea").innerHTML = newsHTML;
        document.getElementById("currentArticles").innerHTML = currentArticles;
        document.getElementById("totalArticles").innerHTML = totalArticles;
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
                    <label for="source${i}"> ${key}: ${value.repeat}</label>
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