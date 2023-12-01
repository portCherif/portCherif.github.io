import {products} from '../data/products.js'



products.forEach(product => {
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

    
                
})
function imgOffMouseover() {
    document.querySelectorAll(`.js-product-img-off`).forEach(imgOff=>{
        imgOff.classList.add('product-img-off-animation')
        imgOff.classList.add('product-img-off-after-animation')
    })  
}
function imgOffMouseleave() {
    document.querySelectorAll(`.js-product-img-off`).forEach(imgOff=>{
        imgOff.classList.remove('product-img-off-animation')
        imgOff.classList.remove('product-img-off-after-animation')
        setTimeout(()=>{
            imgOff.classList.remove('product-img-off-after-animation')
        },800)
    }) 
}
export function productCardAnime(){
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
document.querySelectorAll('.product-card').forEach((card)=>{
    card.addEventListener('click', ()=>{
        products.forEach((product)=>{
            if(product.id === card.dataset.productId){
                localStorage.setItem('selectedProduct' ,JSON.stringify(product))
            }
        })
    })
})




document.querySelector('.burger-button').addEventListener('click',()=>{
    if(document.querySelector('.side-menu').classList.contains('trasform')){
        document.querySelector('.side-menu').classList.remove('trasform')
        document.querySelector('.side-menu-shadow').classList.remove('display')
        document.querySelector('body').classList.remove('stopescrol')
    }else{
        document.querySelector('.side-menu').classList.add('trasform')
        document.querySelector('.side-menu-shadow').classList.add('display')
        document.querySelector('body').classList.add('stopescrol')
    }
})

