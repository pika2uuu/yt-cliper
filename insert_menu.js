
let menu_bar = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls")
let now_button = document.createElement('input');
now_button.type = 'button'
now_button.className = "clip-btn"
now_button.style.cssText = "width: 48px; height: 48px;"
now_button.addEventListener('click', function() {
    let play_time = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-current").innerText;
    play_time = `${play_time}  \n`
    let comment_text_area = document.querySelector("#contenteditable-root");
    comment_text_area.insertAdjacentText('beforeend', play_time);
    alert(`いまの時間は ${play_time} です`)
})

let now_button_icon = document.createElement('img')
now_button_icon.style.cssText = "display: block;"
now_button_icon.src = 'https://icooon-mono.com/i/icon_00252/icon_002521_16.png'
now_button.appendChild(now_button_icon)
menu_bar.prepend(now_button);

