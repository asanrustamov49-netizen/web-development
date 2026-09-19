const navigationLinks = document.querySelectorAll(".navigation__links a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navigationLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

const navigation = document.querySelector(".navigation");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navigation.classList.add("scrolled");
  } else {
    navigation.classList.remove("scrolled");
  }
});
