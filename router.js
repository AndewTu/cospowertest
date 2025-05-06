
document.addEventListener("DOMContentLoaded", function () {
  const content = document.getElementById("spa-content");
  const links = document.querySelectorAll("a[data-link]");

  async function navigate(path) {
    try {
      const res = await fetch("pages/" + path + ".html");
      const html = await res.text();
      content.innerHTML = html;
      window.history.pushState({}, "", "#" + path);
    } catch (err) {
      content.innerHTML = "<p>Page not found.</p>";
    }
  }

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = link.getAttribute("data-link");
      navigate(page);
    });
  });

  // Initial load
  const initial = location.hash.replace("#", "") || "home";
  navigate(initial);
});
