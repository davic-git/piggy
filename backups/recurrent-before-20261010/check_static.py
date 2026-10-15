from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import re, json
from xml.etree import ElementTree
root=Path(r"E:\Meus sites\piggy")
page=root/"pages/Sidebar/Recurrent/recurrent.html"
class Check(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack=[]; self.ids=[]; self.refs=[]; self.assets=[]; self.links=[]; self.errors=[]; self.current=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if a.get('aria-labelledby'): self.refs.extend(a['aria-labelledby'].split())
        if tag in ('img','script','link'):
            p=a.get('src') if tag in ('img','script') else a.get('href')
            if p and not p.startswith(('https:','http:')): self.assets.append(p)
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if a.get('aria-current')=='page': self.current.append(a.get('href',tag))
        if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}: self.stack.append(tag)
    def handle_startendtag(self,tag,attrs): self.handle_starttag(tag,attrs)
    def handle_endtag(self,tag):
        if not self.stack or self.stack[-1]!=tag: self.errors.append((tag,self.stack[-3:]))
        else: self.stack.pop()
text=page.read_text(encoding='utf-8'); p=Check(); p.feed(text)
assert not p.stack and not p.errors,(p.stack,p.errors)
assert len(p.ids)==len(set(p.ids))
assert all(r in p.ids for r in p.refs)
for a in p.assets:
    f=(page.parent/a).resolve(); assert f.exists() and f.stat().st_size>0,str(f)
    if f.suffix=='.svg': ElementTree.parse(f)
for a in p.links:
    assert (a[1:] in p.ids) if a.startswith('#') else (page.parent/a).resolve().is_file(),a
assert '../Recurrent/recurrent.html' in p.current
for f in (root/'global.css',page.with_suffix('.css')):
    c=f.read_text(encoding='utf-8'); assert c.count('{')==c.count('}'); assert c.count('(')==c.count(')')
base=(root/'backups/recurrent-before-20261010/global.css').read_text(encoding='utf-8').rstrip()
expected=base.replace(':is(.page--dashboard, .page--piggy, .page--goals)',':is(.page--dashboard, .page--piggy, .page--goals, .page--recurrent)').replace('.ui-card--borderless { border: 0; }','.ui-card--borderless { border: 0; }\n.ui-card--transparent { background: transparent; }')
assert (root/'global.css').read_text(encoding='utf-8').rstrip()==expected,'Mudanca global inesperada'
assert 'figma.com/api' not in text
print(json.dumps({'html':'estrutura e IDs validos','links':'caminhos existentes','assets':dict(Counter(p.assets)),'css':'delimitadores balanceados','global':'somente inclusao do escopo e variante transparente'},ensure_ascii=False))
