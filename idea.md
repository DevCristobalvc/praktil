# Praktil — Documento de Idea, Diseño y Requerimientos

## Concepto Central
**"Tu lo imaginas, nosotros lo creamos."**

Praktil no es una agencia. Es un laboratorio tecnológico de alto perfil donde cualquier idea técnica se materializa. El sitio debe sentirse como entrar a un laboratorio de élite: frío, preciso, con carácter. El primer impacto debe hacer que el visitante pare de scrollear.

Audiencia objetivo: gobiernos, corporaciones, fondos de inversión, startups con capital.

---

## Experiencia de Entrada — Hero Funnel

Lo primero que ve el usuario ocupa el 100% del viewport. No hay navbar agresivo, no hay menú. Solo:

```
          [LOGO]

   "Tu lo imaginas, nosotros lo creamos."
          
         [animación sutil / partículas / glitch]

   [+57 300 541 2940]        [+57 315 812 5673]
   wa.me/573005412940        wa.me/573158125673
```

- Los dos números son botones de WhatsApp (`https://wa.me/573005412940`)
- Posicionados simétricamente: izquierda y derecha
- Al hover: efecto de activación — borde que se ilumina, vibración sutil
- Texto flotante: "Escríbenos ahora" en los 3 idiomas rotando
- El logo entra con animación (fade + scale desde 0.8 a 1)
- La frase aparece letra por letra o palabra por palabra

---

## Identidad Visual

| Elemento | Valor |
|---|---|
| Paleta base | `#000000` y `#FFFFFF` |
| Grises | `#111`, `#222`, `#888`, `#CCC`, `#F5F5F5` |
| Modo por defecto | Light (blanco con texto negro) |
| Modo oscuro | Toggle disponible, invertido completo |
| Tipografía | Space Grotesk (títulos) + Inter (cuerpo) |
| Logo | `/logo.png` — ya en repo |
| Bordes | `1px solid` con bajo contraste, muy finos |
| Espaciado | Generoso. El vacío es parte del diseño. |

**Regla de oro:** Si algo se puede quitar y la página sigue comunicando, se quita.

---

## Estructura de Secciones

### 0. Hero Funnel *(primer viewport)*
- Logo + frase + animación
- Dos botones WhatsApp (izq / der)
- Sin navbar visible al inicio — aparece al scroll hacia arriba

### 1. Qué es Praktil
- Párrafo corto, contundente
- Números o stats si aplican (proyectos, tecnologías, años)
- Fondo alternado (negro sobre blanco o viceversa)

### 2. Capacidades
Grid modular por área. Cada card entra al hacer scroll:
- 🌐 Web2 & Web3 / Blockchain
- ☁️ Cloud & DevOps (on-premise y cloud)
- 🔌 Redes & Infraestructura
- 🔧 IoT & Hardware
- 🖨️ Impresión 3D & Fabricación
- 📡 Antenas & Telecomunicaciones
- 📷 Seguridad (CCTV, cámaras IP)
- 🤖 AI Engineering

### 3. Portfolio / Proyectos
- Placeholder elegante por ahora
- Filtros por categoría técnica
- Cards con hover reveal (descripción aparece al pasar el mouse)

### 4. Equipo

**Cristóbal Valencia Cerón**
- Rol: Entrepreneur | Full-Stack AI Engineer
- LinkedIn: https://co.linkedin.com/in/cristobalvalenciaceron
- Background: AI Software Engineer en Rappi, Blockchain Engineer en AsymmetricFrequency, DevRel en Ethereum Cali, Presidente IEEE Computer Society USC, Developer en CAF, SENA, USC.
- Expertise: AI, Blockchain/Web3 (Ethereum, Solidity), Full-Stack (Next.js, NestJS, Laravel), DevOps, Microsoft Power Platform.

**Juan Sebastián Duque**
- Rol: Chief Digital Solutions Architect
- LinkedIn: https://www.linkedin.com/in/juan-sebasti%C3%A1n-duque-5a7075195/
- Background: [completar cuando Juan comparta más info]
- Expertise: Arquitectura de soluciones digitales

*Diseño de la sección:* Dos columnas, foto en blanco y negro, nombre grande, rol en gris, hover que revela links y stack técnico.

### 5. Contacto
- Formulario minimalista: nombre, empresa, mensaje
- Los dos números WhatsApp de nuevo
- Sin redes sociales genéricas

---

## Multi-idioma

| Idioma | Código | Default |
|---|---|---|
| Español | `es` | ✅ Sí |
| English | `en` | No |
| Português (Brasil) | `pt-BR` | No |

- Todos los textos en archivos de traducción (`/messages/es.json`, etc.)
- Selector de idioma discreto en navbar
- URL paths: `/`, `/en`, `/pt-BR`

---

## Animaciones y Microinteracciones

| Elemento | Animación |
|---|---|
| Logo en hero | Fade + scale entrance |
| Frase hero | Texto aparece letra por letra o por palabra |
| Botones WhatsApp | Borde iluminado + pulso en hover |
| Secciones al scroll | Fade in desde abajo (stagger entre elementos) |
| Cards de capacidades | Entrada escalonada, hover con elevación sutil |
| Cursor | Custom cursor (círculo que sigue el mouse) |
| Navbar | Aparece solo al hacer scroll up, desaparece al bajar |
| Dark mode toggle | Transición suave, no flash |

**Referencia de nivel:** https://somosmangobiche.com/ — ese nivel de intención y cuidado en cada píxel.

---

## Arquitectura de Código — Atomic Design

```
/src
  /components
    /atoms          # Button, Text, Icon, Logo, Badge
    /molecules      # WhatsAppCTA, CapabilityCard, TeamCard, NavItem
    /organisms      # HeroFunnel, CapabilitiesGrid, TeamSection, ContactForm
    /templates      # PageLayout, SectionWrapper
  /sections         # HeroSection, AboutSection, CapabilitiesSection, etc.
  /messages         # es.json, en.json, pt-BR.json
  /hooks            # useTheme, useScrollDirection, useInView
  /lib              # utils, constants, waLinks
  /styles           # globals, tokens
  /app              # Next.js App Router
    /[locale]
      page.tsx
      layout.tsx
```

**Reglas de código:**
- Un componente = un archivo
- Props tipadas con TypeScript
- Sin lógica de negocio en los componentes de UI
- Sin estilos inline — solo Tailwind classes
- Animaciones con Framer Motion, no CSS puro para las complejas

---

## Stack Técnico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| i18n | next-intl |
| Dark mode | next-themes |
| Formulario | React Hook Form |
| Deploy | Vercel |
| Lenguaje | TypeScript |

---

## WhatsApp Links

```
wa.me/573005412940  → Número izquierdo
wa.me/573158125673  → Número derecho
```

Mensaje predefinido sugerido: `"Hola, me interesa conocer más sobre Praktil."`

```
https://wa.me/573005412940?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Praktil.
```

---

## Performance

- LCP < 2.5s
- Imágenes en WebP / AVIF
- Logo optimizado con `next/image`
- Fuentes con `next/font`
- Sin bloqueos de render

---

## Reglas No Negociables

1. Nada de plantillas visuales genéricas
2. El vacío es parte del diseño — no rellenar por rellenar
3. Mobile-first, pero desktop es la experiencia principal
4. Animaciones con propósito, no decorativas
5. Solo blanco, negro y grises
6. Atomic design estricto — cada componente es reutilizable
7. Todos los textos en archivos de traducción desde el día 0
8. Código limpio, modular, sin magia

---

## Checklist de Estado

- [x] Repo creado: https://github.com/DevCristobalvc/praktil
- [x] Logo en repo (`logo.png`)
- [x] Documento de idea completo
- [ ] Setup Next.js 15 + Tailwind + Framer Motion + TypeScript
- [ ] Configurar next-intl (ES / EN / PT-BR)
- [ ] Atomic design system base (atoms y molecules)
- [ ] Hero Funnel con botones WhatsApp
- [ ] Resto de secciones
- [ ] Info completa Juan Sebastián
- [ ] Deploy en Vercel

---

*Praktil — Laboratorio Tecnológico | 2025*
