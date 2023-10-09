const links = document.querySelectorAll(".nav-item-link");

for (const link of links) {

  link.addEventListener('click', () => {
    links.forEach((link) => link.style.fontWeight = 'normal');
    link.style.fontWeight = 'bold';
  })
}