# Guía del Vástago

Esta aplicación web ofrece un visor de Disciplinas para *Vampiro: La Mascarada 5ª Edición*. Abre `index.html` en tu navegador para consultar los poderes y filtrar por clan o nombre.

## Pruebas

Instala las dependencias y ejecuta las pruebas con:

```bash
npm install
npm test
```

## Servidor estático

Inicia un servidor local con:

```bash
npm start
```

`index.html` está en la raíz del proyecto, por lo que al abrir `http://localhost:<puerto>` podrás ver la aplicación.

## Cheat Sheet en Español

El directorio `public/` contiene `vtm-v5-espanol.tex`, una versión en LaTeX de una hoja de referencia. Para consultarla desde la web se incluye el archivo `vtm-v5-espanol.html` generado con Pandoc:

```bash
pandoc public/vtm-v5-espanol.tex -s -o public/vtm-v5-espanol.html
```

Navega hasta la opción **Cheat Sheet** en el menú para abrirla en una pestaña nueva.

