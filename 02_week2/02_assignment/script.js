const signage = document.querySelector(".signage");
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let currantRotationX = 0;
let currantRotationY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let accumulatedRotationX = 0;
let accumulatedRotationY = 0;
let isDragging = false;

document.addEventListener("mousedown", (e) => {
  isDragging = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

document.addEventListener("mouseup", (e) => {
  isDragging = false;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;
    accumulatedRotationY += deltaX * 0.5;
    accumulatedRotationX -= deltaY * 0.5;

    targetRotationY = accumulatedRotationY;
    targetRotationX = accumulatedRotationX;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }
});

document.addEventListener("mouseleave", (e) => {
  isDragging = false;
});

function animate() {
  currantRotationX += (targetRotationX - currantRotationX) * 0.1;
  currantRotationY += (targetRotationY - currantRotationY) * 0.1;
  //to make the element centered, declaring its transform in js required
  signage.style.transform = `
  translate(-50%, -50%)
  rotateX(${currantRotationX}deg)
  rotateY(${currantRotationY}deg)
  `;
  requestAnimationFrame(animate);
}

animate();
