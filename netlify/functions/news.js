export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify([
      { title: "Market rises after Fed decision" },
      { title: "Tech stocks show strong recovery" },
      { title: "Oil prices increase due to global tensions" }
    ])
  };
}
