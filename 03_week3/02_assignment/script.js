async function updateJellyCard() {
  const res = await fetch("https://jellybellywikiapi.onrender.com/api/beans?pageSize=50");
  const data = await res.json();

  const jellyNameEl = document.querySelector(".jelly-name p");
  const jellyEmailEl = document.querySelector(".jelly-email");
  const cardEl = document.querySelector(".card");
  const frontEl = document.querySelector(".front");
  const backEl = document.querySelector(".back");
  const svgEl = document.querySelector(".front img");
  const textEls = backEl.querySelectorAll("p"); // back 안 모든 p 태그 선택

  const pick = () => {
    const randomBean = data.items[Math.floor(Math.random() * data.items.length)];
    const emailName = randomBean.flavorName.toLowerCase().replace(/\s+/g, "");

    jellyNameEl.textContent = randomBean.flavorName;
    jellyEmailEl.textContent = emailName;
    frontEl.style.backgroundColor = randomBean.backgroundColor;
    backEl.style.backgroundColor = randomBean.backgroundColor;

    // 밝기 계산
    const hex = randomBean.backgroundColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightness > 128 ? "#22223b" : "#f2e9e4";

    // back 안 모든 p 태그에 직접 적용
    textEls.forEach((el) => (el.style.color = textColor));

    // SVG 색상 변경 (어두운 배경이면 밝게, 밝은 배경이면 어둡게)
    if (brightness > 128) {
      svgEl.style.filter = "brightness(0)"; // 어두운 색
    } else {
      svgEl.style.filter = "brightness(0) invert(1)"; // 밝은 색
    }
  };

  cardEl.addEventListener("click", () => {
    cardEl.classList.toggle("flipped");
    if (cardEl.classList.contains("flipped")) {
      pick();
    }
  });
}

updateJellyCard();
