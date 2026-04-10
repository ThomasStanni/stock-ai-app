async function loadNews() {
  const res = await fetch('/.netlify/functions/news');
  const data = await res.json();

  const container = document.getElementById('news');
  container.innerHTML = '';

  for (const article of data) {

    // 🤖 KI Analyse holen
    const aiRes = await fetch('/.netlify/functions/analyze', {
      method: 'POST',
      body: JSON.stringify({ text: article.title })
    });

    const aiData = await aiRes.json();

    const div = document.createElement('div');

    // 🎨 Design
    div.style.marginBottom = "20px";
    div.style.padding = "20px";
    div.style.borderRadius = "12px";
    div.style.background = "#ffffff";
    div.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    div.style.transition = "0.2s";

    // Hover
    div.onmouseover = () => div.style.transform = "scale(1.02)";
    div.onmouseout = () => div.style.transform = "scale(1)";

    // 🧾 Inhalt
    const title = document.createElement('div');
    title.innerText = article.title;
    title.style.fontWeight = "bold";
    title.style.fontSize = "18px";
    title.style.marginBottom = "10px";

    const ai = document.createElement('div');
    ai.innerText = "AI: " + aiData.result;

    // Farbe je nach Ergebnis
    if (aiData.result.includes("Bullish")) {
      ai.style.color = "green";
    } else if (aiData.result.includes("Bearish")) {
      ai.style.color = "red";
    } else {
      ai.style.color = "gray";
    }

    // 📊 Fake Stock Tag (Upgrade später möglich)
    const stock = document.createElement('div');
    stock.innerText = "Stock: AI detected market sentiment";
    stock.style.fontSize = "12px";
    stock.style.opacity = "0.6";

    div.appendChild(title);
    div.appendChild(ai);
    div.appendChild(stock);

    container.appendChild(div);
  }
}

loadNews();
