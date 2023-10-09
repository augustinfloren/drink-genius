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