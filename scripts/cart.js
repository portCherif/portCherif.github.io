import {products} from '../data/products.js'

export let cart = JSON.parse(localStorage.getItem('cart')) || []

if(localStorage.getItem('reloded')){
    localStorage.removeItem('reloded')
    cartShow()
}

products.forEach((product)=>{
    cart.forEach(cartItem => {
        if(cartItem.id === product.id){
            const html = `
            <div class="cart-item-container">
                <div class="cart-item-img-container">
                    <img src="assets/${product.imageOn}" class="cart-item-img">
                </div>
                <div class="cart-item-info-container">
                    <div class="cart-item-top-row">
                        <div class="cart-item-title">${product.title}</div>
                        <div class="cart-item-trash" data-product-id=${product.id}>X</div>
                    </div>
                    <div class="cart-item-lower-row">
                        <div class="cart-item-quantity-container">
                            <button class="cart-item-minus-button" data-product-id=${cartItem.id}>-</button>
                            <input class="cart-item-quantity-input" data-product-id=${cartItem.id} min="1" value="${cartItem.quantity}" type="text" >
                            <button class="cart-item-plus-button" data-product-id=${cartItem.id}>+</button>
                        </div>
                        <div class="cart-item-price-container">
                            <div class="cart-item-price">
                                <span class="cart-item-befor-price" data-product-id=${cartItem.id}>${product.price *cartItem.quantity}</span>
                                <span class="cart-item-after-price" data-product-id=${cartItem.id}>${product.salePrice *cartItem.quantity}DA</span>
                            </div>
                            <div class="cart-item-saved">
                            (Save <span class="js-cart-item-saved" data-product-id=${cartItem.id}>${(product.price - product.salePrice)*cartItem.quantity}</span>DA)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `

            
            document.querySelector('.cart-items')
                .innerHTML += html
            
                
            }
        })
    });
export function cartShow(){
    document.querySelector('.cart-container')
    .classList.add('translatx','box-shadow')
    document.querySelector('body').classList.add('stop-scrolling')
}
document.querySelector('.cart-button-container')
.addEventListener('click',cartShow)
document.querySelector('.cart-off')
.addEventListener('click',()=>{
    document.querySelector('.cart-container')
    .classList.remove('translatx','box-shadow')
    document.querySelector('body').classList.remove('stop-scrolling')
})

function itemPlusButton(){
    document.querySelectorAll('.cart-item-plus-button').forEach((plusBut)=>{
        cart.forEach((cartItem)=>{
            if(cartItem.id === plusBut.dataset.productId ){
                plusBut.addEventListener('click',()=>{
                    cartItem.quantity =Number(cartItem.quantity)+1
                    localStorage.setItem('cart', JSON.stringify(cart)) 
                    document.querySelectorAll('.cart-item-quantity-input').forEach((quantity)=>{
                        if(quantity.dataset.productId === cartItem.id){
                            quantity.value = cartItem.quantity
                        }
                    })
                    if(document.querySelector('.cart-button-quntity-number')&&document.querySelector('.cart-header-quntity')){
                        document.querySelector('.cart-button-quntity-number')
                        .innerHTML =  cartQuantityNumber ()
                        document.querySelector('.cart-header-quntity')
                        .innerHTML =  `Cart • ${cartQuantityNumber ()}`
                        document.querySelector('.checkout-price').innerHTML = 0
                        tootalePrice()
                        cartItemPrice(cartItem.quantity , cartItem.id)
                    }
                })
            }
        })  })
}
function itemMinusButton(){
    document.querySelectorAll('.cart-item-minus-button').forEach((minusBut)=>{
        cart.forEach((cartItem)=>{
            if(cartItem.id === minusBut.dataset.productId ){
                minusBut.addEventListener('click',()=>{
                    cartItem.quantity =Number(cartItem.quantity)-1
                    localStorage.setItem('cart', JSON.stringify(cart)) 
                    document.querySelectorAll('.cart-item-quantity-input').forEach((quantity)=>{
                        if(quantity.dataset.productId === cartItem.id){
                            quantity.value = cartItem.quantity
                        }
                    }) 
                    if(document.querySelector('.cart-button-quntity-number')&&document.querySelector('.cart-header-quntity')){
                        document.querySelector('.cart-button-quntity-number')
                        .innerHTML =  cartQuantityNumber ()
                        document.querySelector('.cart-header-quntity')
                        .innerHTML =  `Cart • ${cartQuantityNumber ()}`
                        document.querySelector('.checkout-price').innerHTML = 0
                        tootalePrice()
                        cartItemPrice(cartItem.quantity , cartItem.id)
                        document.querySelectorAll('.cart-item-quantity-input').forEach((input)=>{
                            console.log(input.value)
                            if(Number(input.value) === 0 ){
                                cartItemDelet(input)
                            }
                        })
                    }
                    autoUpdateInChangeQuntity()})
        }
    })})
}
itemMinusButton()
itemPlusButton()
    

document.querySelectorAll('.cart-item-quantity-input').forEach((input)=>{
    console.log(input.value)
    if(Number(input.value) === 0 ){
        cartItemDelet(input)
    }
})

function cartItemDelet(dataId){
    cart.forEach((cartItem, index) =>{
        if(dataId.dataset.productId ===cartItem.id){
            cart.splice(index,1)
            localStorage.setItem('cart', JSON.stringify(cart))  
            localStorage.setItem('reloded', 'reloded')
            location.reload()
        }
    })
}  
document.querySelectorAll('.cart-item-trash').forEach((deletBut)=>{
    deletBut.addEventListener('click',()=>{
        cartItemDelet(deletBut)
    })
})

function tootalePrice(){
    cart.forEach(cartItem=>{
        products.forEach(product=>{
            if(cartItem.id === product.id){
                let totelPrice = Number(document.querySelector('.checkout-price').innerHTML)
                totelPrice += product.salePrice*cartItem.quantity
                document.querySelector('.checkout-price').innerHTML = totelPrice
            }
        })
    })
}

tootalePrice()
function cartQuantityNumber (){
    let Quantity = 0 ;
    cart.forEach(cartItem=>{
        Quantity += Number(cartItem.quantity)
    })
    return Quantity
}
    
document.querySelector('.cart-button-quntity-number')
.innerHTML =  cartQuantityNumber ()
document.querySelector('.cart-header-quntity')
.innerHTML =  `Cart • ${cartQuantityNumber ()}`

function cartItemPrice(quantity , id){
    savedPrice()
    document.querySelectorAll('.cart-item-after-price').forEach((afterPrice)=>{
        products.forEach((product)=>{
            if(id === product.id && afterPrice.dataset.productId === id){
                afterPrice.innerHTML = `${product.salePrice * quantity}DA`
                
            }
        })
    })
    document.querySelectorAll('.cart-item-befor-price').forEach((beforPrice)=>{
        products.forEach((product)=>{
            if(id === product.id && beforPrice.dataset.productId === id){
                beforPrice.innerHTML = `${product.price * quantity}`
                
            }
        })
    })
}
function autoUpdateInChangeQuntity(){
    document.querySelector('.cart-button-quntity-number')
    .innerHTML =  cartQuantityNumber ()
    document.querySelector('.cart-header-quntity')
    .innerHTML =  `Cart • ${cartQuantityNumber ()}`
}

function savedPrice(){
    products.forEach((product)=>{
        cart.forEach((cartItem)=>{
            document.querySelectorAll('.js-cart-item-saved').forEach((save)=>{
                if(save.dataset.productId === cartItem.id && product.id === cartItem.id){
                    save.innerHTML = (product.price - product.salePrice)*cartItem.quantity
                }
            })

        })
    })
}

function footer(){
    const footer =`
        <div class="footer">
            <div class="footer-container">
                <div class="footer-header">
                    <h2 class="footer-links">Quick links</h2>
                    <ul>
                        <li><a href="">Contact Us</a></li>
                        <li><a href="">F.A.Q.s</a></li>
                        <li><a href="">Privacy Policy</a></li>
                        <li><a href="">Shipping Policy</a></li>
                        <li><a href="">Terms of Service</a></li>
                    </ul>
                    <h2 class="footer-email-title">Get updates on our new releases!</h2>
                    <input class="footer-email" type="email" placeholder="Email">
                </div>
            </div>
        </div>`
        if(document.querySelector('footer')){
            document.querySelector('footer').innerHTML = footer
        }
        
}
setInterval(footer,0)

export function emptyOrFullCart(){
   
    document.querySelector('.empty-cart').classList.add('display-none')
    if(cart.length===0){
        document.querySelector('.cart-checkout').classList.add('display-none')
        document.querySelector('.empty-cart').classList.remove('display-none')      
    } 
}
emptyOrFullCart()