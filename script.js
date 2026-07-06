let cartCount = 0;
let cartItems = [];
let totalPrice = 0;

let sidebar = document.getElementById("cart-sidebar");
let cartDisplay = document.getElementById("cart-count");
let cartDisplaySide = document.getElementById("cart-count-side");
let cartItemsBox = document.getElementById("cart-items");
let totalBox = document.getElementById("cart-total");

function openCart(){
    sidebar.classList.add("active");
}

function closeCart(){
    sidebar.classList.remove("active");
}

function updateCartUI(){
    cartDisplay.textContent = cartCount;
    cartDisplaySide.textContent = cartCount;

    cartItemsBox.innerHTML = "";

    cartItems.forEach((item, index) => {
        cartItemsBox.innerHTML += `
            <div style="background:rgba(255,255,255,0.05);padding:10px;margin:10px 0;border-radius:8px;">
                <p>${item.name}</p>
                <p>£${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalBox.textContent = totalPrice;
}

function removeItem(index){
    totalPrice -= cartItems[index].price;
    cartItems.splice(index, 1);
    cartCount--;

    updateCartUI();
}

document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", function(e){
        e.preventDefault();

        let product = this.parentElement.querySelector("h3").innerText;
        let priceText = this.parentElement.querySelector(".price").innerText;
        let price = parseInt(priceText.replace("£",""));

        cartItems.push({name: product, price: price});

        cartCount++;
        totalPrice += price;

        updateCartUI();
        openCart();
    });
});
function checkout(){
    if(cartItems.length === 0){
        alert("Cart is empty!");
        return;
    }

    alert(
        "Order Placed!\n\n" +
        "Items: " + cartCount + "\n" +
        "Total: £" + totalPrice
    );

    // reset cart
    cartItems = [];
    cartCount = 0;
    totalPrice = 0;

    updateCartUI();
    closeCart();
}