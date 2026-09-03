const looks = [
  ["Fiery Couture", "No. 01", "/assets/fashion/fiery-couture.png"],
  ["Bird of Paradise", "No. 02", "/assets/fashion/bird-of-paradise.png"],
  ["White Tuxedo", "No. 03", "/assets/fashion/white-tuxedo.png"],
  ["Cuban Bloom", "No. 04", "/assets/fashion/cuban-bloom.png"],
];

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("figure img");
const lightboxNumber = lightbox.querySelector("figcaption span");
const lightboxName = lightbox.querySelector("figcaption b");
let activeLook = 0;

function showLook(index) {
  activeLook = (index + looks.length) % looks.length;
  const [name, number, image] = looks[activeLook];
  lightboxImage.src = image;
  lightboxImage.alt = name;
  lightboxNumber.textContent = number;
  lightboxName.textContent = name;
  lightbox.setAttribute("aria-label", name);
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightbox.querySelector(".close").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
  document.querySelector(`[data-look="${activeLook}"]`).focus();
}

document.querySelectorAll("[data-look]").forEach((button) => {
  button.addEventListener("click", () => showLook(Number(button.dataset.look)));
});
lightbox.querySelector(".close").addEventListener("click", closeLightbox);
lightbox.querySelector(".prev").addEventListener("click", () => showLook(activeLook - 1));
lightbox.querySelector(".next").addEventListener("click", () => showLook(activeLook + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showLook(activeLook - 1);
  if (event.key === "ArrowRight") showLook(activeLook + 1);
});
