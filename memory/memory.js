const myarray = [1,2,3,4,5,6,7,8];
const cartsCon = document.querySelector('.js-carts');
myarray.forEach((b) => {
    randomNumber(b);
});


function randomNumber(b) {    
    for(let i= 0; i<2 ; i++) {
        var randomNumber = Math.floor(Math.random() * 8) + 1;
        let x = JSON.parse(localStorage.getItem('x'));
        if(randomNumber = b) {
            x++;
            localStorage.setItem('x', JSON.stringify(x))
        }
        localStorage.removeItem('x')
        if( x <=2){   
            var randomOrder = Math.floor(Math.random() * 16) + 1;
            cartsCon.innerHTML += `
            <div class="cart order-${randomOrder} js-cart">
                <img src="asits/que_icon.svg" class="front-face ">
                <img src="asits/img-${randomNumber}.png" class="back-face ">
            </div>`
        }   
    }
}

const carts = document.querySelectorAll('.js-cart');
carts.forEach((cart) => {
    cart.addEventListener('click', () => {
        let x = JSON.parse(localStorage.getItem('x'));
        cart.classList.add ('cart-transform')
        x++
        localStorage.setItem('x', JSON.stringify(x));        
        
        if (x === 1) {
            const cart1i = cart.innerHTML;
            localStorage.setItem('cart1i', JSON.stringify(cart1i));   
            
        }
        if(x === 2 ){
            cart.classList.add ('cart-transform')
            const cart1i =JSON.parse( localStorage.getItem('cart1i') );
            if(cart1i === cart.innerHTML){
                  
                  const win = document.querySelectorAll('.cart-transform')
                  const carts = document.querySelectorAll('.cart');
                  let i =0
                  win.forEach((win)=>{
                        win.classList.replace ('cart-transform' ,'cart-transform2')
                  })
                  const win2 = document.querySelectorAll('.cart-transform2')
                  win2.forEach(()=>{
                        i++  
                  })
                const winMeassag = document.querySelector('.win')
                  if(i === 16){
                    win2.forEach(()=>{
                        winMeassag.classList.add ('display')
                        setTimeout(()=>{location.reload();},1500)
                        
                  })
                  }
            }else{
                const lose = document.querySelectorAll('.cart-transform')
                
                setTimeout(() => {
                    lose.forEach((lose)=>{
                        lose.classList.add ('shake-animation')
                        lose.classList.remove ('cart-transform')
                        setTimeout(() => {
                        lose.classList.remove ('shake-animation')
                        },1000)
                })},800)   
                
            }
            localStorage.removeItem('x')
            document.querySelector('.tranpirant').classList.add('display')
            setTimeout(()=>{
                document.querySelector('.tranpirant').classList.remove('display')
            },1000)
            
        }
        
    })
})