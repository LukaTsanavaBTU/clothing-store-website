fetchItems();

// used IIFE to avoid polluting global scope
(()=>{
    // searchbar logic
    const searchBar = document.querySelector("input[type='search']");
    const searchButton = document.querySelector(".search>button");
    const newArrivals = document.querySelector("#new-arrivals");
    searchBar.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            fetchItems(searchBar.value);
            newArrivals.scrollIntoView({behavior: "smooth"});
        }
    });
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        fetchItems(searchBar.value);
        newArrivals.scrollIntoView();
    })

    // signup prompt closing logic
    const prompt = document.querySelector(".signup-prompt");
    const closePrompt = prompt.querySelector("button");
    closePrompt.addEventListener("click", (e) => {
        prompt.remove();
    });
})();

async function fetchItems(query) {
    const response = await fetch("https://fakestoreapi.com/products");
    const json = await response.json();
    if (query) {
        const filteredJson = json.filter((item) => item.description.toLowerCase().includes(query.toLowerCase())
                                                || item.title.toLowerCase().includes(query.toLowerCase())
                                                || item.category.toLowerCase().includes(query.toLowerCase()));
        populateItems(filteredJson);
    } else {
        populateItems(json);
    }
}   

function populateItems(json) {
    const newItems = json.slice(0, json.length >= 8 ? 8 : json.length);
    const topItems = json.reverse().slice(0, json.length >= 8 ? 8 : json.length);
    const newItemsContainer = document.querySelector(".item-section:first-of-type .items-container");
    const topItemsContainer = document.querySelector(".item-section:nth-of-type(2) .items-container");
    newItemsContainer.innerHTML = "";
    topItemsContainer.innerHTML = "";
    if (json.length) {
        newItems.forEach((item) => {
            addItemToContainer(item, newItemsContainer);
        });
        topItems.forEach((item) => {
            addItemToContainer(item, topItemsContainer);
        });
    } else {
        const noResults = document.createElement("p");
        noResults.textContent = "No results have been found";
        newItemsContainer.appendChild(noResults);
        topItemsContainer.appendChild(noResults.cloneNode(true));
    }
}

function addItemToContainer(item, container) {
    const listItem = document.createElement("li");

    const linkContainer = document.createElement("a");
    linkContainer.classList.add("item");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("item-img");

    const image = document.createElement("img");
    image.setAttribute("src", item.image);
    image.setAttribute("alt", item.description);

    const name = document.createElement("p");
    name.classList.add("item-name");
    name.textContent = item.title;

    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("item-rating");

    const starsContainer = document.createElement("div");
    starsContainer.classList.add("stars");

    const ratingRounded = item.rating.rate - (item.rating.rate % 0.5);
    const fullStars = Math.floor(ratingRounded);
    const isHalfStar = ((ratingRounded / 0.5) % 2) === 1;
    if (fullStars > 0) {
        for (let i = 0; i < fullStars; i++) {
            const starImg = document.createElement("img");
            starImg.setAttribute("src", "./assets/images/icons/star.svg");
            starsContainer.appendChild(starImg);
        }
    }
    if (isHalfStar) {
        const halfStarImg = document.createElement("img");
        halfStarImg.setAttribute("src", "./assets/images/icons/half-star.svg");
        starsContainer.appendChild(halfStarImg);
    }

    const rating = document.createElement("div");
    rating.innerHTML = `<span>${item.rating.rate}</span>/<span>5</span>`;

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("item-price");

    const currentPrice = document.createElement("span");
    currentPrice.textContent = "$" + Math.round(item.price);

    imgContainer.appendChild(image);
    ratingContainer.appendChild(starsContainer);
    ratingContainer.appendChild(rating);
    priceContainer.appendChild(currentPrice);
    linkContainer.appendChild(imgContainer);
    linkContainer.appendChild(name);
    linkContainer.appendChild(ratingContainer);
    linkContainer.appendChild(priceContainer);
    listItem.appendChild(linkContainer);
    container.appendChild(listItem);
}