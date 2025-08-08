window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.height = "6rem";
    document.getElementById("home-logo").style.height = "4rem";
    document.getElementById("buffer").style.height = "6rem";
  } else {
    document.getElementById("header").style.height = "12.25rem";
    document.getElementById("home-logo").style.height = "8rem";
    document.getElementById("buffer").style.height = "12.25rem";
  }
} 