# Praktil — Brief Creativo

> Este documento es una guía de intención, no un pliego de condiciones.
> Fable tiene criterio propio — úsalo. Si algo aquí no te convence técnica o estéticamente, propón algo mejor.

---

## Quiénes somos

**Praktil** es un laboratorio tecnológico. No una agencia, no una consultora — un laboratorio.
Hacemos lo que sea que tenga que ver con tecnología: blockchain, IA, redes, DevOps, cloud, on-premise, impresión 3D, IoT, hardware, antenas, cámaras, web2, web3.

Nuestros clientes son grandes. Gobiernos, corporaciones, fondos. El sitio tiene que hablarles a ellos.

**Frase:** *"Tu lo imaginas, nosotros lo creamos."*

---

## La Experiencia que Queremos

Cuando alguien entra a la página debe parar. Debe mirar. No debe saber bien qué va a pasar cuando scrollee.

### Idea central de animación

Imagina que en el centro de la pantalla hay un **servidor, una Raspberry Pi, o algún componente de hardware real** — renderizado en 3D, ilustración técnica, o SVG animado. A medida que el usuario hace scroll, ese objeto se va **descomponiendo**: los componentes se separan, se mueven, se disuelven. Cada pieza que se desprende da lugar a uno de nuestros servicios.

El hardware se desmonta para mostrar lo que somos. Es literal y metafórico a la vez.

Al final del scroll, cuando el hardware ya está completamente desarmado en el espacio, aparece el equipo. Como si nosotros fuéramos las piezas que arman todo.

Esta es la idea — Fable decide si es un SVG, Three.js, Lottie, ilustración CSS, o algo completamente distinto. Lo que importa es la narrativa visual.

### Punto de entrada — Hero

Lo primero que se ve (100vh, sin scroll):
- El logo
- La frase
- Alguna animación sutil que anticipe lo que viene
- Dos botones de contacto WhatsApp — uno a la izquierda, otro a la derecha

```
wa.me/573005412940   →  número izquierdo
wa.me/573158125673   →  número derecho
```

El resto de la página empieza debajo de ese primer viewport.

---

## Restricciones Reales (no negociables)

- **Paleta:** Solo blanco, negro y grises. Sin color.
- **Modo oscuro disponible** (light es el default)
- **Multi-idioma:** Español (default), English, Português Brasil — desde el día 0, todo en archivos de traducción
- **Código modular:** Atomic design. Un componente = un archivo. Reutilizable.
- **Stack sugerido:** Next.js 15, Tailwind CSS, Framer Motion, TypeScript, next-intl — si Fable ve algo mejor para la animación del hardware, lo justifica y lo usa
- **Deploy:** Vercel

---

## Secciones (en orden, pero flexibles en forma)

1. **Hero** — logo, frase, dos WhatsApp CTA
2. **La animación del hardware** — scroll-driven, servicios emergiendo de las piezas
3. **Qué hacemos** — si la animación no alcanza a cubrir todo, aquí se expande
4. **Portfolio** — placeholder elegante por ahora
5. **Equipo** — los dos integrantes
6. **Contacto** — formulario minimalista + los WhatsApp de nuevo

---

## Equipo

**Cristóbal Valencia Cerón**
- Entrepreneur | Full-Stack AI Engineer
- AI Engineer en Rappi · Blockchain Engineer · DevRel Ethereum Cali · Presidente IEEE Computer Society USC · CAF · SENA
- Stack: Next.js, NestJS, Solidity, Ethereum, AI/ML, Power Platform, Laravel
- LinkedIn: https://co.linkedin.com/in/cristobalvalenciaceron

**Juan Sebastián Duque**
- Chief Digital Solutions Architect
- LinkedIn: https://www.linkedin.com/in/juan-sebasti%C3%A1n-duque-5a7075195/
- Info adicional pendiente de completar

---

## Lo que NO queremos

- Nada que se parezca a una plantilla
- Sin colores que no sean blanco/negro/gris
- Sin secciones relleno que no digan nada
- Sin animaciones decorativas — cada animación cuenta algo
- Sin hero genérico con imagen de fondo y texto encima

---

## Nivel de referencia

https://somosmangobiche.com/ — esa intención, ese cuidado, esa sensación de que alguien pensó cada pixel.

No copiar el estilo — igualar el nivel de atención.

---

## Estado del Repo

- Repo: https://github.com/DevCristobalvc/praktil
- Rama: `main`
- Archivos actuales: `logo.png`, `idea.md`
- Siguiente paso: inicializar el proyecto

---

*Praktil — Laboratorio Tecnológico*
