const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('pages/Sidebar/Recurrent/recurrent.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach(source => new vm.Script(source));
function element(dataset = {}) {
  return { dataset, hidden: false, value: '', attrs: {}, events: {},
    setAttribute(key, value) { this.attrs[key] = value; },
    addEventListener(name, callback) { this.events[name] = callback; },
    focus() { this.focused = true; }
  };
}
const rows = [...html.matchAll(/<tr data-recurrence[^>]*>[\s\S]*?<\/tr>/g)].map(([markup]) => {
  const row = element(Object.fromEntries([...markup.matchAll(/data-(status|date|amount)="([^"]+)"/g)].map(m => [m[1], m[2]])));
  row.textContent = markup.replace(/<[^>]+>/g, ' ');
  return row;
});
const filters = [...html.matchAll(/data-status-filter="([^"]+)"/g)].map(m => element({statusFilter:m[1]}));
const sorts = [...html.matchAll(/data-sort="([^"]+)"/g)].map(m => element({sort:m[1]}));
const search = element(), empty = element(), results = element(), headerSearch = element();
const tbody = { children: [...rows], append(row) { this.children = this.children.filter(r => r !== row); this.children.push(row); } };
const doc = {
  addEventListener(event, callback) { if (event === 'DOMContentLoaded') callback(); },
  querySelectorAll(selector) { return {'[data-recurrence]': rows, '[data-status-filter]': filters, '[data-sort]': sorts}[selector]; },
  getElementById(id) { return {'recurrent-search':search, 'recurrent-results':results}[id]; },
  querySelector(selector) { return {'.recurrent-table tbody':tbody, '.recurrent-empty':empty, '.header-actions .search':headerSearch}[selector]; }
};
scripts.forEach(source => vm.runInNewContext(source, {document:doc, window:{}}));
const visible = () => rows.filter(r => !r.hidden);
assert.equal(visible().length,4);
assert.equal(results.textContent,'Exibindo 4 de 4 recorrências');
search.value='INTERNET'; search.events.input(); assert.equal(visible().length,2);
search.value='próximo'; search.events.input(); assert.equal(visible().length,4);
search.value='inexistente'; search.events.input(); assert.equal(visible().length,0); assert.equal(empty.hidden,false);
search.value=''; filters.find(f => f.dataset.statusFilter === 'paused').events.click(); assert.equal(visible().length,0);
filters.find(f => f.dataset.statusFilter === 'active').events.click(); assert.equal(visible().length,4); assert.equal(empty.hidden,true);
sorts.find(s => s.dataset.sort === 'date').events.click(); assert.equal(tbody.children[0].dataset.date,'2026-09-28');
sorts.find(s => s.dataset.sort === 'highest').events.click(); assert.equal(tbody.children[0].dataset.amount,'1280');
sorts.find(s => s.dataset.sort === 'lowest').events.click(); assert.equal(tbody.children[0].dataset.amount,'250');
headerSearch.events.click(); assert.equal(search.focused,true);
console.log('JavaScript: sintaxe valida; busca, status, estado vazio, tres ordenacoes e foco verificados em DOM simulado.');
