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
    } else if (items.find(item =>item.SKU == itemSKU.value) == undefined) {
        alert("there is no item with this barkode please enter a valid one: between 1 and 3")
    } else {
        const item = items.find(item =>item.SKU == itemSKU.value)
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

        itemDetails.innerHTML =
        `
        <div class="col-4">
        <img src="${item.imgSrc}" alt="food">
    </div>
    <div class="col-8">
        <div class="row row-col-2 bg">
            <div class="col-8"><b>${item.name}</b></div>
            <div class="col-4">
            
            </div>
        </div>
        <div class="row">
            <div class="col">price USD
                <div><b>$${item.price}</b></div>
            </div>
            <div class="col countercontainer">
                 <button class="counterUP" onclick="changeQuantity('plus', ${item.id})">+</button>
                 <div class="m-2" >${item.quantity}</div>
                 <button class="counterDown" onclick="changeQuantity('minus', ${item.id})">-</button>
            </div>
            <div class="col">total USD
                <div><b>$${itemTotal.toFixed(2)}</b></div>
            </div>
			
        </div>
    </div>`

        cartContent.innerHTML +=
            ` 
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.price}</td>
                            <td>${item.quantity}pc</td>  
                            <td>$${itemTotal.toFixed(2)}</td>
							<td> <button class="btn btn-sm btn-danger" onclick="removeItemFromCart(${item.id})">Delete item</button></td>
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
	itemDetails.innerHTML = '<div>No Item Selcted</div>'
    updateCart()
}

//cart submit 
function submitCart() {
    cartContent.innerHTML = ""
    itemDetails.innerHTML = ""
    itemSKU.value = ""
	 cartTotalPrice.innerHTML = ""
	 cart = []
    alert("order is done")
}
