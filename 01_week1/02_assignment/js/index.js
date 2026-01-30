const updateClock = () => {
  const date = new Date();
  // console.log(date);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // about using '-90' to make the clock start from top (12 o'clock position) was helped by ChatGPT
  const hourDeg = (hours % 12) * 30 + minutes * 0.5 - 90;
  const minuteDeg = minutes * 6 + seconds * 0.1 - 90;
  const secondDeg = seconds * 6 - 90;

  document.querySelector(".hour").style.transform = `translateY(-50%) rotate(${hourDeg}deg)`;
  document.querySelector(".minute").style.transform = `translateY(-50%) rotate(${minuteDeg}deg)`;
  document.querySelector(".second").style.transform = `translateY(-50%) rotate(${secondDeg}deg)`;
};

setInterval(updateClock, 1000);
updateClock();
