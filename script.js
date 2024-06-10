const accessKey = "0DTWTA70UIgawi9XdN9UVuajylsILOVv494HyvQfd54";
// create a variable for ids
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// api of unsplash

let keyword = "";
let page = 1;
async function searchImages() {
    keyword = searchBox.value;



    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    //  when we search for new images of different creature on search button so to show them on top not below the previous one we clear the inner html of page 1 and show new images 
    if (page === 1) {
        searchResult.innerHTML = "";
    }
    const results = data.results;

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        // this will show image in window by linking image url with  anchor tab html url which is used for redirecting to new page on clicking
        searchResult.appendChild(imageLink);
    })
    // after dispaly of result show more button will be shown
    showMoreBtn.style.display = "block";
}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    // again call the search image function just after click is happen
    searchImages();
})

