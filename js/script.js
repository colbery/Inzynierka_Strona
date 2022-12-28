const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleWhiteIcon = document.getElementById("theme-toggle-white-icon");
const heartW = document.getElementById("heartW");
const heartD = document.getElementById("heartD");
const smileW = document.getElementById("smileW");
const smileD = document.getElementById("smileD");
const likeW = document.getElementById("likeW");
const likeD = document.getElementById("likeD");

if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleDarkIcon.classList.remove("hidden");
  heartD.classList.remove("hidden");
  smileD.classList.remove("hidden");
  likeD.classList.remove("hidden");
} else {
  themeToggleWhiteIcon.classList.remove("hidden");
  heartW.classList.remove("hidden");
  smileW.classList.remove("hidden");
  likeW.classList.remove("hidden");
}

//sluchaj klikniecia zmiany dark => white , white => dark

themeToggleBtn.addEventListener("click", toggleMode);

function toggleMode() {
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleWhiteIcon.classList.toggle("hidden");
  heartW.classList.toggle("hidden");
  smileW.classList.toggle("hidden");
  likeW.classList.toggle("hidden");
  heartD.classList.toggle("hidden");
  smileD.classList.toggle("hidden");
  likeD.classList.toggle("hidden");

  //jesli dark w local storage

  if (localStorage.getItem("color-theme")) {
    //jesli white to zmiana na dark i wrzuć do localstorage
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  } else {
    //jesli nie ma w localstorage
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
}
