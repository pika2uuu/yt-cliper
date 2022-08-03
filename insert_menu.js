
let menu_bar = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls")
let now_button = document.createElement('input');
now_button.type = 'button'
now_button.className = "clip-btn"
now_button.style.cssText = "width: 48px; height: 48px;"
now_button.addEventListener('click', function() {
    alert('クリックされました。')
})

let now_button_icon = document.createElement('img')
now_button_icon.style.cssText = "display: block;"
now_button_icon.src = 'https://icooon-mono.com/i/icon_00252/icon_002521_16.png'
now_button.appendChild(now_button_icon)
menu_bar.prepend(now_button);

