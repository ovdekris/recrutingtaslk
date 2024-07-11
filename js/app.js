const productContainer = document.querySelector(".products__content");
const selectButton = document.querySelector(".select");
const selectOption = document.querySelectorAll(".select-menu li");
const selectMenu = document.querySelector(".select-menu");
const selectedOption = document.querySelector(".selected").textContent;
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close");

let currentPage = 1;
let pageSize = parseInt(selectedOption.textContent);
let isLoading = false;
let totalItemsLoaded = 0;
let maxItems = pageSize;

selectButton.addEventListener("click", () => {
    selectMenu.style.display = "block";
});

selectOption.forEach(item => {
    item.addEventListener('click', event => {
        let dropdown = event.target.closest('.products__dropdown-select');
        dropdown.querySelector('.selected').textContent = event.target.textContent;
        dropdown.querySelector('.select-menu').style.display = 'none';
        const selectedValue = item.getAttribute('data-value');
        selectedOption.textContent = selectedValue;
        pageSize = parseInt(selectedValue);
        maxItems = pageSize;
        currentPage = 1;
        totalItemsLoaded = 0;
        productContainer.innerHTML = '';
        loadProducts();
    });
});

// GetData
async function getData(pageNumber, pageSize) {
    const url = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

// Load products
async function loadProducts() {
    if (isLoading) return;
    isLoading = true;

    if (totalItemsLoaded >= maxItems) {
        isLoading = false;
        return;
    }

    const products = await getData(currentPage, pageSize);
    renderProducts(products);
    currentPage++;
    totalItemsLoaded += products.length;
    isLoading = false;
}

// Render products 
function renderProducts(products) {
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'products__item';
        productItem.innerHTML = `<p>ID: ${product.id}</p>`;
        productItem.addEventListener('click', () => showProductDetails());
        productContainer.appendChild(productItem);
    });
}

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        loadProducts();
    }
}

window.addEventListener('scroll', handleScroll);

// Initial load
loadProducts();

function showProductDetails() {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
//Close popup
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.style.overflow = 'scroll';  

});

//paralax
document.addEventListener('DOMContentLoaded', function() {
    const image = document.querySelector('.composition-dog img');
    console.log(image)
    if (image) {
        new simpleParallax(image, {
            scale: 0.8
        });
    }
});

//burger-menu
const mobileNavOpen = document.querySelector("#nav-open");
const mobileNavClose = document.querySelector(".mobile-mav-btn-close");
const mobileNav = document.querySelector(".nav-mobile-wrapper");

mobileNavOpen.addEventListener("click",()=>{
    mobileNav.classList.add("nav-mobile-wrapper-open");
    document.body.style.overflow = 'hidden';
});

mobileNavClose.addEventListener("click",()=>{
    mobileNav.classList.remove("nav-mobile-wrapper-open");
    document.body.style.overflow = 'scroll';
})


