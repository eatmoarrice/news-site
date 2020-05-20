let newList = [];
let totalArticles = 20;
let currentArticles = 0;
let sources = [];
const apiKey = "a51f0be7ca2b4684ba396ce9e924c893";
const loadNews = async() => {
    let url = `http://newsapi.org/v2/everything?q=tech&sortBy=popularity&pageSize=${totalArticles}&apiKey=${apiKey}`;
    let data = await fetch(url);
    let result = await data.json();
    newList = result.articles;
    render(newList);
}


const render = (list) => {
    let newsHTML = list.map((item, i) => {

        currentArticles = i +1;
        return `
        <div class="news row">
            <div class="contentArea col-8">
                <div class="title">${item.title}</div>
                <div class="source">${item.source.name}</div>
                <div class="publishDate">${moment(item.publishedAt).fromNow()}</div>
                <a class="seeMore" href="${item.url}">See More</a>
            </div>
            <div class="imgArea col-4">
                <img class="pic" src="${item.urlToImage}">
            </div>
        </div> 
        `
    }).join('');
        // renderSources();
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
    console.log(sources)
    for (let i = 0; i < sources.length; i++) {
        sourceHTML += `
    <li>
                    <input type="checkbox" id="source${i}" name="source${i}">
                    <label for="source${i}"> ${sources[i].name}: ${sources[i].repeat}</label>
                </li>`
    }
    document.getElementById("sourcelist").innerHTML = sourceHTML;
}
