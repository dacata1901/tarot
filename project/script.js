const gallery = document.getElementById("gallery");
const frameSlots = document.querySelectorAll(".slot");
const openBtn = document.getElementById("openBtn");

const overlay = document.getElementById("overlay");
const popupImg = document.getElementById("popupImg");
const popupText = document.getElementById("popupText");
const nextBtn = document.getElementById("nextBtn");

/* ================= CONFIG ================= */
const backImg = "images/back.jpg";
const images = Array.from({ length: 30 }, (_, i) => `images/${i + 1}.jpg`);

const meaningsByCard = {
    1:"Khởi đầu mới #làmđầubếp",2:"Bóng Gián em",3:"Haaaaaa",4:"Slayyy hong cưng",
    5:"Meo Meo",6:"Bị nhện cắn tui thành siu nhân",7:"Thích var khom?!?",8:"Cô gái có râu",
    9:"Hi",10:"Cách chụp hình đúng",11:"Tym ❤️",12:"emdethuongquaa",
    13:"Tái sinh",14:"toi biet nhung khong the chung minh",15:"ếch nè",
    16:"Bánh mì ram ram",17:"ok khang deptrai",18:"M nhìn cái tró giề :))",
    19:"Like",20:"cute vl mấy con gà biết gì?",21:"hello",
    22:"Bị chồng đánh ",23:"em ăn cơm chưa",24:"Tym ❤️ Tym ❤️",
    25:"Ngầu voãi",26:"Buồn",27:"Hiiiiiiiiiiiiiiiiii",
    28:"Khỏi thốiiiii",29:"Y chang",30:"Hạnh phúccccccccccc❤️"
};

const finalMeanings = [
    "🌱 Xin 5 ngàn đổ xăng",
    "✨ Bả bling bling lắm á",
    "💖 Chị ngã em nâng",
    "🌈 Điều tốt đẹp sắp đến",
    "🧭 Lắng nghe nội tâm",
    "🌟 Nghĩ tích cực",
    "🍀 May mắn đến gần",
    "📖 Mỗi trải nghiệm là bài học",
    "🌞 Bả đi chơi với khang hemmm"
];

/* ================= STATE ================= */
let selectedCards = [];
let currentIndex = 0;
let phase = "idle"; // idle | cards | final

/* ================= CREATE CARDS ================= */
images.forEach((src, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.active = "true";
    card.dataset.real = src;
    card.dataset.meaning = meaningsByCard[i + 1];

    const img = document.createElement("img");
    img.src = backImg;
    card.appendChild(img);
    gallery.appendChild(card);

    card.onclick = () => {
        if (phase !== "idle") return;
        if (selectedCards.length >= 5) return;
        if (card.dataset.active !== "true") return;

        card.dataset.active = "false";
        card.style.visibility = "hidden";

        const clone = document.createElement("img");
        clone.src = backImg;
        clone.dataset.real = card.dataset.real;
        clone.dataset.meaning = card.dataset.meaning;

        frameSlots[selectedCards.length].innerHTML = "";
        frameSlots[selectedCards.length].appendChild(clone);

        selectedCards.push(clone);

        if (selectedCards.length === 5) {
            openBtn.disabled = false;
        }
    };
});

/* ================= OPEN ================= */
openBtn.onclick = () => {
    if (selectedCards.length !== 5) return;

    phase = "cards";
    currentIndex = 0;
    openBtn.disabled = true;

    overlay.style.display = "flex";
    popupImg.style.display = "block";
    popupImg.src = selectedCards[0].dataset.real;
    popupText.textContent = selectedCards[0].dataset.meaning;

    nextBtn.style.display = "inline-block";
    nextBtn.textContent = "Tiếp";
};

/* ================= NEXT ================= */
nextBtn.onclick = () => {

    if (phase === "cards") {
        currentIndex++;

        if (currentIndex < selectedCards.length) {
            popupImg.src = selectedCards[currentIndex].dataset.real;
            popupText.textContent =
                selectedCards[currentIndex].dataset.meaning;
        } else {
            phase = "final";
            popupImg.style.display = "none";
            popupText.textContent =
                finalMeanings[Math.floor(Math.random() * finalMeanings.length)];
            nextBtn.textContent = "Lượt tiếp";
        }
        return;
    }

    if (phase === "final") {
        overlay.style.display = "none";

        selectedCards = [];
        currentIndex = 0;
        phase = "idle";

        frameSlots.forEach(s => s.innerHTML = "");
        popupImg.style.display = "block";
        popupImg.src = "";
        popupText.textContent = "";

        openBtn.disabled = true;

        checkAllCardsUsed();
    }
};

/* ================= HẾT BÀI ================= */
function checkAllCardsUsed() {
    const remain = document.querySelectorAll('.card[data-active="true"]');
    if (remain.length === 0) {
        showGoodNight();
    }
}

function showGoodNight() {
    overlay.style.display = "flex";
    popupImg.style.display = "none";
    popupText.innerHTML = `
        <div class="goodnight">
            ✨ Chuc Tran ngủ ngon nhaaaaaaaaa ✨<br>
            🌙 eheheheheheheh💫
        </div>
    `;
    nextBtn.style.display = "none";
}

/* ================= MUSIC ================= */
const music = document.getElementById("tarotMusic");
document.addEventListener("click", () => {
    if (music) {
        music.muted = false;
        music.play().catch(()=>{});
    }
}, { once: true });
