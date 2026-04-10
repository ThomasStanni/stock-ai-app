async function loadNews() {
  const res = await fetch('/.netlify/functions/news');
  const data = await res.json();

  const container = document.getElementById('news');

  container.innerHTML = '';

  data.forEach(article => {
    const div = document.createElement('div');
    div.innerText = article.title;
    container.appendChild(div);
  });
}

loadNews();
