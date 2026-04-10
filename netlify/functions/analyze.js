exports.handler = async function (event) {
  try {
    const { text } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a professional stock trader. Analyze if this news will move stock prices. Positive = Bullish, Negative = Bearish, unclear = Neutral. Answer ONLY with one word."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", data); // 🔥 DEBUG

    // ✅ SAFE CHECK
    const result =
      data?.choices?.[0]?.message?.content || "Neutral";

    return {
      statusCode: 200,
      body: JSON.stringify({ result })
    };

  } catch (error) {
    console.error("FUNCTION ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
