window.onload=function(){

    let background = document.getElementById('bg');
    let button1 = document.getElementById('theme-button');

    let images = ['images/cyberpunk.gif','images/nature.gif','images/waterfall.png'];
    let i = 0;
    
    button1.addEventListener('click', function(e) {
        i = (++i % images.length);
        background.style.backgroundImage = `url( ${images[i]})`;
    });

    let button2 = document.getElementById('github-button');

    button2.addEventListener('click',function(e){
        window.open('https://github.com/wianduplessis',"_blank");
    }); 
}

