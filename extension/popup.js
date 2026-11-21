const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const status = document.getElementById('status');
const results = document.getElementById('results');
const submit = form.querySelector('button');
const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

function productTitle() {
  const candidates = [
    document.querySelector('meta[property="og:title"]')?.content,
    document.querySelector('#productTitle')?.textContent,
    document.querySelector('h1')?.textContent,
    document.title
  ];
  return candidates.find(value => value && value.trim())?.trim().replace(/\s*[-|]\s*(Amazon|Flipkart|Croma|JioMart).*$/i, '').slice(0, 140) || '';
}

async function prefill() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !/^https:\/\/(www\.)?(amazon\.in|flipkart\.com|croma\.com|jiomart\.com)\//i.test(tab.url || '')) return;
    const [result] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: productTitle });
    if (result?.result) queryInput.value = result.result;
  } catch (_) { /* Restricted tabs can still use manual search. */ }
}

function render(data) {
  results.replaceChildren();
  const product = data?.[0];
  if (!product?.offers?.length) {
    results.textContent = 'No offers found. Try a more specific product name.';
    results.className = 'empty';
    return;
  }
  results.className = '';
  const card = document.createElement('article');
  card.className = 'product';
  const heading = document.createElement('h2');
  heading.textContent = product.name || queryInput.value;
  card.append(heading);
  for (const offer of product.offers) {
    const row = document.createElement('div');
    row.className = 'offer';
    const left = document.createElement('div');
    const link = document.createElement('a');
    link.textContent = offer.store || 'Store';
    if (/^https:\/\//.test(offer.url || '')) {
      link.href = offer.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    left.append(link);
    if (offer.bestPrice) {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = 'Lowest listed';
      left.append(tag);
    }
    const note = document.createElement('small');
    note.className = 'note';
    note.textContent = ['JioMart', 'Croma'].includes(offer.store) ? 'Estimated price · check store' : 'Check current price at store';
    left.append(note);
    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = currency.format(Number(offer.total ?? offer.price) || 0);
    row.append(left, price);
    card.append(row);
  }
  results.append(card);
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = queryInput.value.trim();
  if (!query) return;
  submit.disabled = true;
  status.textContent = 'Searching stores…';
  results.replaceChildren();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      render(await response.json());
      status.textContent = 'Prices may change. Confirm on the store page.';
    } finally { clearTimeout(timeout); }
  } catch (_) {
    status.textContent = 'Start the website server with npm start, then try again.';
  } finally { submit.disabled = false; }
});

prefill();
