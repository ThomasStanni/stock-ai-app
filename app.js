async function loadNews() {
  try {
    const res = await fetch('/.netlify/functions/news');
    const data = await res.json();

    const container = document.getElementById('news');
    container.innerHTML = '';

    data.forEach(article => {
      const div = document.createElement('div');

      div.innerText = article.title;

      // 🔥 Styling (Upgrade)
      div.style.marginBottom = "10px";
      div.style.fontWeight = "bold";
      div.style.padding = "10px";
      div.style.border = "1px solid #ccc";
      div.style.borderRadius = "8px";

      container.appendChild(div);
    });

  } catch (error) {
    console.error("Fehler beim Laden:", error);

    const container = document.getElementById('news');
    container.innerText = "Fehler beim Laden der News";
  }
}

// Start
loadNews();
