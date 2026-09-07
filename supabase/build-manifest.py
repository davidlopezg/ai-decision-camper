#!/usr/bin/env python3
"""
Genera web/knowledge/productos/manifest.json a partir de los .md locales.

Extrae de cada .md:
  - id: nombre del archivo sin extensión
  - nombre: primera línea '# Título — subtítulo' → solo el título
  - categoria: inferida del id por palabras clave

El manifest se usa como fallback cuando la tabla `productos` de Supabase
está vacía. Mantiene el sistema funcionando aunque no se haya ejecutado
el SQL del día 3 todavía.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC_DIR = ROOT / "knowledge" / "productos"
OUT = ROOT / "web" / "knowledge" / "productos" / "manifest.json"

# Mapeo id → categoria (orden importa: la primera que coincide gana,
# por eso las más específicas van primero — p.ej. smartsolar va a
# monitorización, no a placas, aunque las dos contendrian "solar").
CATEGORY_RULES = [
    # neverás (específico: cfx, engel, mobicool)
    (r"cfx|cfx3|engel|mobicool|mt45f|mcg15", "neveras"),
    # inversores (específico: phoenix, bestek)
    (r"phoenix|inversor|bestek|onda-pura|onda-modificada", "inversores"),
    # baterías (específico: lifepo4, dual-purpose)
    (r"lifepo4|dual-purpose|varta|agm", "baterias"),
    # monitorización / reguladores (ANTES de placas — smartsolar es MPPT, no placa)
    (r"bmv|smartsolar|regulador", "monitorizacion"),
    # placas solares (sin smartsolar para que caiga arriba)
    (r"bluesolar|ecoflow|panel-solar", "placas"),
    # confort (calentador ANTES de cocina — calentador-gas va en calefacción)
    (r"kaiflex|aislamiento|ventana|webasto|calefaccion|calentador", "confort"),
    # cocina
    (r"cocina|campingaz|cv-470", "cocina"),
    # iluminación
    (r"led|plafon|tira-led|iluminacion", "iluminacion"),
    # agua
    (r"agua|bidon|ducha|potable", "agua"),
    # instalación
    (r"cyrix|pasacables|sikaflex|estanco|instalacion", "instalacion"),
]


def infer_category(id_: str) -> str:
    id_lower = id_.lower()
    for pattern, cat in CATEGORY_RULES:
        if re.search(pattern, id_lower):
            return cat
    return "otros"


def extract_name(md_path: Path) -> str:
    """Lee el primer H1 del .md y devuelve solo el título (sin subtítulo tras '—')."""
    text = md_path.read_text(encoding="utf-8")
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("# "):
            title = line[2:].strip()
            # Cortar en '—' o ' - ' (separador típico de subtítulo)
            for sep in [" — ", " – ", " - "]:
                if sep in title:
                    title = title.split(sep)[0].strip()
                    break
            return title
    return md_path.stem  # fallback al id


def main():
    products = []
    for md_path in sorted(SRC_DIR.glob("*.md")):
        id_ = md_path.stem
        products.append({
            "id": id_,
            "nombre": extract_name(md_path),
            "categoria": infer_category(id_),
        })

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(products, indent=2, ensure_ascii=False) + "\n",
                   encoding="utf-8")
    print(f"✅ {len(products)} productos → {OUT.relative_to(ROOT)}")
    print()
    by_cat = {}
    for p in products:
        by_cat.setdefault(p["categoria"], []).append(p["id"])
    for cat, ids in sorted(by_cat.items()):
        print(f"  {cat:18s} ({len(ids)})")
        for i in ids:
            print(f"    · {i}")


if __name__ == "__main__":
    main()
