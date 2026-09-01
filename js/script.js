(() => {
  const chart = document.getElementById('economyChart');
  if (!chart) return;
  const data = [50, 120, 200, 310, 290, 400, 600, 750, 720, 680, 820, 700];
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const width = 530, height = 220, left = 55, bottom = 30, top = 20, right = 10, max = 1000;
  const x = data.map((_, index) => left + (index / (data.length - 1)) * (width - left - right));
  const y = data.map((value) => top + (1 - value / max) * (height - top - bottom));
  let line = `M ${x[0]} ${y[0]}`;
  for (let index = 1; index < x.length; index += 1) {
    const controlX = (x[index - 1] + x[index]) / 2;
    line += ` C ${controlX} ${y[index - 1]}, ${controlX} ${y[index]}, ${x[index]} ${y[index]}`;
  }
  const area = `${line} L ${x.at(-1)} ${height - bottom} L ${x[0]} ${height - bottom} Z`;
  const grid = [0, 250, 500, 750, 1000].map((value) => {
    const lineY = top + (1 - value / max) * (height - top - bottom);
    return `<line x1="${left}" y1="${lineY}" x2="${width - right}" y2="${lineY}" stroke="#263b52"/><text x="${left - 8}" y="${lineY + 4}" text-anchor="end" fill="#8fa1b5" font-size="11">R$${value}</text>`;
  }).join('');
  const dots = data.map((_, index) => `<circle cx="${x[index]}" cy="${y[index]}" r="4" fill="#4f7cff" stroke="#07121f" stroke-width="2"/>`).join('');
  const labels = months.map((month, index) => `<text x="${x[index]}" y="${height - 5}" text-anchor="middle" fill="#8fa1b5" font-size="11">${month}</text>`).join('');
  chart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Evolução da economia mensal"><defs><linearGradient id="economy-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4f7cff" stop-opacity=".5"/><stop offset="100%" stop-color="#4f7cff" stop-opacity=".03"/></linearGradient></defs>${grid}<path d="${area}" fill="url(#economy-gradient)"/><path d="${line}" fill="none" stroke="#4f7cff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${labels}</svg>`;
})();
