import {cart,addToCart} from './cart.js'

const products = JSON.parse(localStorage.getItem('apiData'))
if(products){
let productsHTML = '';
products.forEach(product => {
  productsHTML +=`
    <div class="product-container"  data-product-name ="${product.name}">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>
      <div class="search-product-names"></div>
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
        ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents/100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart" data-product-name ="${product.name}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id ="${product.id}" data-product-name ="${product.name}">
        Add to Cart
      </button>
    </div>
  `
    
});

document.querySelector('.js-product-grid')
  .innerHTML = productsHTML;

function updateCartQuntity(){
  document.querySelector('.js-cart-quantity')
    .innerHTML = cart.length;
}

updateCartQuntity()
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      addToCart(productId)
      addedToCart(button.dataset.productName)
     
      updateCartQuntity()
    })
  })

  function addedToCart(productname){
    const added = document.querySelectorAll('.added-to-cart');
      if(added){
        added.forEach((added)=>{
          if(added.dataset.productName === productname){
            added.classList.add('opacity1');
            setTimeout(()=>added.classList.remove('opacity1'),2000)
          }
        });
      }
  }

document.querySelector('.js-search-bar').addEventListener('input', e=>{
  const value = e.target.value;
  const container = document.querySelectorAll('.product-container')
    container.forEach(productContainer=>{
      const PCS = productContainer.classList ;
      const PDN = productContainer.dataset.productName
      PDN.toUpperCase().includes(value.toUpperCase()) ? PCS.remove('display-none') :    PCS.add('display-none')
    });
});
}
 