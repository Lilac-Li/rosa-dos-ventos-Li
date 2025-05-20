function degToCompass(deg) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((deg % 360) / 45) % 8;
  return directions[index];
}

function updateSunPointer(position) {
  const { latitude, longitude } = position.coords;

  // Usando SunCalc para calcular posição do Sol
  const times = SunCalc.getTimes(new Date(), latitude, longitude);
  const sunPos = SunCalc.getPosition(new Date(), latitude, longitude);

  const azimuthDeg = (sunPos.azimuth * 180) / Math.PI + 180;

  const pointer = document.getElementById("sunPointer");
  pointer.style.transform = `rotate(${azimuthDeg}deg) translate(-50%, -100%)`;

  const info = document.getElementById("info");
  info.innerText = `☀️ Sol a ${Math.round(azimuthDeg)}° (${degToCompass(azimuthDeg)})`;
}

function showError() {
  document.getElementById("info").innerText =
    "Não foi possível acessar sua localização.";
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(updateSunPointer, showError);
} else {
  showError();
}
