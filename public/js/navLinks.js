const links = document.querySelectorAll("#user-nav .nav-item");

for (const link of links) {
  link.addEventListener('click', () => {
    links.forEach((link) => {
      link.classList.remove('user-active-btn');
      link.classList.add('user-btn');
    });
    link.classList.remove('user-btn');
    link.classList.add('user-active-btn')
  })
}

if (window.matchMedia("(max-width: 700px)").matches) {
  // Viewport is less or equal to 700 pixels wide
  const url = window.location.href;
  if (url.includes("/profile/parameters")) {
    console.log("truc")
  }
}