# 31 · DÍA 3 — SQL SCRIPT (30 productos + 25 reglas)

> **Estado:** listo para copiar y pegar en Supabase SQL Editor.
> **Requiere:** haber ejecutado antes el SQL de setup de `26-integration-guide.md`.

---

## PASO 1 · Añadir tabla `reglas` (no incluida en setup inicial)

```sql
-- Tabla de reglas de decisión técnica
create table reglas (
  id text primary key,
  categoria text not null,
  nombre text not null,
  descripcion text not null,
  condicion text not null,           -- en pseudo-SQL para documentación
  severidad text not null,          -- HARD | SOFT
  mensaje_usuario text,             -- texto a mostrar si se incumple
  fuente text,
  fecha_creacion timestamptz default now()
);

alter table reglas enable row level security;
create policy "reglas read" on reglas for select using (true);
```

---

## PASO 2 · Insertar 30 productos en tabla `productos`

> ⚠️ Los precios son los recomendados por el fabricante / observados en Amazon ES a fecha de revisión. **Verificar antes de publicar.**
> ⚠️ Las URLs de Amazon son placeholders. **Reemplazar con las URLs reales con tu tag de afiliado.**

```sql
-- ============================================
-- NEVERAS (4)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, capacidad_litros, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('dometic-cfx3-55', 'Dometic CFX3 55 Nevera Compresor 55L', 'Dometic', 'CFX3 55', 'neveras', 700, 0.030, 'https://amazon.es/dp/B0CFX355', 'https://amazon.es/dp/B0CFX355?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 55, 20.4, '64x45x47', 'docs/knowledge/productos/dometic-cfx3-55.md', ARRAY['premium','compresor','app'], 'principiante', 'agent-research-2026-01'),

('dometic-cfx3-45', 'Dometic CFX3 45 Nevera Compresor 45L', 'Dometic', 'CFX3 45', 'neveras', 600, 0.030, 'https://amazon.es/dp/B0CFX345', 'https://amazon.es/dp/B0CFX345?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 45, 18.1, '58x38x47', 'docs/knowledge/productos/dometic-cfx3-45.md', ARRAY['premium','compresor'], 'principiante', 'agent-research-2026-01'),

('engel-mt45f-s', 'Engel MT45F-S Nevera Compresor 39L', 'Engel', 'MT45F-S', 'neveras', 850, 0.030, 'https://amazon.es/dp/B0ENGEL45', 'https://amazon.es/dp/B0ENGEL45?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 39, 21, '64x38x41', 'docs/knowledge/productos/engel-mt45f-s.md', ARRAY['premium','compresor','robusta'], 'intermedio', 'agent-research-2026-01'),

('mobicool-mcg15', 'Mobicool MCG15 Nevera Termoeléctrica 15L', 'Mobicool', 'MCG15', 'neveras', 170, 0.040, 'https://amazon.es/dp/B0MOBICOOL15', 'https://amazon.es/dp/B0MOBICOOL15?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['coche','moto','furgoneta'], 15, 4.3, '46x30x32', 'docs/knowledge/productos/mobicool-mcg15.md', ARRAY['basica','termoelectrica','ligera'], 'principiante', 'agent-research-2026-01');

-- ============================================
-- PLACAS SOLARES (3)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, potencia_w, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('victron-bluesolar-100w', 'Victron BlueSolar 100W Monocristalino', 'Victron Energy', 'SPM010501200', 'placas', 150, 0.030, 'https://amazon.es/dp/B0VICTRON100', 'https://amazon.es/dp/B0VICTRON100?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 100, 7.5, '120x54x3.5', 'docs/knowledge/productos/victron-bluesolar-100w.md', ARRAY['premium','monocristalino','5-anos-garantia'], 'principiante', 'agent-research-2026-01'),

('victron-bluesolar-175w', 'Victron BlueSolar 175W Monocristalino', 'Victron Energy', 'SPM010501700', 'placas', 250, 0.030, 'https://amazon.es/dp/B0VICTRON175', 'https://amazon.es/dp/B0VICTRON175?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 175, 12, '148x67x3.5', 'docs/knowledge/productos/victron-bluesolar-175w.md', ARRAY['premium','monocristalino','alta-potencia'], 'intermedio', 'agent-research-2026-01'),

('panel-solar-generico-100w-rigido', 'Panel Solar Rígido 100W Genérico', 'Genérica', '100W-rigid', 'placas', 85, 0.030, 'https://amazon.es/dp/B0PANELGEN100', 'https://amazon.es/dp/B0PANELGEN100?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 100, 7.5, '120x54x3', 'docs/knowledge/productos/panel-solar-generico-100w-rigido.md', ARRAY['basico','monocristalino','economico'], 'principiante', 'agent-research-2026-01');

-- ============================================
-- BATERÍAS (3)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, capacidad_ah, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('varta-dual-purpose-agm-95ah', 'Varta Dual Purpose AGM 95Ah', 'Varta', 'LFD90', 'baterias', 230, 0.020, 'https://amazon.es/dp/B0VARTA95', 'https://amazon.es/dp/B0VARTA95?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 95, 26, '35.3x17.5x19', 'docs/knowledge/productos/varta-dual-purpose-agm-95ah.md', ARRAY['agm','dual-purpose','estandar'], 'principiante', 'agent-research-2026-01'),

('varta-dual-purpose-agm-130ah', 'Varta Dual Purpose AGM 130Ah', 'Varta', 'LFD130', 'baterias', 380, 0.020, 'https://amazon.es/dp/B0VARTA130', 'https://amazon.es/dp/B0VARTA130?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 130, 32, '51x18.9x22.3', 'docs/knowledge/productos/varta-dual-purpose-agm-130ah.md', ARRAY['agm','dual-purpose','alta-capacidad'], 'intermedio', 'agent-research-2026-01'),

('lifepo4-100ah-generica', 'Batería LiFePO4 100Ah con BMS', 'Genérica', 'LFP-100AH', 'baterias', 380, 0.025, 'https://amazon.es/dp/B0LIFEPO4100', 'https://amazon.es/dp/B0LIFEPO4100?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 100, 13, '33x17x22', 'docs/knowledge/productos/lifepo4-100ah-generica.md', ARRAY['lifepo4','litio','moderna','ligera'], 'intermedio', 'agent-research-2026-01');

-- ============================================
-- INVERSORES (2)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('victron-phoenix-12-800', 'Victron Phoenix 12/800 Inversor Onda Pura', 'Victron Energy', 'PIN121800000', 'inversores', 380, 0.015, 'https://amazon.es/dp/B0VIC800', 'https://amazon.es/dp/B0VIC800?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 5.5, '32x21x11', 'docs/knowledge/productos/victron-phoenix-12-800.md', ARRAY['onda-pura','premium','5-anos-garantia'], 'intermedio', 'agent-research-2026-01'),

('bestek-1000w-onda-pura', 'Bestek Inversor 1000W Onda Pura', 'Bestek', 'MRI2011EU', 'inversores', 180, 0.020, 'https://amazon.es/dp/B0BESTEK1000', 'https://amazon.es/dp/B0BESTEK1000?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 2.5, '32x17x7', 'docs/knowledge/productos/bestek-1000w-onda-pura.md', ARRAY['onda-pura','economico','portatil'], 'principiante', 'agent-research-2026-01');

-- ============================================
-- REGULADORES (1)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('victron-smartsolar-75-15', 'Victron SmartSolar 75/15 MPPT', 'Victron Energy', 'SCC075015060R', 'reguladores', 130, 0.030, 'https://amazon.es/dp/B0VICMPPT75', 'https://amazon.es/dp/B0VICMPPT75?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 0.5, '10x11x4', 'docs/knowledge/productos/victron-smartsolar-75-15.md', ARRAY['mppt','premium','bluetooth','5-anos-garantia'], 'intermedio', 'agent-research-2026-01');

-- ============================================
-- ACCESORIOS ENERGÍA (2)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('victron-cyrix-ct', 'Victron Cyrix-ct 120A Relé Inteligente', 'Victron Energy', 'CYR012120000', 'accesorios-energia', 90, 0.030, 'https://amazon.es/dp/B0VICYCYRIX', 'https://amazon.es/dp/B0VICYCYRIX?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 0.2, '6x8x4', 'docs/knowledge/productos/victron-cyrix-ct.md', ARRAY['relé','inteligente','premium'], 'intermedio', 'agent-research-2026-01'),

('victron-bmv-712', 'Victron BMV-712 Monitor de Batería', 'Victron Energy', 'BAM030712000', 'accesorios-energia', 165, 0.030, 'https://amazon.es/dp/B0BMV712', 'https://amazon.es/dp/B0BMV712?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','coche'], 0.5, '12x7x3', 'docs/knowledge/productos/victron-bmv-712.md', ARRAY['monitor','bluetooth','premium','5-anos-garantia'], 'intermedio', 'agent-research-2026-01');

-- ============================================
-- ILUMINACIÓN (2)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('tira-led-12v-5m', 'Tira LED 12V 5m Blanco Cálido IP65', 'Genérica', 'LED-12V-5M-WW', 'iluminacion', 22, 0.060, 'https://amazon.es/dp/B0TIRA12V5M', 'https://amazon.es/dp/B0TIRA12V5M?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 0.3, '500x1x0.5', 'docs/knowledge/productos/tira-led-12v-5m.md', ARRAY['iluminacion','led','flexible'], 'principiante', 'agent-research-2026-01'),

('plafon-led-tactil-12v', 'Plafón LED Táctil 12V 600lm', 'Genérica', 'PLAFON-12V-600', 'iluminacion', 38, 0.060, 'https://amazon.es/dp/B0PLAFON12V', 'https://amazon.es/dp/B0PLAFON12V?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 0.2, '20x7x2', 'docs/knowledge/productos/plafon-led-tactil-12v.md', ARRAY['iluminacion','led','tactil'], 'principiante', 'agent-research-2026-01');

-- ============================================
-- COCINAS (2)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('campingaz-cv-470', 'Campingaz CV 470 Plus Cocina Portátil', 'Campingaz', 'CV470PLUS', 'cocinas', 130, 0.040, 'https://amazon.es/dp/B0CAM470', 'https://amazon.es/dp/B0CAM470?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','exterior'], 1.8, '37x27x13', 'docs/knowledge/productos/campingaz-cv-470.md', ARRAY['cocina','gas','cartucho','portatil'], 'principiante', 'agent-research-2026-01'),

('cocina-camper-plegable', 'Cocina Camper Plegable Cartucho', 'Genérica', 'CAMPER-FOLD', 'cocinas', 85, 0.035, 'https://amazon.es/dp/B0CAMFOLD', 'https://amazon.es/dp/B0CAMFOLD?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','exterior'], 1.4, '34x26x8', 'docs/knowledge/productos/cocina-camper-plegable.md', ARRAY['cocina','gas','plegable','economica'], 'principiante', 'agent-research-2026-01');

-- ============================================
-- CALEFACCIÓN (2)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('webasto-air-top-2000', 'Webasto Air Top 2000 Calefacción Diesel', 'Webasto', 'AIRTOP2000', 'calefaccion', 700, 0, 'https://www.webasto.com/es/products', '', 'cpl', true, ARRAY['furgoneta','autocaravana'], 5, '37x15x13', 'docs/knowledge/productos/webasto-air-top-2000.md', ARRAY['calefaccion','diesel','premium','instalacion-profesional'], 'avanzado', 'agent-research-2026-01'),

('calentador-gas-portatil', 'Calentador de Gas Portátil Camping', 'Genérica', 'HEAT-PORTABLE', 'calefaccion', 110, 0.035, 'https://amazon.es/dp/B0CALPORT', 'https://amazon.es/dp/B0CALPORT?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','exterior'], 2.5, '30x25x15', 'docs/knowledge/productos/calentador-gas-portatil.md', ARRAY['calefaccion','gas','exterior','economico'], 'principiante', 'agent-research-2026-01');

-- ============================================
-- AGUA (2)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, capacidad_litros, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('bidon-flexible-20l', 'Bidón Flexible 20L para Agua Potable', 'Genérica', 'BIDON-20L', 'agua', 22, 0.060, 'https://amazon.es/dp/B0BIDON20', 'https://amazon.es/dp/B0BIDON20?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 20, 0.4, '30x20x25', 'docs/knowledge/productos/bidon-flexible-20l.md', ARRAY['agua','plegable','portatil'], 'principiante', 'agent-research-2026-01'),

('ducha-portatil-12v', 'Ducha Portátil 12V con Bomba Sumergible', 'Genérica', 'SHOWER-12V', 'agua', 60, 0.060, 'https://amazon.es/dp/B0SHOWER12V', 'https://amazon.es/dp/B0SHOWER12V?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta','exterior'], 1, '30x15x10', 'docs/knowledge/productos/ducha-portatil-12v.md', ARRAY['agua','ducha','portatil','bomba'], 'principiante', 'agent-research-2026-01');

-- ============================================
-- INSTALACIÓN (2)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('sikaflex-252', 'Sikaflex 252 Sellador Poliuretano 300ml', 'Sika', 'SIKAFLEX-252-300', 'instalacion', 18, 0.050, 'https://amazon.es/dp/B0SIKA252', 'https://amazon.es/dp/B0SIKA252?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 0.4, '25x6x6', 'docs/knowledge/productos/sikaflex-252.md', ARRAY['sellador','estructural','instalacion'], 'intermedio', 'agent-research-2026-01'),

('pasacables-estanco-techo', 'Pasacables Estanco Techo (Pack 4)', 'Genérica', 'CABLEGLAND-4PK', 'instalacion', 20, 0.060, 'https://amazon.es/dp/B0CABLEGLAND', 'https://amazon.es/dp/B0CABLEGLAND?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 0.2, '10x5x5', 'docs/knowledge/productos/pasacables-estanco-techo.md', ARRAY['instalacion','estanco','cables'], 'intermedio', 'agent-research-2026-01');

-- ============================================
-- TIER 3 · ACCESORIOS AVANZADOS (5)
-- ============================================
insert into productos (id, nombre, marca, modelo, categoria, precio, comision_pct, url_producto, url_afiliada, programa, disponible, vehiculos_compatibles, peso_kg, dimensiones_cm, descripcion_md_path, tags, nivel_usuario, fuente) values
('aislamiento-kaiflex', 'Aislamiento Kaiflex 19mm Plancha 2m²', 'Kaiflex', 'KF19-2M2', 'aislamiento', 50, 0.030, 'https://www.leroymerlin.es/kaiflex', 'https://www.leroymerlin.es/kaiflex', 'awin', true, ARRAY['furgoneta'], 2, '200x100x2', 'docs/knowledge/productos/aislamiento-kaiflex.md', ARRAY['aislamiento','termico','acustico','estandar'], 'intermedio', 'agent-research-2026-01'),

('ventana-dometic-s4', 'Ventana Dometic S4 80x50 con Oscurecedor', 'Dometic', 'S4-80x50', 'ventanas', 350, 0, 'https://www.dometic.com/es-es', '', 'cpl', true, ARRAY['furgoneta'], 6, '80x50x5', 'docs/knowledge/productos/ventana-dometic-s4.md', ARRAY['ventana','practicable','premium','instalacion-profesional'], 'avanzado', 'agent-research-2026-01'),

('lifepo4-200ah-con-bms', 'Batería LiFePO4 200Ah con BMS Premium', 'Genérica', 'LFP-200AH-PRO', 'baterias', 700, 0.025, 'https://amazon.es/dp/B0LIFEPO4200', 'https://amazon.es/dp/B0LIFEPO4200?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 25, '52x24x22', 'docs/knowledge/productos/lifepo4-200ah-con-bms.md', ARRAY['lifepo4','premium','alta-capacidad'], 'avanzado', 'agent-research-2026-01'),

('ecoflow-220w-bifacial', 'EcoFlow 220W Panel Solar Bifacial Plegable', 'EcoFlow', 'EF-PANEL-220', 'placas', 380, 0.040, 'https://amazon.es/dp/B0ECOFLOW220', 'https://amazon.es/dp/B0ECOFLOW220?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 9.5, '82x183x2.5', 'docs/knowledge/productos/ecoflow-220w-bifacial.md', ARRAY['portable','bifacial','premium'], 'intermedio', 'agent-research-2026-01'),

('victron-phoenix-12-1200', 'Victron Phoenix 12/1200 Inversor Onda Pura', 'Victron Energy', 'PIN122120000', 'inversores', 580, 0.015, 'https://amazon.es/dp/B0VIC1200', 'https://amazon.es/dp/B0VIC1200?tag=TUTRACKINGID-21', 'amazon', true, ARRAY['furgoneta'], 7.4, '37x23x12', 'docs/knowledge/productos/victron-phoenix-12-1200.md', ARRAY['onda-pura','alta-potencia','premium','5-anos-garantia'], 'avanzado', 'agent-research-2026-01');
```

---

## PASO 3 · Insertar 25 reglas de decisión

```sql
insert into reglas (id, categoria, nombre, descripcion, condicion, severidad, mensaje_usuario, fuente) values
-- Compatibilidad nevera-batería
('R001', 'compatibilidad', 'Nevera compresor requiere batería ≥100Ah', 'Una nevera de compresor consume 0.5-1.5 Ah/h. Sin batería ≥100Ah, en 24h se agota una batería de 50Ah.', 'nevera.tipo = "compresor" AND bateria.capacidad_ah < 100', 'HARD', 'Tu nevera compresor necesita al menos una batería de 100Ah. Considera la Varta 95Ah + placa solar o la LiFePO4 100Ah.', 'agent-research-2026-01'),

('R002', 'compatibilidad', 'Nevera termoeléctrica no requiere batería grande', 'Una termoeléctrica consume más (3-4 Ah/h) pero se usa solo unas horas. Sirve batería pequeña.', 'nevera.tipo = "termoelectrica"', 'SOFT', 'Una termoeléctrica consume más por hora. Si la usas todo el día, considera batería ≥50Ah.', 'agent-research-2026-01'),

-- Compatibilidad placa-batería
('R003', 'compatibilidad', 'Placa solar sin batería es inútil', 'La placa necesita una batería donde almacenar lo que genera.', 'placa.existe = true AND bateria.existe = false', 'HARD', 'Necesitas una batería para almacenar la energía de la placa. ¿Quieres que te recomiende una?', 'agent-research-2026-01'),

('R004', 'compatibilidad', 'Placa ≥200W necesita regulador ≥20A', 'Más amperaje requiere regulador más grande para gestionar el flujo.', 'placa.potencia_w >= 200 AND regulador.amperaje_max < 20', 'HARD', 'Con tu placa de ≥200W necesitas un regulador MPPT de al menos 20A (Victron SmartSolar 100/20).', 'agent-research-2026-01'),

('R005', 'compatibilidad', 'Placa 100W funciona con regulador 15A', 'Suficiente amperaje para 100W (5-6A reales).', 'placa.potencia_w = 100 AND regulador.amperaje_max >= 15', 'SOFT', 'El Victron SmartSolar 75/15 (15A) cubre tu placa de 100W perfectamente.', 'agent-research-2026-01'),

-- Compatibilidad inversor-batería
('R006', 'compatibilidad', 'Inversor ≥1000W necesita batería ≥150Ah', 'Para alimentar 1000W se necesitan picos de ~100A en la batería.', 'inversor.potencia_w >= 1000 AND bateria.capacidad_ah < 150', 'HARD', 'Tu inversor de ≥1000W necesita una batería de al menos 150Ah. Considera la Varta 130Ah o 2× Varta 95Ah en paralelo.', 'agent-research-2026-01'),

('R007', 'compatibilidad', 'Inversor 800W con batería 100Ah es justo', 'Funciona pero con autonomía limitada.', 'inversor.potencia_w >= 800 AND bateria.capacidad_ah >= 100 AND bateria.capacidad_ah < 150', 'SOFT', 'Tu inversor de 800W con batería 100Ah funciona, pero con autonomía limitada. Para más holgura, considera 150Ah+.', 'agent-research-2026-01'),

-- Compatibilidad cocina-ventilación
('R008', 'seguridad', 'Cocina de gas requiere ventilación obligatoria', 'La combustión produce CO2 mortal en espacios cerrados.', 'cocina.tipo IN ("gas-cartucho","gas-bombona") AND uso = "interior"', 'HARD', '⚠️ La cocina de gas requiere ventilación obligatoria si se usa dentro de la furgo. Un detector de gas LPG (~30€) es altamente recomendable.', 'agent-research-2026-01'),

('R009', 'seguridad', 'Calefacción Webasto requiere instalación profesional', 'La salida de gases debe estar correctamente instalada o genera CO en el habitáculo.', 'calefaccion.modelo = "Webasto"', 'HARD', '⚠️ La Webasto debe ser instalada por taller autorizado. La salida de gases al exterior es crítica para la seguridad.', 'agent-research-2026-01'),

-- Presupuesto
('R010', 'presupuesto', 'Kit completo básico < 800€', 'Nevera termoeléctrica + iluminación + batería pequeña + cocina exterior.', 'presupuesto_max <= 800', 'SOFT', 'Con 800€ puedes hacer un kit básico: nevera termoeléctrica, iluminación LED, batería ≥50Ah y cocina exterior.', 'agent-research-2026-01'),

('R011', 'presupuesto', 'Kit medio 800-1.500€', 'Nevera compresor pequeña + placa + batería ≥100Ah + iluminación + cocina.', 'presupuesto_max > 800 AND presupuesto_max <= 1500', 'SOFT', 'Con 800-1.500€ consigues un kit camper serio: nevera compresor pequeña, placa solar 100W, batería 100Ah AGM, iluminación LED, cocina exterior.', 'agent-research-2026-01'),

('R012', 'presupuesto', 'Kit completo 1.500-3.000€', 'Nevera compresor grande + placa 175W + batería LiFePO4 + inversor + accesorios.', 'presupuesto_max > 1500 AND presupuesto_max <= 3000', 'SOFT', 'Con 1.500-3.000€ puedes aspirar al kit completo: nevera CFX3 55, placa 175W con MPPT, batería LiFePO4 100Ah, inversor 800W.', 'agent-research-2026-01'),

('R013', 'presupuesto', 'Kit premium >3.000€', 'Todo lo anterior + LiFePO4 200Ah + inversor 1200W + Webasto + ventana.', 'presupuesto_max > 3000', 'SOFT', 'Con más de 3.000€ tienes un kit premium de furgoneta camper con autonomía total.', 'agent-research-2026-01'),

-- Compatibilidad tamaño-vehículo
('R014', 'espacio', 'Furgoneta mediana admite kit medio', 'VW T5/T6, Renault Trafic, Citroën Jumpy, Ford Transit Custom.', 'vehiculo.tipo = "furgoneta_mediana"', 'SOFT', 'Tu furgoneta mediana admite el kit medio completo. Mide bien el espacio disponible para neveras grandes.', 'agent-research-2026-01'),

('R015', 'espacio', 'Coche grande admite nevera termoeléctrica', 'SUV, ranchera, monovolumen.', 'vehiculo.tipo = "coche_grande"', 'SOFT', 'En un coche grande, una nevera termoeléctrica (Mobicool MCG15) cabe en el maletero sin problemas. Para compresor, considera una CFX3 25-45L.', 'agent-research-2026-01'),

('R016', 'espacio', 'Coche pequeño solo termoeléctrica', 'Utilitario, compacto.', 'vehiculo.tipo = "coche_pequeno"', 'SOFT', 'En un coche pequeño, una nevera termoeléctrica pequeña cabe. Una compresor ocuparía demasiado.', 'agent-research-2026-01'),

-- Uso
('R017', 'uso', 'Uso diario requiere LiFePO4', 'Mayor vida útil, mejor para uso intensivo.', 'uso.frecuencia = "diario"', 'SOFT', 'Si vas a usar la camper a diario, te recomiendo batería LiFePO4 (vida útil 5-10 años) en lugar de AGM (2-3 años).', 'agent-research-2026-01'),

('R018', 'uso', 'Uso fin de semana con AGM es suficiente', 'Para uso esporádico, AGM es más económico.', 'uso.frecuencia = "fines_de_semana"', 'SOFT', 'Con uso de fines de semana, una AGM cumple perfectamente y es más barata que LiFePO4.', 'agent-research-2026-01'),

('R019', 'uso', 'Vacaciones largas requieren autonomía ≥3 días', 'Placa solar grande + batería grande.', 'uso.frecuencia = "vacaciones_largas"', 'SOFT', 'Para vacaciones largas necesitas autonomía: placa ≥175W + batería ≥130Ah + monitor BMV-712.', 'agent-research-2026-01'),

-- Compatibilidades específicas
('R020', 'compatibilidad', 'Placa rígida requiere techo plano', 'No funciona en techos muy curvados.', 'placa.tipo = "rigida" AND vehiculo.techo = "curvo"', 'HARD', 'Las placas rígidas necesitan techo plano. Para techos curvos, usa placas flexibles o paneles plegables.', 'agent-research-2026-01'),

('R021', 'compatibilidad', 'Relé Cyrix recomendado si carga desde alternador', 'Protege la batería principal de descargarse.', 'placa.existe = true AND rele_inteligente.existe = false AND bateria.tipo = "AGM"', 'SOFT', 'Te recomiendo un relé inteligente (Victron Cyrix) si vas a cargar desde el alternador. Protege la batería de arranque.', 'agent-research-2026-01'),

('R022', 'compatibilidad', 'Batería LiFePO4 necesita BMS低温 carga', 'Cargar bajo 0°C daña la célula.', 'bateria.tipo = "LiFePO4" AND clima.frio_extremo = true', 'HARD', '⚠️ Las baterías LiFePO4 no deben cargarse bajo 0°C. Verifica que el BMS tenga protección低温 o añade加热.', 'agent-research-2026-01'),

('R023', 'compatibilidad', 'Inversor siempre con onda pura para equipos sensibles', 'CPAP, portátiles, equipos médicos.', 'inversor.existe = true AND uso.equipos_sensibles = true', 'HARD', 'Para CPAP, portátiles sensibles o equipos médicos, necesitas inversor de ONDA PURA, no modificada.', 'agent-research-2026-01'),

('R024', 'compatibilidad', 'Sikaflex 252 obligatorio en instalación solar', 'Sella correctamente los pasacables y soportes.', 'placa.existe = true AND instalacion.sellado = false', 'SOFT', 'Para sellar los pasacables y los soportes de la placa solar en el techo, usa Sikaflex 252 (estándar de la industria).', 'agent-research-2026-01'),

('R025', 'cpl', 'Webasto requiere partner instalador', 'No instalar DIY, riesgo de CO.', 'calefaccion.modelo = "Webasto" AND instalacion = "diy"', 'HARD', '⚠️ La Webasto NO debe instalarla uno mismo. Necesitas un taller autorizado Webasto. ¿Quieres que te conecte con uno?', 'agent-research-2026-01');
```

---

## PASO 4 · Verificar

```sql
-- Debe devolver 30 filas
select count(*) from productos;

-- Debe devolver 25 filas
select count(*) from reglas;

-- Productos por categoría
select categoria, count(*) from productos group by categoria order by categoria;

-- Reglas por severidad
select severidad, count(*) from reglas group by severidad;

-- Productos con su .md path
select id, nombre, descripcion_md_path from productos limit 5;
```

---

## Lo que necesitas ajustar antes de ejecutar

> ⚠️ **MUY IMPORTANTE** — antes de pegar este SQL en tu Supabase:

1. **Reemplaza `TUTRACKINGID-21`** en TODAS las URLs de afiliado con tu Tracking ID real de Amazon Associates (te lo dan tras la aprobación).

2. **Verifica los precios** comparando con Amazon.es en el momento del lanzamiento. Si alguno ha cambiado, ajusta el campo `precio`.

3. **Las URLs de producto** (`amazon.es/dp/B0XXX`) son placeholders. Reemplázalas con las URLs reales de cada producto (las encontrarás buscando en Amazon el nombre exacto).

4. **El campo `url_afiliada` de Webasto y ventana Dometic** está vacío porque su modelo es CPL, no afiliación. Cuando tengas partners CPL, completa con sus URLs o emails de contacto.

5. **El campo `comision_pct` para Webasto y Dometic ventana** está en 0 porque no hay comisión de afiliación. Reemplázalo con el CPL cuando lo negocies (típicamente 50-100€ por lead).

---

## Tiempo estimado de ejecución

- Pegar SQL: 2 min.
- Reemplazar URLs y tracking ID: 30-60 min (búsquedas en Amazon).
- Verificar precios: 20-30 min.
- **Total: 1-1.5 horas** (una sola vez).

Si quieres, te puedo entregar este mismo script con las URLs reales ya rellenas una vez me digas tu Tracking ID de Amazon.
