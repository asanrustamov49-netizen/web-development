const track = document.querySelector(".technologies__track");
const nextButton = document.querySelector(".technologies__next");
const prevButton = document.querySelector(".technologies__prev");
const dots = document.querySelectorAll(".technologies__dots .carousel__dot");
const originalCards = Array.from(
  document.querySelectorAll(".technologies__track .carousel-card"),
);

const totalCards = originalCards.length;
const firstCards = originalCards.map((card) => {
  return card.cloneNode(true);
});
const lastCards = originalCards.map((card) => {
  return card.cloneNode(true);
});
firstCards.forEach((card) => {
  track.appendChild(card);
});
lastCards.reverse().forEach((card) => {
  track.insertBefore(card, track.firstChild);
});

function getScrollAmount() {
  const card = track.querySelector(".carousel-card");
  if (!card) {
    return 0;
  }
  return card.offsetWidth + 16;
}

function getInitialPosition() {
  return getScrollAmount() * totalCards;
}
track.scrollLeft = getInitialPosition();

function handleInfiniteScroll() {
  const cardWidth = getScrollAmount();
  const currentPosition = track.scrollLeft;
  if (currentPosition >= cardWidth * (totalCards * 9)) {
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
  if (!cardWidth) {
    return;
  }
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