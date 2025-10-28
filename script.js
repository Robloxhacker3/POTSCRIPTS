const container = document.getElementById('scripts-container');
const searchInput = document.getElementById('search');
const countDiv = document.getElementById('count');

let scripts = JSON.parse(document.getElementById('scripts-json').textContent);

function makePlaceholder(name, id) {
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='360'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='22'>${name}</text><text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' fill='%23cbd5e1' font-size='16'>Placeholder #${id}</text></svg>`;
}

// Show 2 Google AdSense ads before giving the script
function showAdsThenCode(script) {
  let adContainer1 = document.getElementById('ad1');
  let adContainer2 = document.getElementById('ad2');

  // Create ad containers if they don't exist
  if (!adContainer1) {
    adContainer1 = document.createElement('div');
    adContainer1.id = 'ad1';
    adContainer1.style.display = 'none';
    adContainer1.style.textAlign = 'center';
    adContainer1.innerHTML = `
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
           data-ad-slot="YOUR_AD_SLOT_1"
           data-ad-format="auto"></ins>`;
    document.body.appendChild(adContainer1);
  }

  if (!adContainer2) {
    adContainer2 = document.createElement('div');
    adContainer2.id = 'ad2';
    adContainer2.style.display = 'none';
    adContainer2.style.textAlign = 'center';
    adContainer2.innerHTML = `
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
           data-ad-slot="YOUR_AD_SLOT_2"
           data-ad-format="auto"></ins>`;
    document.body.appendChild(adContainer2);
  }

  // Show first ad
  adContainer1.style.display = 'block';
  (adsbygoogle = window.adsbygoogle || []).push({});

  setTimeout(() => {
    adContainer1.style.display = 'none';
    adContainer2.style.display = 'block';
    (adsbygoogle = window.adsbygoogle || []).push({});

    setTimeout(() => {
      adContainer2.style.display = 'none';
      navigator.clipboard.writeText(script.code).then(() => {
        alert('Script copied to clipboard!');
      });
    }, 4000); // Second ad duration (ms)
  }, 4000); // First ad duration (ms)
}

function renderScripts(filter='') {
  container.innerHTML = '';
  let filtered = scripts.filter(s => 
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.link.toLowerCase().includes(filter.toLowerCase()) ||
    s.code.toLowerCase().includes(filter.toLowerCase()) ||
    String(s.id).includes(filter)
  );

  countDiv.textContent = `${filtered.length} of ${scripts.length} scripts shown`;

  filtered.forEach(script => {
    const card = document.createElement('div');
    card.className = 'script-card';
    const img = document.createElement('img');
    img.src = script.image || makePlaceholder(script.name, script.id);
    card.appendChild(img);

    const title = document.createElement('div');
    title.textContent = script.name;
    card.appendChild(title);

    const link = document.createElement('a');
    link.href = script.link || '#';
    link.target = '_blank';
    link.textContent = script.link || 'No link set';
    card.appendChild(link);

    const codeBtn = document.createElement('button');
    codeBtn.textContent = 'Get Script';
    codeBtn.onclick = () => showAdsThenCode(script);
    card.appendChild(codeBtn);

    container.appendChild(card);
  });
}

searchInput.addEventListener('input', e => renderScripts(e.target.value));

renderScripts();
