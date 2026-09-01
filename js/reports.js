(() => {
  const palette = { blue: '#4f7cff', green: '#25c99a', coral: '#ff6b7a', amber: '#ffb84d', grid: '#24384c', text: '#91a2b5' };
  const setup = (canvas) => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(canvas.clientWidth, 280), height = Math.max(canvas.clientHeight, 240);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    const context = canvas.getContext('2d'); context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { context, width, height };
  };
  const drawGrid = (context, width, height, padding) => {
    context.strokeStyle = palette.grid; context.lineWidth = 1;
    for (let row = 0; row <= 4; row += 1) {
      const y = padding + ((height - padding * 2) / 4) * row;
      context.beginPath(); context.moveTo(padding, y); context.lineTo(width - padding, y); context.stroke();
    }
  };
  const donut = (canvas) => {
    const { context, width, height } = setup(canvas);
    const values = [42, 24, 18, 16], colors = [palette.blue, palette.green, palette.coral, palette.amber];
    const centerX = width / 2, centerY = height / 2, radius = Math.min(width, height) * .29;
    let angle = -Math.PI / 2;
    values.forEach((value, index) => {
      const next = angle + (value / 100) * Math.PI * 2;
      context.beginPath(); context.arc(centerX, centerY, radius, angle, next); context.strokeStyle = colors[index]; context.lineWidth = 24; context.stroke(); angle = next;
    });
    context.fillStyle = '#f5f8fc'; context.font = '700 24px Albert Sans'; context.textAlign = 'center'; context.fillText('R$ 4.589', centerX, centerY);
    context.fillStyle = palette.text; context.font = '13px Albert Sans'; context.fillText('total gasto', centerX, centerY + 22);
  };
  const line = (canvas, values, color = palette.blue) => {
    const { context, width, height } = setup(canvas); const padding = 28; drawGrid(context, width, height, padding); const max = Math.max(...values) * 1.12;
    context.beginPath();
    values.forEach((value, index) => {
      const x = padding + (index / (values.length - 1)) * (width - padding * 2); const y = height - padding - (value / max) * (height - padding * 2);
      if (index === 0) context.moveTo(x, y); else context.lineTo(x, y);
    });
    context.strokeStyle = color; context.lineWidth = 3; context.lineJoin = 'round'; context.lineCap = 'round'; context.stroke();
  };
  const bars = (canvas) => {
    const { context, width, height } = setup(canvas); const incoming = [72, 58, 84, 68, 91, 77], outgoing = [48, 63, 52, 71, 59, 66]; const padding = 28;
    drawGrid(context, width, height, padding); const group = (width - padding * 2) / incoming.length, barWidth = Math.min(16, group * .24);
    incoming.forEach((value, index) => {
      const x = padding + group * index + group / 2, usable = height - padding * 2;
      context.fillStyle = palette.green; context.fillRect(x - barWidth - 2, height - padding - usable * value / 100, barWidth, usable * value / 100);
      context.fillStyle = palette.coral; context.fillRect(x + 2, height - padding - usable * outgoing[index] / 100, barWidth, usable * outgoing[index] / 100);
    });
  };
  const render = () => {
    const pie = document.getElementById('pieChart'), categoryLine = document.getElementById('lineChart'), incomeExpense = document.getElementById('incomeExpense'), monthly = document.getElementById('monthlyChart');
    if (pie) donut(pie); if (categoryLine) line(categoryLine, [38, 52, 46, 71, 64, 86, 78]); if (incomeExpense) bars(incomeExpense); if (monthly) line(monthly, [32, 48, 43, 66, 58, 79, 74, 91]);
  };
  let frame; const schedule = () => { window.cancelAnimationFrame(frame); frame = window.requestAnimationFrame(render); };
  window.addEventListener('resize', schedule, { passive: true }); render();
})();
