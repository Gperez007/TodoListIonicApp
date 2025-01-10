# To-do list

## Descripción

Esta es una aplicación móvil construida con **Ionic** y **Angular**, que permite a los usuarios gestionar tareas y categorías de manera eficiente. La aplicación usa **Firebase Remote Config** para habilitar la numeración dinámica en una lista cuando se activa una opción en la interfaz.

## Requisitos

Para ejecutar la aplicación localmente, necesitas tener instalados los siguientes componentes:

- **Node.js**: [Descargar Node.js](https://nodejs.org)
- **Ionic CLI**: Instala Ionic a través de npm:
  ```bash
  npm install -g @ionic/cli
  ```

  ## Firebase

Asegúrate de tener configurada tu cuenta de Firebase con las credenciales adecuadas.

## Instrucciones para Ejecutar la Aplicación

### Paso 1: Clonar el Repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/kamilo9809/to-do.git
cd to-do
```

### Paso 2: Instalar las Dependencias

Instala las dependencias del proyecto:

```bash
npm install
```

### Paso 3: Ejecutar la Aplicación

Para iniciar la aplicación en modo desarrollo, usa el siguiente comando:

```bash
ionic serve
```

Esto abrirá la aplicación en tu navegador.

## Cambios Realizados

- Se implementó la integración con Firebase Remote Config para agregar numeración dinámica a la lista de tareas cuando se activa un botón.
- Se creó un servicio de Firebase que gestiona la configuración remota y actualiza la interfaz de usuario de acuerdo con las configuraciones recibidas.
- Se implementaron filtros y opciones de búsqueda avanzados para gestionar las tareas y categorías de forma más eficiente.


## Respuestas a las Preguntas

1. **¿Cuáles fueron los principales desafíos que enfrentaste al implementar las nuevas funcionalidades?**
   El principal desafío fue integrar correctamente Firebase Remote Config y asegurarse de que la configuración remota afectara adecuadamente la interfaz de usuario. Hubo algunos problemas de sincronización con la actualización de datos en tiempo real, especialmente al trabajar con la configuración de Firebase.

2. **¿Qué técnicas de optimización de rendimiento aplicaste y por qué?**
   - **Optimización de carga con Lazy Loading**: Para mejorar el rendimiento de la aplicación, implementamos la carga perezosa (lazy loading) en las rutas de las diferentes páginas, lo que asegura que solo se carguen los módulos necesarios en cada momento.
   - **Uso de ngOnChanges para evitar renderizados innecesarios**: Aplicamos la técnica de ngOnChanges para gestionar cambios en las propiedades de los componentes, lo que ayuda a evitar la renderización innecesaria y mejora el rendimiento.
   - **Minificación de código**: Usamos el comando `ionic build --prod` para asegurarnos de que el código se minifique antes de la producción, reduciendo el tamaño de la aplicación y mejorando su rendimiento en dispositivos móviles.

3. **¿Cómo aseguraste la calidad y mantenibilidad del código?**
   - **Modularización del código**: Dividimos la aplicación en varios módulos y componentes reutilizables para facilitar la mantenibilidad y la escalabilidad de la aplicación.
   - **Buenas prácticas en el manejo de estado**: Usamos servicios para gestionar el estado de la aplicación, lo que mejora la claridad y consistencia del flujo de datos.
   - **Pruebas unitarias**: Implementamos pruebas unitarias con Jasmine y Karma para verificar el comportamiento de los servicios y componentes.
   - **Documentación**: Documentamos cada componente y servicio, así como los flujos importantes dentro de la aplicación, para facilitar la comprensión del código por otros desarrolladores.



## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un Pull Request o abre un Issue para discutir nuevas características o correcciones.


### Detalles Importantes:

1. **Capturas de Pantalla**: Puedes agregar las capturas de pantalla donde se muestren las funcionalidades nuevas que has implementado.
2. **APK e IPA**: Si tienes los archivos APK e IPA, puedes subirlos a algún servicio de almacenamiento (como Google Drive, Dropbox, o cualquier otro) y colocar los enlaces de descarga en el README. Si no puedes hacer esto, simplemente deja instrucciones para cómo generarlos.
3. **Firebase Configuración**: Si se requiere una configuración adicional para Firebase, asegúrate de incluir detalles sobre cómo obtener las credenciales y cómo configurarlas en el archivo `environment.ts` de Angular.