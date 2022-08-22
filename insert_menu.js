
let menu_bar = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls")
let now_button = document.createElement('div');
let time_placeholder = ''
now_button.className = "clip-btn"

// 現在の再現方法
// コメント欄が現れるまでスクロールする
// コメント欄をクリックする
// ボタンをおす

// コメント欄が現れないときのボタンのイベント
now_button.addEventListener('click', function() {
    let play_time = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-current").innerText;
    play_time = `${play_time}  \n`
    time_placeholder = `${time_placeholder}${play_time}`
    const url = new URL(window.location)
    const video_id = url.searchParams.get("v")
    window.localStorage.setItem(video_id, time_placeholder)

    alert(`いまの時間は ${play_time} です`)
})

// placeholder をクリックしてコメント欄を出現させる
// document.querySelector("#placeholder-area").click()

// コメント欄が出現するのを監視
window.setTimeout(() =>{
    const targetNode = document.querySelectorAll("#contents")[3]
    if(targetNode == null){
        alert('存在しません')
    } else {
        alert('存在する')
    }

    const config = { childList: true };
    const observer = new MutationObserver(() => {
        alert('コメント欄が出現しました。');
    });
    observer.observe(targetNode, config)
}, 4000);


let now_button_icon = document.createElement('img')
const clip_image_url = chrome.runtime.getURL('images/scissors.png')
now_button_icon.src = clip_image_url
now_button_icon.className = 'now-button-icon'

let now_button_tooltip = document.createElement('span')
now_button_tooltip.textContent = 'タイムスタンプをコメント欄へ記録'
now_button_tooltip.className = 'tooltip'

now_button.appendChild(now_button_icon)
now_button.appendChild(now_button_tooltip)
menu_bar.prepend(now_button);


