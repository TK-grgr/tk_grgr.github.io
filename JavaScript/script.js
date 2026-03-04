//イベントリスナー前のif文は消さないこと、消すと以降のプログラムが止まる可能性があります。
const scrollHeader = document.getElementById('scrollHeader');
const pagetop = document.querySelector('#pagetop');
const supiki = document.querySelector('.home-img');
const supiki2 = document.querySelector('.profile-spiki');
const not_found = document.getElementById('not_found');
const cursor = document.getElementById('spk-cursor');
const trpg_text = document.getElementById('trpg_text');
const dice_btn = document.getElementById('dice_btn');
const dice_1 = document.getElementById('dice_1');
const dice_2 = document.getElementById('dice_2');
const header_title = document.getElementById("header-title");
const header_inner = document.querySelector(".header-inner");

// ---- 定数 ----
const triggerHeight = 250;
const dice = [//ダイスの画像を入れた配列
  'images/dice_1.png',
  'images/dice_2.png',
  'images/dice_3.png',
  'images/dice_4.png',
  'images/dice_5.png',
  'images/dice_6.png'
];

let isVisible = false; // 状態管理
const scrolloptions = {
    duration:300,
    easing: "ease",
    fill:"forwards",
}

function isMobileNow() {//画像サイズを判断する関数
  return window.innerWidth < 768;
}
function roll_dice(){//1d6ダイスを振る関数
    return Math.floor(Math.random() * 6) + 1;
}
function handleScrollOrResize() {
    const isMobile = window.innerWidth < 768;
      if (isMobile) {
        scrollHeader.style.top = "0px";
        pagetop.classList.remove('visible');//画面サイズがスマホなら常にヘッダーを見えるようにする。
        header_inner.classList.add('slide');//画面サイズがスマホならヘッダーの項目を横にスライドできるようにする。
        return; // ここで処理終了
    }
    if (window.scrollY > triggerHeight && !isVisible) {
        // 表示アニメーション
        scrollHeader.animate(
            [
                { top: "-80px" },
                { top: "0px" }
            ],scrolloptions
        );
        isVisible = true;
        pagetop.classList.add('visible');
    } 
    else if (window.scrollY <= triggerHeight && isVisible) {
        // 非表示アニメーション
        scrollHeader.animate(
            [
                { top: "0px" },
                { top: "-80px" }
            ],scrolloptions
        );
        isVisible = false;
        pagetop.classList.remove('visible');
    }
};

// スクロール時の判定
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
// リサイズ時の判定
    window.addEventListener('resize', handleScrollOrResize);
// 初期表示時の判定
    document.addEventListener('DOMContentLoaded', handleScrollOrResize);
        pagetop.addEventListener('click',()=>{
        window.scrollTo({
        top:0,
        });
    });

    window.addEventListener('load',()=>{//ロード時ｽﾋﾟｷを回転させる
        if(supiki){
        supiki.animate(
            [
                {transform:'rotate(0deg)'},
                {transform:'rotate(360deg)'}
            ],
            {
                duration: 10000,
                iterations:Infinity
            }
        );
    }})
    window.addEventListener('load',()=>{
        if(supiki2){
        supiki2.animate(
            [
                {transform:'rotate(0deg)'},
                {transform:'rotate(360deg)'}
            ],
            {
                duration: 10000,
                iterations:Infinity
            }
        );
    }})
 if(not_found){//not_foundをクリックした際のイベント
    not_found.addEventListener('click',()=>{
    alert("準備中です");
})}
if(cursor){//ｽﾋﾟｷカーソル
    cursor.addEventListener('click',()=>{
        // document.body.style ="cursor:none"
        document.body.classList.toggle('change');
    })}

if(dice_btn){//2d6のイベント
dice_btn.addEventListener('click', () => {
    let n = roll_dice();
    let m = roll_dice();
    document.getElementById('dice_1').src = dice[n - 1];
    document.getElementById('dice_2').src = dice[m - 1];
    trpg_text.innerText = (`合計値：${n+m}`)
    if(n+m < 5){
        trpg_text.innerHTML = trpg_text.innerText + '<br>二つのサイコロを振って5以上が出る確率は83.33%です。'
    }
    if(n+m == 2){
        trpg_text.innerHTML = trpg_text.innerText + '<br><span style="color: red;>"<br>致命的失敗</span>'
    }
    if(n+m == 12){
        trpg_text.innerHTML = trpg_text.innerText + '<br><span style="color: blue;>"<br>決定的成功</span>'
    }
});}
