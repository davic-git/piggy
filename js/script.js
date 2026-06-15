const data = [50, 120, 200, 310, 290, 400, 600, 750, 720, 680, 820, 700];
const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const W = 530, H = 220, padL = 55, padB = 30, padT = 20, padR = 10;
const maxV = 1000;
const xs = data.map((_, i) => padL + (i / (data.length - 1)) * (W - padL - padR));
const ys = data.map(v => padT + (1 - v / maxV) * (H - padT - padB));
const gridLines = [0, 250, 500, 750, 1000];
let path = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    const cpx = (xs[i - 1] + xs[i]) / 2;
      path += ` C ${cpx} ${ys[i - 1]}, ${cpx} ${ys[i]}, ${xs[i]} ${ys[i]}`;
    }
    const areaPath = path + ` L ${xs[xs.length-1]} ${H - padB} L ${xs[0]} ${H - padB} Z`;

    let svgHtml = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" width="100%" style="overflow:visible">
      <defs>
        <linearGradient id="ecoGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2563EB" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#2563EB" stop-opacity="0.03"/>
        </linearGradient>
      </defs>`;

    gridLines.forEach(v => {
      const y = padT + (1 - v / maxV) * (H - padT - padB);
      svgHtml += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#263B52" stroke-width="1"/>
        <text x="${padL - 8}" y="${y + 4}" text-anchor="end" fill="#a0a0a0" font-size="11" font-family="Albert Sans,sans-serif">R$${v}</text>`;
    });

    svgHtml += `<path d="${areaPath}" fill="url(#ecoGrad)"/>
      <path d="${path}" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;

    data.forEach((v, i) => {
      svgHtml += `<circle cx="${xs[i]}" cy="${ys[i]}" r="4" fill="#2563EB" stroke="#050E19" stroke-width="2"/>`;
    });

    months.forEach((m, i) => {
      svgHtml += `<text x="${xs[i]}" y="${H - 5}" text-anchor="middle" fill="#a0a0a0" font-size="11" font-family="Albert Sans,sans-serif">${m}</text>`;
    });
document.getElementById('economyChart').innerHTML = svgHtml;


const telInput = document.getElementById('phone');

telInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    value = value.slice(0, 11);

    if (value.length <= 2) {
        value = value.replace(/^(\d*)$/, '($1');
    } else if (value.length <= 7) {
        value = value.replace(/^(\d{2})(\d*)$/, '($1) $2');
    } else {
        value = value.replace(
            /^(\d{2})(\d{5})(\d{0,4})$/,
            '($1) $2-$3'
        );
    }

    e.target.value = value;
});