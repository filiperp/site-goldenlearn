#!/usr/bin/env python3
"""Gera os logos de clientes do site a partir de design-source/clients/.

Entrada:  design-source/clients/clients.csv  (key,name,source)  — ordem = ordem na faixa
          design-source/clients/<source>     (SVG, PNG ou WEBP coloridos)
Saída:    public/img/clients/<key>.svg|.webp  (SVG copiado; bitmaps aparados e em WebP)
          src/data/clients.json               ([{key, name, file, w, h}])

Os tamanhos (w, h) equilibram o peso visual: logos largos ficam mais baixos e logos
quadrados mais altos, com área aproximadamente constante.

Uso:  python3 scripts/build-client-logos.py
"""
import csv, json, math, os, re, shutil
from PIL import Image, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'design-source', 'clients')
OUT = os.path.join(ROOT, 'public', 'img', 'clients')
DATA = os.path.join(ROOT, 'src', 'data', 'clients.json')

TARGET_AREA = 52 * 125   # área visual alvo em px CSS
MIN_H, MAX_H = 26, 58
MAX_W = 170


def svg_ratio(path):
    s = open(path, encoding='utf-8', errors='ignore').read()
    m = re.search(r'viewBox\s*=\s*"([\d.\-eE]+)[ ,]+([\d.\-eE]+)[ ,]+([\d.\-eE]+)[ ,]+([\d.\-eE]+)"', s)
    if m:
        return float(m.group(3)) / float(m.group(4))
    w = re.search(r'\bwidth\s*=\s*"([\d.]+)', s)
    h = re.search(r'\bheight\s*=\s*"([\d.]+)', s)
    if w and h:
        return float(w.group(1)) / float(h.group(1))
    raise ValueError(f'não foi possível ler as proporções de {path}')


def trim_bitmap(path):
    im = Image.open(path).convert('RGBA')
    alpha = im.getchannel('A')
    if alpha.getextrema()[0] < 250:          # já tem transparência: apara pelo alfa
        bbox = alpha.point(lambda a: 255 if a > 8 else 0).getbbox()
    else:                                     # fundo branco: apara pelo branco
        bg = Image.new('RGB', im.size, (255, 255, 255))
        bbox = ImageChops.difference(im.convert('RGB'), bg).convert('L').point(lambda p: 255 if p > 18 else 0).getbbox()
    return im.crop(bbox) if bbox else im


def size_for(ratio):
    h = math.sqrt(TARGET_AREA / ratio)
    h = max(MIN_H, min(MAX_H, h))
    w = h * ratio
    if w > MAX_W:
        w, h = MAX_W, MAX_W / ratio
    return round(w), round(h)


def main():
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        os.remove(os.path.join(OUT, f))
    items = []
    with open(os.path.join(SRC, 'clients.csv'), encoding='utf-8') as fh:
        for row in csv.DictReader(fh):
            key, name, source = row['key'].strip(), row['name'].strip(), row['source'].strip()
            src = os.path.join(SRC, source)
            if source.lower().endswith('.svg'):
                ratio = svg_ratio(src)
                file = f'{key}.svg'
                shutil.copyfile(src, os.path.join(OUT, file))
            else:
                im = trim_bitmap(src)
                ratio = im.width / im.height
                w, h = size_for(ratio)
                # 3x a altura exibida para telas de alta densidade
                target_h = min(im.height, h * 3)
                im = im.resize((round(target_h * ratio), target_h), Image.LANCZOS)
                file = f'{key}.webp'
                im.save(os.path.join(OUT, file), 'WEBP', quality=82, method=6)
            w, h = size_for(ratio)
            items.append({'key': key, 'name': name, 'file': file, 'w': w, 'h': h})
            print(f'{key:20} {name:32} {file:24} {w}x{h}')
    with open(DATA, 'w', encoding='utf-8') as fh:
        json.dump(items, fh, ensure_ascii=False, indent=2)
        fh.write('\n')
    print(f'{len(items)} logos → {os.path.relpath(OUT, ROOT)} e {os.path.relpath(DATA, ROOT)}')


if __name__ == '__main__':
    main()
