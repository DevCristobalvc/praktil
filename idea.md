# Praktil — Idea & Requerimientos

## Concepto
**"Tu lo imaginas, nosotros lo creamos."**

Praktil es un laboratorio tecnológico de alto nivel. No una agencia, no una empresa de software convencional — un laboratorio donde se materializa cualquier idea técnica: desde impresión 3D hasta contratos inteligentes en blockchain.

El sitio web es la carta de presentación ante clientes de alto perfil: gobiernos, corporaciones, empresas multinacionales. Debe transmitir seriedad, capacidad técnica y diferenciación desde el primer scroll.

---

## Identidad Visual

- **Paleta:** Blanco y negro como base. Sin colores de distracción.
- **Modo por defecto:** Light (blanco/negro)
- **Modo oscuro:** Disponible, toggle visible
- **Logo:** `/logo.png` (ya existe en el repo)
- **Tipografía:** Sans-serif moderna, geométrica — sugerencia: Inter, Space Grotesk o Neue Haas Grotesk
- **Estética:** Minimalista pero con carácter. No genérico. No plantilla.

---

## Experiencia de Usuario

- **Scroll infinito / full-page scroll** — secciones que ocupan el viewport completo
- **Animaciones al entrar en viewport** — elementos que aparecen con propósito, no decorativos
- **Interactividad** — cursores personalizados, hover states con personalidad, microinteracciones
- **Referencia de inspiración:** [Mango Biche](https://somosmangobiche.com/) — ese nivel de cuidado y originalidad
- **No-plantilla:** nada de Bootstrap genérico, nada de hero + cards + footer plano

---

## Estructura de Secciones

### 1. Hero
- Frase principal: **"Tu lo imaginas, nosotros lo creamos."**
- Subtítulo: posicionamiento de Praktil (laboratorio, no agencia)
- Animación de entrada impactante
- CTA sutil hacia abajo

### 2. Sobre Praktil
- Qué es el laboratorio
- Filosofía: cualquier idea técnica tiene solución
- Tono: serio, directo, sin relleno

### 3. Capacidades / Servicios
Organizado por áreas técnicas:
- Desarrollo Web (Web2 & Web3 / Blockchain)
- DevOps & Cloud (on-premise y cloud)
- Redes & Infraestructura
- IoT & Hardware
- Impresión 3D & Fabricación
- Sistemas de Seguridad (CCTV, cámaras, antenas)

### 4. Proyectos / Portfolio
- Sección para mostrar trabajo real (por ahora placeholder elegante)
- Filtros por área técnica

### 5. Equipo
- **Cristóbal Valencia Cerón**
  - LinkedIn: https://co.linkedin.com/in/cristobalvalenciaceron
  - Rol: [completar]
  - Bio: [completar]

- **Juan Sebastián Duque**
  - LinkedIn: https://www.linkedin.com/in/juan-sebasti%C3%A1n-duque-5a7075195/
  - Rol: [completar]
  - Bio: [completar]

### 6. Contacto
- Formulario minimalista
- Email directo
- Sin redes sociales genéricas

---

## Multi-idioma

Tres idiomas soportados desde el inicio:
- 🇨🇴 Español (por defecto)
- 🇺🇸 English
- 🇧🇷 Português (Brasil)

Implementar con i18n. Todas las secciones y textos deben estar externalizados en archivos de traducción.

---

## Stack Técnico (propuesta)

- **Framework:** Next.js 14+ (App Router)
- **Animaciones:** Framer Motion
- **Estilos:** Tailwind CSS
- **i18n:** next-intl
- **Modo oscuro:** next-themes
- **Deploy:** Vercel

---

## Reglas de diseño (NO negociables)

1. Nada de plantillas visuales genéricas
2. Cada sección debe poder vivir sola — composición, tipografía, espacio
3. Las animaciones tienen propósito — no decoración
4. Mobile-first pero desktop es la experiencia principal
5. Rendimiento: LCP < 2.5s, sin bloqueos de render
6. Sin colores que no sean blanco, negro y sus grises
7. El logo siempre presente pero nunca dominante

---

## Estado

- [x] Repo creado: https://github.com/DevCristobalvc/praktil
- [x] Logo subido
- [ ] Setup Next.js + Tailwind + Framer Motion
- [ ] Implementar i18n (ES / EN / PT-BR)
- [ ] Diseñar y desarrollar todas las secciones
- [ ] Completar info del equipo
- [ ] Deploy en Vercel

---

*Praktil — Laboratorio Tecnológico*
