document.addEventListener("DOMContentLoaded", () => {
  Presentation.init(SLIDES);

  const veil = document.getElementById("loadingVeil");
  if (veil) {
    setTimeout(() => veil.classList.add("is-hidden"), 500);
    setTimeout(() => veil.remove(), 1200);
  }
});
