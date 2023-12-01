export let cart = JSON.parse(localStorage.getItem('cart')) ;

if(JSON.parse(localStorage.getItem('updatedCart'))){
  cart = JSON.parse(localStorage.getItem('updatedCart')) || [];
}
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}
export function addToCart(productId){
  let matchingItem = 0;
  cart.forEach((cartItem)=>{
    if(cartItem.id === productId){
      matchingItem = cartItem;
    }        
  });
  if(matchingItem){
    matchingItem.quantity +=1
     saveToStorage()
  }else{
    cart.push({
      id:productId,
      quantity:1
    });
    saveToStorage()
  }
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.id !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart
  saveToStorage()
}
   