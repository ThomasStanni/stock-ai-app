const container = document.getElementById("news");

async function loadNews() {
  try {
    const res = await fetch("/.netlify/functions/news");
    const articles = await res.json();

    for (let article of articles) {

      let aiResult = "";

      try {
        const aiRes = await fetch("/.netlify/functions/analyze", {
          method: "POST",
          body: JSON.stringify({
  text: article.title + ". " + (article.description || "")
})

        const aiData = await aiRes.json();

        aiResult = aiData.result;

        console.log("AI RESULT:", aiResult);

      } catch (err) {
        aiResult = "Error";
        console.log("AI Fehler:", err);
      }

      // 🔥 CARD DESIGN
      const div = document.createElement("div");

      div.style.marginBottom = "20px";
      div.style.padding = "20px";
      div.style.borderRadius = "12px";
      div.style.background = "#ffffff";
      div.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";

      // 📰 TITLE
      const title = document.createElement("div");
      title.innerText = article.stock + ": " + article.title;
      title.style.fontWeight = "bold";
      title.style.fontSize = "18px";
      title.style.marginBottom = "10px";

      // 🤖 AI RESULT
      const ai = document.createElement("div");
      ai.innerText = "AI: " + (aiResult || "No data");

      // ✅ SAFE CHECK (kein Crash mehr)
      if (aiResult && aiResult.includes("Bullish")) {
        ai.style.color = "green";
      } else if (aiResult && aiResult.includes("Bearish")) {
        ai.style.color = "red";
      } else {
        ai.style.color = "gray";
      }

      ai.style.fontWeight = "bold";

      // 📦 APPEND
      div.appendChild(title);
      div.appendChild(ai);
      container.appendChild(div);
    }

  } catch (error) {
    console.error("Fehler beim Laden:", error);

    container.innerHTML = "❌ Fehler beim Laden der Daten";
  }
}

loadNews();
