document.addEventListener("DOMContentLoaded", function () {

  const memeContainer = document.getElementById("meme-container");
  const form = document.getElementById("meme-form");
  const zoomSlider = document.getElementById("zoom-slider");

  // ── Create Meme ──
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const topText = document.getElementById("top-text").value;
    const bottomText = document.getElementById("bottom-text").value;
    const imageUrl = document.getElementById("image-url").value;

    // validation
    if (topText.length < 5 || bottomText.length < 5) {
      alert("Text must be at least 5 characters");
      return;
    }

    const meme = document.createElement("div");
    meme.classList.add("meme");

    const img = document.createElement("img");
    img.src = imageUrl.trim();

    img.onerror = function () {
      alert("Image failed to load. Use a direct image URL (.jpg/.png)");
      this.src = "https://via.placeholder.com/400x300?text=Invalid+Image";
    };

    const top = document.createElement("div");
    top.classList.add("top-text");
    top.innerText = topText;

    const bottom = document.createElement("div");
    bottom.classList.add("bottom-text");
    bottom.innerText = bottomText;

    const delButton = document.createElement("button");
    delButton.innerText = "Delete";
    delButton.classList.add("deleteButton");

    delButton.addEventListener("click", function () {
      meme.remove();
    });

    meme.appendChild(img);
    meme.appendChild(top);
    meme.appendChild(bottom);
    meme.appendChild(delButton);

    memeContainer.appendChild(meme);

    form.reset();
  });

  // ── Zoom Function ──
  function applyZoom(value) {
    value = Math.min(2, Math.max(0.5, parseFloat(value)));

    const app = document.querySelector(".app");
    app.style.transform = `scale(${value})`;
    app.style.transformOrigin = "top center";

    document.body.style.minHeight =
      app.offsetHeight * value + 120 + "px";

    zoomSlider.value = value;
  }

  zoomSlider.addEventListener("input", function () {
    applyZoom(this.value);
  });

  const buttons = document.querySelectorAll(".zoom-bar span");

  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      let current = parseFloat(zoomSlider.value);
      let next = this.innerText === "−"
        ? current - 0.1
        : current + 0.1;

      applyZoom(next.toFixed(2));
    });
  });

});