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

//target location
let userLat = null;
let userLng = null;
let compass = 0;
const targetLat = 40.71695;
const targetLng = -73.99885;

//getting geolocation
navigator.geolocation.watchPosition(
  (position) => {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    updateRotation(); // Update rotation when position changes
  },
  (error) => {
    console.error("Geolocation error:", error);
  },
);

//calcutating bearing
function calculateBearing(lat1, lng1, lat2, lng2) {
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const x = Math.sin(dLng) * Math.cos(lat2Rad);
  const y = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);

  let bearing = (Math.atan2(x, y) * 180) / Math.PI;
  return (bearing + 360) % 360; // 0-360
}

//device orientation api(mobile only)
window.addEventListener("deviceorientation", (e) => {
  if (e.alpha !== null) {
    compass = e.alpha;
    updateRotation(); // Update rotation when position changes
  }
});

//calcutating rotation
function updateRotation() {
  if (userLat === null) return; // 위치 없으면 종료

  const targetBearing = calculateBearing(userLat, userLng, targetLat, targetLng);
  const rotation = targetBearing - compass;

  // animate() 안에서 적용하거나 여기서 직접 적용
  targetRotationY = rotation;
}

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
