# Marvel Fandom Browser

Aplicacion web para explorar el universo Marvel: personajes, comics, creadores, eventos y series.

## Estado del Proyecto

> **Nota Importante:** Momentaneamente la API de Marvel no esta disponible. El portal de desarrolladores de Marvel ([developer.marvel.com](https://developer.marvel.com)) ha sido cerrado y ahora redirige al sitio principal de Marvel. Esto implica que:
>
> - La aplicacion no puede obtener datos en tiempo real
> - Las busquedas y la navegacion no funcionaran hasta que se implemente una solucion alternativa
> - No es posible registrar nuevas API keys
>
> **Posibles soluciones futuras:**
> - Implementar datos mock/estaticos para demostracion
> - Migrar a una API alternativa como [Superhero API](https://superheroapi.com/) o [Comic Vine API](https://comicvine.gamespot.com/api/)

## Tecnologias

- React 18
- Redux
- React Router 6
- MUI (Material-UI) v5
- Axios

## Scripts Disponibles

### `npm install`

Instala las dependencias del proyecto.

### `npm start`

Ejecuta la aplicacion en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

### `npm run build`

Construye la aplicacion para produccion en la carpeta `build`.

### `npm test`

Ejecuta los tests en modo interactivo.

### `npm run clean`

Elimina la carpeta `node_modules`.

### `npm run reinstall`

Elimina `node_modules` y reinstala todas las dependencias.

## Estructura del Proyecto

```
src/
├── api/           # Integracion con Marvel API
├── components/    # Componentes reutilizables
├── views/         # Vistas principales
├── store/         # Redux store y acciones
├── style-sheets/  # Archivos CSS
├── mixins/        # Funciones utilitarias
└── assets/        # Imagenes y recursos estaticos
```

## Funcionalidades

- Busqueda de personajes, comics, creadores, eventos y series
- Paginacion configurable
- Vista de detalle con items relacionados
- Diseno responsive
