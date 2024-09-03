function buttonOn(btnName) {
    if (mButton.classList.contains('off')){
        mButton.classList.remove('off')
    } else if (gButton.classList.contains('off')){
        gButton.classList.remove('off')
    } else if (tButton.classList.contains('off')) {
        tButton.classList.remove('off')
    } 
    btnName.classList.toggle("off");
}
const button = document.querySelector(".js-button");
console.log(button.classList.contains("js-button"));
const gButton = document.querySelector(".js-gbutton");
const mButton = document.querySelector(".js-mbutton");
const tButton = document.querySelector(".js-tbutton");
