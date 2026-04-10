async function loadNews() {
  try {
    const res = await fetch('/.netlify/functions/news');
    const data = await res.json();

    const container = document.getElementById('news');
    container.innerHTML = '';

    for (const article of data) {

      let aiResult = "Loading...";

      try {
        const aiRes = await fetch('/.netlify/functions/analyze', {
          method: 'POST',
          body: JSON.stringify({ text: article.title })
        });

        const aiData = await aiRes.json();
        aiResult = aiData.result;

      } catch (err) {
        aiResult = "Error";
        console.log("AI Fehler:", err);
      }

      const div = document.createElement('div');

      div.style.marginBottom = "20px";
      div.style.padding = "20px";
      div.style.borderRadius = "12px";
      div.style.background = "#fff";
      div.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";

      const title = document.createElement('div');
      title.innerText = article.title;
      title.style.fontWeight = "bold";

      const ai = document.createElement('div');
      ai.innerText = "AI: " + aiResult;

      if (aiResult.includes("Bullish")) ai.style.color = "green";
      else if (aiResult.includes("Bearish")) ai.style.color = "red";
      else ai.style.color = "gray";

      div.appendChild(title);
      div.appendChild(ai);

      container.appendChild(div);
    }

  } catch (error) {
    console.error("Fehler:", error);
  }
}

loadNews();
