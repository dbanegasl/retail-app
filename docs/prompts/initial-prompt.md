# Prompt Inicial — Generación del sitio web del curso

**Fecha:** 9 de abril de 2026  
**Autor:** Daniel Banegas  
**Herramienta:** GitHub Copilot (Claude)

---

## Prompt utilizado

> MI pagina me parece que hemos desplegado en github pages, 
> https://dbanegasl.github.io/retail-app/
> sin embargo veo lo que al parecer es el MD
> Lo que me gustaria es generar una pagina index.html aqui en la raiz, que sea una pagina moderna con css bootstrap 5.3.8 y que sea como un hello world curioso con una interaccion o animacion javascript , que describa a mi como profesional de manera simple
> 
> Talvez un card de 3 columnas en donde a la izquierda este mi foto , al centro mi info simple sencill y a la derecha seria el titulo fuerte TMO CEDIA y un subtitulo con el nombre del curso y capacitadores .. luego los contenidos o pagina enlazables, justamente al public/home.html y pues luego iremos agregando mas paginas
> 
> Aqui como seria el card https://duotics.com/#equipo y mi foto https://duotics.com/resources/images/daniel-banegas.jpg
> 
> En docs tienes mas info, talvez el student y student2 md te sirvan como para crear las paginas en public, simples sencillas donde pueda acceder y ver el contenido algo muy clear bonito con bootstrap y animaciones javascript puede ser algo como la pagina de antigravity o del hero de grupoepisteme.com , algo genial..
> 
> Las paginas de public tendral el navbar y el regreso al index
> 
> Esto me servira para que mis docentes vean mi capacidad de entendimiento, uso de ia y aplicacion de las clases, incluso este prompt puedes cargarlo en un folder prompts dentro del folder docs

---

## Archivos generados

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Landing page principal con card de 3 columnas, partículas animadas y typewriter |
| `public/home.html` | App Data-Driven Retail modernizada con Bootstrap y animación de diagnóstico |
| `public/student.html` | Sesión 1 — Control de Versiones y QA (contenido de `docs/student.md`) |
| `public/student2.html` | Sesión 2 — CI/CD y GitHub Actions (contenido de `docs/student2.md`) |
| `docs/prompts/initial-prompt.md` | Este archivo — registro del prompt utilizado |

---

## Tecnologías aplicadas

- **Bootstrap 5.3.8** — Framework CSS responsive
- **Bootstrap Icons** — Iconografía
- **Highlight.js** — Syntax highlighting para bloques de código
- **JavaScript vanilla** — Partículas canvas, typewriter, scroll reveal, intersection observer
- **CSS custom properties** — Theming consistente con glassmorphism
