const track = document.querySelector(".about__track");
const nextButton = document.querySelector(".about__next");
const prevButton = document.querySelector(".about__prev");
const dots = document.querySelectorAll(".about__dots .carousel__dot");
const originalCards = Array.from(
  document.querySelectorAll(".about__track .carousel-card"),
);

const totalCards = originalCards.length;
const firstCards = originalCards.map((card) => card.cloneNode(true));
const lastCards = originalCards.map((card) => card.cloneNode(true));
firstCards.forEach((card) => {
  track.appendChild(card);
});
lastCards.reverse().forEach((card) => {
  track.insertBefore(card, track.firstChild);
});

function getScrollAmount() {
  const card = track.querySelector(".carousel-card");
  if (!card) return 0;
  const gap = 16;
  return card.offsetWidth + gap;
}

function getInitialPosition() {
  return getScrollAmount() * totalCards;
}

track.scrollLeft = getInitialPosition();

function handleInfiniteScroll() {
  const cardWidth = getScrollAmount();
  if (!cardWidth) return;
  const currentPosition = track.scrollLeft;
  if (currentPosition >= cardWidth * (totalCards * 15)) {
    track.scrollLeft = currentPosition - cardWidth * totalCards;
  }
  if (currentPosition <= 0) {
    track.scrollLeft = currentPosition + cardWidth * totalCards;
  }
}

nextButton.addEventListener("click", () => {
  track.scrollBy({
    left: getScrollAmount(),
    behavior: "smooth",
  });
});

prevButton.addEventListener("click", () => {
  track.scrollBy({
    left: -getScrollAmount(),
    behavior: "smooth",
  });
});

function updateDots() {
  const cardWidth = getScrollAmount();
  if (!cardWidth) return;
  const position = Math.round(track.scrollLeft / cardWidth);
  const currentIndex = position % totalCards;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    track.scrollTo({
      left: getScrollAmount() * (totalCards + index),
      behavior: "smooth",
    });
  });
});

track.addEventListener("scroll", () => {
  handleInfiniteScroll();
  updateDots();
});

window.addEventListener("resize", () => {
  track.scrollLeft = getInitialPosition();
  updateDots();
});

updateDots();