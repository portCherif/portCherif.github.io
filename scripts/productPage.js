import {cart, cartShow} from './cart.js'

import {products} from '../data/products.js'


const mproduct = JSON.parse(localStorage.getItem('selectedProduct'))
const html =
`
<section class="product-gallery">
                <div class="main-image-container">
                <img src="assets/${mproduct.imageOn}" class="main-image main-image-on">
                <img src="assets/${mproduct.imageOff}" class="main-image main-image-off">
                </div>
                        <div class="gallery-container">
                            <img src="assets/${mproduct.imageOff}" class="gallery-image">
                            <img src="assets/${mproduct.imageOn}" class="gallery-image">
                        </div>
                </section>      
                <section class="product-info">
                <div class="product-title spawn-anime">${mproduct.title}</div>
                <div class="price-container spawn-anime">
                <span class="price-befor-sale ">${mproduct.price} DA</span>
                <span class="price-after-sale ">${mproduct.salePrice} DA</span>
                <span class="sale-mark">Sale</span>
                </div>
                <p class="spawn-anime">Quantity</p>
                <div class="quantity-container spawn-anime">
                <button class="minus-quantity-button">-</button>
                <input value="1" min="1" class="quantity-input" type="text">
                <button class="plus-quantity-button">+</button>
                </div>
                <button class="Add-to-cart spawn-anime" data-product-id=${mproduct.id}>Add to cart</button>
                <a href="checkout.html"><button class="Add-to-cart spawn-anime buy-now" data-product-id=${mproduct.id}>Buy now</button></a>

                <div class="discription-container spawn-anime">
                    <p class="discription">
                        An emotional reunion between two destined lovers. This piece perfectly captures the essence of this entire scene and the true meaning of love that we all yearn for. When the light ignites, it's as if magic unfolds before your eyes<br>—our cherished long-lost lovers are reunited for one last time.
                        <br><br>Step into the enchanting world of "Your Name" with our handcrafted masterpiece, where each brushstroke is lovingly crafted to perfection, ensuring an experience that touches your heart and soul.
                    </p>
                    <div class="drop-container">
                        <div class="drop-down">
                            <div class="drop-header js-dimensions">
                                <img class="drop-icon" src="assets/ruler.svg" alt="">
                                <h2 class="drop-title">Dimensions</h2>
                                <img class="drop-arrow js-dimensions-arrow" src="assets/arrow-down.svg" alt="">
                            </div>
                            <div class="dimensions-body display-none">
                                <p class="drop-dimensions-title">(L x W)</p>
                                <p class="dimensions">
                                    21 cm x 29.7 cm
                                </p>
                            </div>
                        </div>


                        <div class="drop-down">
                            <div class="drop-header js-material drop-header2">
                                <img class="drop-icon" src="assets/Material.svg" alt="">
                                <h2 class="drop-title">Material</h2>
                                <img class="drop-arrow js-material-arrow" src="assets/arrow-down.svg" alt="">
                            </div>
                            <div class="material-body display-none">
                                <p class="material" >Frame: Exquisite wood grain frame</p>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
    `
document.querySelector('.selected-prodect-container').innerHTML = html


products.forEach(product => {
    if(product.id !== mproduct.id){
    const html = `
    <a href="product.html" class="product-card" data-product-id=${product.id}>
        <div class="product-img-container">
        <img src="assets/${product.imageOn}" class="product-img js-product-img-on"  data-product-id=${product.id}>
        <img src="assets/${product.imageOff}" class="product-img product-img2 js-product-img-off"  data-product-id=${product.id}>
        </div>
        <div class="card-info">
        <span class="product-title">
        ${product.title}
        </span>
        <span class="stars-container">
            <img class="product-stars" src="assets/${product.stars}star.png">
            (${product.starsCom})
        </span> 
            <span class="product-price">
            from ${product.price}
            </span>
            <span class="sale-product-price">
            To ${product.salePrice} DA
            </span>
        </div>
    </a>
    `
    document.querySelector('.product-grid').innerHTML += html  
    }          
})


document.querySelectorAll('.product-card').forEach((card)=>{
    card.addEventListener('click', ()=>{
        products.forEach((product)=>{
            if(product.id === card.dataset.productId){
                localStorage.setItem('selectedProduct' ,JSON.stringify(product))
            }
        })
    })
})


const quantity = document.querySelector('.quantity-input')

document.querySelector('.plus-quantity-button')
    .addEventListener('click', ()=>{
        quantity.value -= -1
    })
document.querySelector('.minus-quantity-button')
    .addEventListener('click', ()=>{
        quantity.value < 2 ? '' :quantity.value -= 1
    })

const AlladdToCart = document.querySelectorAll('.Add-to-cart')
AlladdToCart.forEach(addToCart=>{
    addToCart.addEventListener('click',()=>{
        // emptyOrFullCart()
        const productId = addToCart.dataset.productId
        let Quantity = quantity.value
        let matchingItem = 0;
        cart.forEach((cartItem)=>{
        if(cartItem.id === productId){
            matchingItem = cartItem;
        }        
        });
        if(matchingItem){
            matchingItem.quantity = Quantity
            localStorage.setItem('cart', JSON.stringify(cart))  
        }else{
        cart.push({
            id:productId,
            quantity: Quantity
        });
        localStorage.setItem('cart', JSON.stringify(cart))  
        }
        localStorage.setItem('reloded', 'reloded')
        location.reload()        
    })})



function imgOffMouseover() {
    // document.querySelectorAll(`.main-image-off`).forEach(imgOff=>{
    //     imgOff.classList.add('product-img-off-animation')
    //     imgOff.classList.add('product-img-off-after-animation')
    // })  
}
function imgOffMouseleave() {
    document.querySelectorAll(`.main-image-off`).forEach(imgOff=>{
        imgOff.classList.remove('product-img-off-animation')
        imgOff.classList.remove('product-img-off-after-animation')
        setTimeout(()=>{
            imgOff.classList.remove('product-img-off-after-animation')
        },800)
    }) 
}
document.querySelectorAll(`.main-image-on`).forEach(imgOn=>{
    imgOn.addEventListener('mouseover',() => {
        imgOn.classList.add('no-opacity')
        imgOffMouseover()
    })
    imgOn.addEventListener('mouseleave',() => {
        imgOn.classList.remove('no-opacity')
        imgOn.classList.add('product-img-on-animation')
        setTimeout(()=>{
            imgOn.classList.remove('product-img-on-animation')
        },800)
        imgOffMouseleave()
    })
})
function bodyShow(drop){
    document.querySelector(`.js-${drop}`).addEventListener('click',()=>{
        const body = document.querySelector(`.${drop}-body`)
        const arrow = document.querySelector(`.js-${drop}-arrow`)
        if(body.classList.contains('display-none')){
            body.classList.remove('display-none')
            arrow.classList.add('rotate')
        }else{
            body.classList.add('display-none')
            arrow.classList.remove('rotate')
        }
    })
}
bodyShow('dimensions')
bodyShow('material')

function productCardAnime(){
    document.querySelectorAll(`.js-product-img-on`).forEach(imgOn=>{
    imgOn.addEventListener('mouseover',() => {
        imgOn.classList.add('no-opacity')
        imgOffMouseover()
    })
    imgOn.addEventListener('mouseleave',() => {
        imgOn.classList.remove('no-opacity')
        imgOn.classList.add('product-img-on-animation')
        setTimeout(()=>{
            imgOn.classList.remove('product-img-on-animation')
        },800)
        imgOffMouseleave()
    })
})}
productCardAnime()