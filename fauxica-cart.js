let btnCart = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let buttonClose = document.querySelector('.cart-close')

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active')
})

buttonClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
})

document.addEventListener('DOMContentLoaded',load)

function load(){
    loadContent()
}

function loadContent(){
    let btnRemove = document.querySelectorAll('.cart-remove')

    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem)
    })

    let quantityElement = document.querySelectorAll('.cart-quantity')
    quantityElement.forEach((input)=>{
        input.addEventListener('change',changeQuantity)
    })

    let btnCart = document.querySelectorAll('.add-cart')
    // console.log(btnCart);

    btnCart.forEach((btn)=>{
    btn.addEventListener('click',addCart)
    })
    updateTotal()
}

function removeItem(){
    if(confirm('Are You Sure To Remove')){

        let title = this.parentElement.querySelector('.cart-product-title').innerHTML
        itemList=itemList.filter(el => el.title!=title)

        this.parentElement.remove()
    }
    loadContent() // when i remove cart it update total
}

function changeQuantity(){
        if(isNaN(this.value) || this.value<1){
            this.value=1
        }
        loadContent() // when i change quantity it update quantity price
}

let itemList=[]

function addCart(){
        let parent = this.parentElement.parentElement
        let title = parent.querySelector('.product-name').innerHTML
        let price = parent.querySelector('.product-price').innerHTML
        let imgSrc = parent.querySelector('.product-pic').src
        console.log(title,price,imgSrc)

        let forExistingCheck = {title,price,imgSrc}
        if(itemList.find((item) => item.title == forExistingCheck.title)){
            alert("This Product Already Existed")
            return
        }
        else{
            itemList.push(forExistingCheck)
        }
        let newProductElement = createCartProduct(title,price,imgSrc)

        let cardContent = document.querySelector('.cart-content')

        let div = document.createElement('div')
        div.innerHTML = newProductElement

        cardContent.append(div)
        loadContent()

}

function createCartProduct(title,price,imgSrc){

    return `<div class="cart-box">
    <img src="${imgSrc}" class="cart-img">

    <div class="detail-box">

        <div class="cart-product-title">${title}</div>

        <div class="price-box">
            <div class="cart-price">${price}</div>
            <div class="cart-amt">${price}</div>
        </div>

        <input type="number" value="1" class="cart-quantity">

    </div>

    <ion-icon name="trash" class="cart-remove"></ion-icon>
</div>`
}

function updateTotal(){
    let cartItems = document.querySelectorAll('.cart-box')
    let totalPrice = document.querySelector('.total-price')

    let total = 0

    cartItems.forEach((cartItem) =>{
        let priceElement = cartItem.querySelector(".cart-price")
        let price =  parseFloat(priceElement.innerHTML.replace("Rs ",""))

        let quantity = cartItem.querySelector(".cart-quantity").value
        total+=(price*quantity)
        cartItem.querySelector(".cart-amt").innerText = "Rs "+price*quantity
        
    })

    totalPrice.innerHTML ="Rs "+total

    let cartCount = document.querySelector('.cart-count')
        let count = itemList.length
        cartCount.innerHTML= count

    if(count==0){
        cartCount.style.display="none"
    }else{
        cartCount.style.display="block"
    }
    
}