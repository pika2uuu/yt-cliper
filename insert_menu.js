let menu_bar = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls")
let is_not_live = ( null == document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate.ytp-live > button") )

// 切り抜きボタン
let now_button = document.createElement('div');

now_button.className = "custom-btn"
// ボタンの中のハサミの画像
let now_button_icon = document.createElement('img')
const clip_image_url = chrome.runtime.getURL('images/scissors.png')
now_button_icon.src = clip_image_url
now_button_icon.className = 'now-button-icon'
now_button.appendChild(now_button_icon)
// 切り抜きボタンのツールチップ
let now_button_tooltip = document.createElement('span')
now_button_tooltip.textContent = 'タイムスタンプを記録'
now_button_tooltip.className = 'tooltip'
now_button.appendChild(now_button_tooltip)
// 切り抜きボタンを押した時に出るポップアップ
let now_button_popup = document.createElement('span')
now_button_popup.textContent = '記録しました'
now_button_popup.className = 'clicked-popup'
now_button.appendChild(now_button_popup)
// メニューバーに挿入
menu_bar.prepend(now_button);

// 書き込みボタン
let write_button = document.createElement('div')
write_button.className = 'custom-btn'
//書き込みボタンの画像
let write_button_icon = document.createElement('img')
const write_image_url = (is_not_live) ? chrome.runtime.getURL('images/write.png') : chrome.runtime.getURL('images/write-disabled.png')
write_button_icon.src = write_image_url
write_button_icon.className = 'write-button-icon'
write_button.appendChild(write_button_icon)
// ツールチップ
let write_button_tooltip = document.createElement('span')
write_button_tooltip.textContent = (is_not_live) ? "タイムスタンプを書き込む" : "配信中は書き込めません"
write_button_tooltip.className = 'tooltip'
write_button.appendChild(write_button_tooltip)
// メニューバーに挿入
menu_bar.prepend(write_button);

// コメント欄が現れないときのボタンのイベント
now_button.addEventListener('click', function() {
    // ページのデータ(グローバルスコープに置くとページ移動しても下の4つのデータが更新されない)
    const url = new URL(window.location)
    const video_id = url.searchParams.get("v")
    const local_storage_data = window.localStorage.getItem(video_id)
    let time_placeholder = ( local_storage_data == null) ? '' : local_storage_data
    // 再生時間をlocalStrangeに追記する
    let play_time = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-current").innerText;
    play_time = `${play_time}　\n` // 全角1文字空ける
    time_placeholder = `${time_placeholder}${play_time}`
    window.localStorage.setItem(video_id, time_placeholder)

    // alert(`いまの時間は ${play_time} です`)
})

// 配信中はイベントリスナーつけない
if (is_not_live) {
    write_button.addEventListener('click', () => {
        // ページのデータ(グローバルスコープに置くとページ移動しても下の4つのデータが更新されない)
        const url = new URL(window.location)
        const video_id = url.searchParams.get("v")
        const local_storage_data = window.localStorage.getItem(video_id)
        let time_placeholder = ( local_storage_data == null) ? '' : local_storage_data
        // 画面の底までスクロールさせるとコメント欄が出現するが、画面の横幅によって底の要素が違うのでbreakpointで識別
        const breakpoint = 1016
        const window_width = window.outerWidth
        const bottom_element = (window_width < breakpoint) ? document.querySelector("#button > ytd-button-renderer") : document.querySelector("#container > ytd-expander")
        bottom_element.scrollIntoView({behavior: 'smooth', block: 'start'})

        // コメント欄が遅延ロードで読み込まれるので念の為2秒待つ。その後書込みをしてlocalStrageから削除
        setTimeout(() => {
            // プレイスホルダーをクリックするとコメントが入力できるテキストエリアが出現する
            const place_holder_area = document.querySelector("#placeholder-area");
            place_holder_area.click();

            const comment = time_placeholder
            const text_area = document.querySelector("yt-formatted-string > #contenteditable-root")
            text_area.insertAdjacentText('beforeend', comment)
            // データを共有している変数を空にする
            time_placeholder = ''
            // localStorage から保存したタイムスタンプを削除
            window.localStorage.removeItem(video_id)
        }, 2000)
    })
}
