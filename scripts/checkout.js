import {products} from '../data/products.js'
import {cart} from './cart.js'
import {wilayat} from '../data/wilayat.js'


document.querySelector('main').style.height = window.innerHeight-82 + "px"

products.forEach((product)=>{
    cart.forEach((cartItem)=>{
        if(cartItem.id === product.id){
            const html = `
            <div class="product">
            <div class="product-image-container">
            <span class="product-quntity">${cartItem.quantity}</span>
            <img src="assets/${product.imageOn}" class="product-image">
                    </div>
                    <div class="product-title">${product.title}</div>
                    <div class="product-price"><span class="products-price">${product.salePrice *cartItem.quantity}</span> Da</div>
                    </div>
                    `
                    
                    document.querySelector('.product-items-container')
                    .innerHTML += html
                }
            })
})

const subtotal = document.querySelector('.js-subtotal-price')
const shipping = document.querySelector('.js-shipping-price')
const total = document.querySelector('.js-total-price')
const prices = document.querySelectorAll('.products-price')
prices.forEach((price)=>{
    const sub = Number(price.innerHTML)+ Number(subtotal.innerHTML)
    localStorage.setItem('sub',JSON.stringify(Number(price.innerHTML)+ Number(subtotal.innerHTML)))
    subtotal.innerHTML = localStorage.getItem('sub')
})
total.innerHTML = Number(subtotal.innerHTML)


document.querySelector('#totalPrice').value= total.innerHTML
// console.log(document.querySelector('#totalPrice').value)

cart.forEach((cartItem , i)=>{
    products.forEach(product=>{
        if(cartItem.id === product.id){
            const html =`
            <input name="productName${i}" value="${product.title}" id="productName${i}" type="hidden">
            <input name="productQuntity${i}" value="${cartItem.quantity}" id="productQuntity${i}" type="hidden">
            `
            document.querySelector('.hidden-inputs').innerHTML += html

            document.querySelector(`#productName${i}`).value = product.title
            document.querySelector(`#productQuntity${i}`).value = cartItem.quantity
        }
    })
})

const wilayaSelector = document.querySelector('.wilaya')
const shippingmethodSelector = document.querySelector('.shippingmethod')
wilayaSelector.addEventListener("change", ()=> {
    shippingmethodSelector.addEventListener("change", ()=> {

        var options = wilayaSelector.options;
        var selectedOptionValues = [];
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            if (option.selected) {
            selectedOptionValues.push(option.value);
            }
        }
        const selectedWilayaOPtion = selectedOptionValues.join()

        var options = shippingmethodSelector.options;
        var selectedOptionValues = [];
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            if (option.selected) {
            selectedOptionValues.push(option.value);
            }
        }
        const selectedshippingOPtion = selectedOptionValues.join()



        wilayat.forEach((wilaya)=>{
            if(wilaya.name === selectedWilayaOPtion){
                if(selectedshippingOPtion==='بيت'){
                    document.querySelector('.shipping-da').innerHTML = 'Da'
                    document.querySelector('.js-shipping-price').innerHTML = wilaya.dar
                    total.innerHTML = Number(subtotal.innerHTML)+Number(shipping.innerHTML)
                    localStorage.removeItem('dar')
                    localStorage.setItem('dar',JSON.stringify(wilaya.dar))
                }else{
                    document.querySelector('.shipping-da').innerHTML = 'Da'
                    document.querySelector('.js-shipping-price').innerHTML = wilaya.beru
                    total.innerHTML = Number(subtotal.innerHTML)+Number(shipping.innerHTML)
                    localStorage.removeItem('beru')
                    localStorage.setItem('beru',JSON.stringify(wilaya.beru))
                }
            }
        })
    })
})

if(localStorage.getItem('dar')){
    document.querySelector('.shipping-da').innerHTML = 'Da'
    document.querySelector('.js-shipping-price').innerHTML = JSON.parse(localStorage.getItem('dar'))
    total.innerHTML = Number(subtotal.innerHTML)+Number(shipping.innerHTML)
}else if( localStorage.getItem('beru')){
    document.querySelector('.shipping-da').innerHTML = 'Da'
    document.querySelector('.js-shipping-price').innerHTML = JSON.parse(localStorage.getItem('beru'))
    total.innerHTML = Number(subtotal.innerHTML)+Number(shipping.innerHTML)
}



function inputSave(name){
    document.querySelector(`.${name}`).addEventListener('blur',()=>{
        const save = document.querySelector(`.${name}`)
        save.value
        localStorage.setItem(`${name}`, save.value )
        console.log(`${name}`)
    })
    document.querySelector(`.${name}`).value= localStorage.getItem(`${name}`)
}

inputSave('name')
inputSave('phone')
inputSave('baldia')
inputSave('wilaya')
inputSave('shippingmethod')