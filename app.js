//getting elements id 
let itemSKU = document.getElementById("itemSKU")
let addItem = document.getElementById("addItem")
let cartTotalPrice = document.getElementById("cartTotalPrice");
let cartContent = document.getElementById("cartContent");
let itemDetails = document.getElementById("itemDetals")

addItem.addEventListener('click', addToCart)

//cart array
let cart = []

//add to cart
function addToCart(id) {

    if (cart.some((item) => (item.SKU).toString() === itemSKU.value)) {
        changeQuantity('plus', id)
    } else if (items.find(item => item.SKU == itemSKU.value) == undefined) {
        alert("there is no item with this barkode please enter a valid one: between 1 and 3")
    } else {
        const item = items.find(item => item.SKU == itemSKU.value)
        cart.push({
            ...item,
            quantity: 1,
        })
    }
    updateCart()
}

//update cart
function updateCart() {
    renderCartItems()
    renderTotal()
}

//calculate and render total
function renderTotal() {
    let totalToPay = 0;
    cart.forEach((item) => {
        totalToPay = totalToPay + (item.quantity * item.price)
    })
    cartTotalPrice.innerHTML = `<b>$${totalToPay.toFixed(2)}</b>`
}

//render cart items
function renderCartItems() {
    cartContent.innerHTML = "" //clear cart element
    cart.forEach((item) => {
        let itemTotal = item.quantity * item.price // calculate item's subtotal price

        cartContent.innerHTML += ` 
        <tr class="d-flex justify-content-around align-items-center">
            <td><img class="img" src="${item.imgSrc}" alt="food"></td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><div class="d-flex justify-content-center align-items-center">
            <button class="counterDown" onclick="changeQuantity('minus', ${item.id})">-</button>
            <div class="m-2" >${item.quantity}</div>
            <button class="counterUP" onclick="changeQuantity('plus', ${item.id})">+</button>
       </div></td>  
            <td>$${itemTotal.toFixed(2)}</td>
            <td> <button class="btn btn-danger btn-sm" onclick="removeItemFromCart(${item.id})">Delete item</button></td>
        </tr>`

    })
}

//change quantity
function changeQuantity(action, id) {
    cart = cart.map((item) => {

        let quantity = item.quantity

        if (item.id === id) {
            if (action === "minus" && quantity > 1) {
                quantity--
            } else if (action === "plus" && quantity < item.inStock) {
                quantity++
            }

        }
        return {
            ...item,
            quantity,
        }
    })
    updateCart()
}

//remove item
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id)
    // itemDetails.innerHTML = '<div>No Item Selcted</div>'
    updateCart()
}

//cart submit 
function submitCart() {
    cartContent.innerHTML = `<tr class="blank_row">
    <td colspan="5" >cart is empty</td>
</tr>`
    // itemDetails.innerHTML = '<div>No Item Selcted</div>'
    itemSKU.value = ""
    cartTotalPrice.innerHTML = ""
    cart = []
    alert("Your order is completed")
}