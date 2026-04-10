exports.handler = async function () {
  try {
    const stocks = ["AAPL", "TSLA", "MSFT"];
    let allNews = [];

    for (let stock of stocks) {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${stock}&language=en&pageSize=2&apiKey=${process.env.NEWS_API_KEY}`
      );

      const data = await res.json();

      console.log("NEWS API:", data); // 🔥 DEBUG

      if (!data.articles) continue; // ✅ verhindert Crash

      const articles = data.articles.map(a => ({
        title: a.title || "No title",
        stock: stock
      }));

      allNews.push(...articles);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(allNews)
    };

  } catch (error) {
    console.error("NEWS ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
