const container = document.getElementById('container')
const registerBtn = document.getElementById('register')
const loginBth = document.getElementById('login')

registerBtn.addEventListener('click',()=>{
    container.classList.add("active")
})

loginBth.addEventListener('click',()=>{
    container.classList.remove("active")
})

