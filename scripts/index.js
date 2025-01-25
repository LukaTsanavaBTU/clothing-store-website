fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((json) => fetchContentHandler(json));


function fetchContentHandler(json) {
    const newItems = json.slice(0, 8);
    const newItemsContainer = document.querySelector(".item-section:first-of-type .items-container");
    newItems.forEach((item) => {
        addItemToContainer(item, newItemsContainer);
    });

    const topItems = json.slice(8, 16);
    const topItemsContainer = document.querySelector(".item-section:nth-of-type(2) .items-container");
    topItems.forEach((item) => {
        addItemToContainer(item, topItemsContainer);
    });
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