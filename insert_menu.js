
let menu_bar = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls")
let now_button = document.createElement('input');
let time_placeholder = ''
now_button.type = 'button'
now_button.className = "clip-btn"
now_button.style.cssText = "width: 48px; height: 48px;"

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
now_button_icon.style.cssText = "display: block;"
now_button_icon.src = 'https://icooon-mono.com/i/icon_00252/icon_002521_16.png'
now_button.appendChild(now_button_icon)
menu_bar.prepend(now_button);

