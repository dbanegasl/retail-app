# GitHub Actions — Cómo se construye el pipeline

**Curso:** Fundamentos de DevOps potenciado con IA — CEDIA TMO  
**Archivo:** `.github/workflows/ci.yaml`

---

## ¿Qué es un Workflow?

Un workflow es una **automatización definida en YAML** que GitHub ejecuta en servidores propios (llamados *runners*) cada vez que ocurre un evento en el repositorio. Sin costo para repositorios públicos.

### Analogía del Chef

| Concepto YAML | Analogía |
|---|---|
| El archivo `.yml` | La receta escrita |
| El `job` | El plato a preparar |
| Los `steps` | Pasos de la receta |
| El `runner` (`ubuntu-latest`) | La cocina aislada en la nube |

---

## Estructura del archivo

```
.github/
└── workflows/
    └── ci.yaml   ← GitHub lee SOLO esta carpeta
```

> ⚠️ La carpeta debe llamarse `.github` (con punto). Si la llamas `github` o `,github` GitHub Actions no la detecta.

---

## Bloque `name`

```yaml
name: Pipeline de Calidad — Retail App
```

Nombre que aparece en la pestaña **Actions** de GitHub. Es solo visual, no afecta el comportamiento.

---

## Bloque `on` — Cuándo corre el pipeline

```yaml
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
```

Define los **eventos disparadores**:

| Evento | Cuándo se activa |
|---|---|
| `push` | Cada vez que alguien hace `git push` a `main` |
| `pull_request` | Al abrir o actualizar un PR hacia `main` |

Puedes agregar más eventos: `schedule` (cron), `workflow_dispatch` (manual), `release`, etc.

---

## Bloque `jobs` — Las tareas

Cada job corre en una **máquina virtual nueva y limpia**. Si un job falla, los siguientes no se ejecutan (salvo que uses `if: always()`).

### `runs-on`

```yaml
runs-on: ubuntu-latest
```

El sistema operativo del runner. Opciones: `ubuntu-latest`, `windows-latest`, `macos-latest`. Ubuntu es el más rápido y económico.

### `needs` — Cadena de dependencia

```yaml
security-check:
  needs: build-and-test
```

`security-check` solo corre si `build-and-test` termina **exitosamente**. Esto crea un flujo en cadena entre jobs.

---

## Bloque `steps` — Los pasos

Cada step puede ser de dos tipos:

### Tipo 1: Action de Marketplace (`uses`)

```yaml
- name: 📥 Clonar el repositorio
  uses: actions/checkout@v4
```

Reutiliza código de terceros publicado en [github.com/marketplace](https://github.com/marketplace?type=actions). `@v4` fija la versión para evitar cambios inesperados.

Actions usadas en este pipeline:

| Action | Qué hace |
|---|---|
| `actions/checkout@v4` | Descarga el código del repo en el runner |
| `actions/setup-node@v4` | Instala Node.js en el runner |

### Tipo 2: Comando shell (`run`)

```yaml
- name: 🧪 Ejecutar pruebas unitarias
  run: npm test
```

Ejecuta cualquier comando disponible en el sistema operativo del runner. Para múltiples líneas usa `|`:

```yaml
run: |
  echo "línea 1"
  echo "línea 2"
```

---

## Cache de dependencias

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

`cache: 'npm'` le dice a GitHub que guarde la carpeta `node_modules` entre ejecuciones. La primera vez tarda ~20s instalar. Las siguientes: ~2s. Ahorra tiempo y uso de red.

---

## Secrets — Variables cifradas

Los secrets son valores sensibles (API keys, tokens, passwords) que GitHub almacena cifrados. **Nunca aparecen en texto plano en los logs** — se reemplazan automáticamente por `***`.

### Cómo crear un secret

1. Repositorio en GitHub → **Settings**
2. Menú izquierdo: **Secrets and variables → Actions**
3. **New repository secret**
4. Nombre: `API_KEY_RETAIL` | Valor: el que elijas

### Cómo usarlo en el YAML

```yaml
- name: 🔐 Probar Secret
  env:
    API_KEY: ${{ secrets.API_KEY_RETAIL }}   # ← inyecta el secret
  run: |
    echo "El valor es: $API_KEY"
    # En los logs verás: El valor es: ***
```

> ✅ **Buena práctica:** mapear el secret a una variable de entorno (`env:`) en lugar de usar `${{ secrets.X }}` directamente dentro de `run:`. Esto previene inyección de comandos si el valor contiene caracteres especiales.

---

## Flujo completo del pipeline

```
git push origin main
        │
        ▼
┌─────────────────────┐
│   build-and-test    │
│                     │
│  1. checkout        │
│  2. setup Node.js   │
│  3. npm install     │
│  4. análisis calidad│
│  5. npm test        │
│  6. verificar HTML  │
└────────┬────────────┘
         │ (solo si pasa ✅)
         ▼
┌─────────────────────┐
│   security-check    │
│                     │
│  1. checkout        │
│  2. probar secret   │
└─────────────────────┘
```

---

## Referencia rápida de sintaxis

```yaml
name: Nombre del workflow

on:                          # eventos
  push:
    branches: [ "main" ]

jobs:
  nombre-del-job:
    runs-on: ubuntu-latest
    needs: otro-job          # dependencia opcional
    steps:
      - name: Descripción
        uses: action/name@v4 # action de marketplace
        with:                # parámetros de la action
          param: valor

      - name: Descripción
        env:                 # variables de entorno del step
          CLAVE: ${{ secrets.NOMBRE }}
        run: |               # comandos shell
          echo "hola"
```

---

*Curso: Fundamentos de DevOps potenciado con IA · Jordan Murillo & Diego Quisi · CEDIA TMO 2026*
