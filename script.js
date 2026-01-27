let toggle = document.getElementById('toggle');
let labelToggle = document.getElementById('labelToggle');
toggle.addEventListener('change', (event) =>{
    let checked = event.target.checked;
    document.body.classList.toggle('light-mode');
    if(checked){
        labelToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        labelToggle.style.color = "yellow";
    }
    else{
        labelToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        labelToggle.style.color = "rebeccapurple";
    }
})