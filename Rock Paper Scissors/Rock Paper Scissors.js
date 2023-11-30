let score =JSON.parse(localStorage.getItem('score'))||{
    tie : 0,
    lose : 0,
    Win : 0
    };


function game(playerMove){
    PickComputerMove();
    if(playerMove === CompCh){
        Result ='Tie' ;     
        score.tie += 1;
    }else if ((playerMove === 'Rock' && CompCh === 'scissors') ||
      (playerMove === 'Paper' && CompCh === 'rock') ||
      (playerMove === 'Scissors' && CompCh === 'paper') ){
        Result =' You win'
        score.Win += 1;
    }else{                
        Result =' You lose' 
        score.lose += 1;
    }

    localStorage.setItem('score',JSON.stringify(score));
    document.querySelector('.js-result').innerHTML = Result;
    document.querySelector('.js-moves').innerHTML = 
    `You
    <img src="rock paper scissors/${playerMove}-emoji.png" class="move-icon">
      - 
      <img src="rock paper scissors/${CompCh}-emoji.png" class="move-icon">
     Computer `;
    document.querySelector('.js-score').innerHTML = `Wins : ${score.Win}, Losses : ${score.lose}, Ties : ${score.tie}`;
}
function PickComputerMove(){
    const rN = Math.random();
    if(rN<1/3){
        CompCh = 'rock'
    }else if (rN>2/3){
        CompCh = 'scissors'
    }else{
        CompCh = 'paper'
    };
} 
function reset() {
    score.lose=0;
    score.Win=0;
    score.tie=0;
    localStorage.removeItem('score');
    document.querySelector('.js-score')
        .innerHTML = `Wins : ${score.Win}, Losses : ${score.lose}, Ties : ${score.tie}`;
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
}
let IntervalId;
function autoPlay(){
    const autoPlayButton = document.querySelector('.js-auto-play');
    if(autoPlayButton.innerHTML === 'Auto play'){
        IntervalId = setInterval(function (){
            const rN = Math.random();
            if(rN<1/3){
                CompCh = 'rock'
            }else if (rN>2/3){
                CompCh = 'scissors'
            }else{
                CompCh = 'paper'
            };
            const playerMove = CompCh;
            console.log(playerMove);
            game(playerMove);
            
        } ,1000)
        autoPlayButton.innerHTML = 'Stop play';
    }else{
        clearInterval(IntervalId);
        autoPlayButton.innerHTML = 'Auto play';
    }
    setTimeout (function(){
        clearInterval(IntervalId);
    },120000)
}