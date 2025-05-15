# To-do list

## Descripción

Esta es una aplicación móvil construida con **Ionic** y **Angular**, que permite a los usuarios gestionar tareas y categorías de manera eficiente. La aplicación usa **Firebase** para la numeración dinámica en una lista de interfaz.

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
git clone https://github.com/Gperez007/TodoListIonicApp.git
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


## Respuestas a las Preguntas

1. **¿Cuáles fueron los principales desafíos que enfrentaste al implementar las nuevas funcionalidades?**
   Tuve que hacer downgrade en algunos paquetes porque Angular 19 no funcionaba bien con @ionic/angular, lo cual me tomó algo de tiempo.

   Firebase también me dio problemas, pero logré resolverlo con persistencia local.

   Al renderizar muchas tareas, usé trackBy en *ngFor porque noté que se re-renderizaba de más.

2. **¿Qué técnicas de optimización de rendimiento aplicaste y por qué?**
   - **Optimización de carga con Lazy Loading**:
    Para mejorar el rendimiento de la aplicación, implementamos la carga perezosa Lazy Loading en las rutas para que cada módulo se cargue solo cuando se necesite.

   Uso de ngOnChanges para evitar renderizados innecesarios en componentes que reciben inputs.

   Compilé con ionic build --prod para minificar el código antes de producción.

   - **Uso de ngOnChanges para evitar renderizados innecesarios**: Aplicamos la técnica de ngOnChanges para gestionar cambios en las propiedades de los componentes, lo que ayuda a evitar la renderización innecesaria y mejora el rendimiento.
   - **Minificación de código**: Usamos el comando `ionic build --prod` para asegurarnos de que el código se minifique antes de la producción, reduciendo el tamaño de la aplicación y mejorando su rendimiento en dispositivos móviles.

3. **¿Cómo aseguraste la calidad y mantenibilidad del código?**
   - **Modularización del código**: 
   
   Dividi la aplicación en varios módulos y componentes reutilizables para facilitar la Separé todo en módulos y componentes

   reutilizables.

   Hice pruebas unitarias con Jasmine y Karma para servicios clave.

3. **instrucciones compilar ejecutar la aplicación en dispositivos o emuladores de Android e iOS.**

📱 Compilar y ejecutar la aplicación en Android e iOS

  npm install -g @ionic/cli cordova

  📦 Instalar dependencias del proyecto

  npm install

  ▶️ Ejecutar en dispositivo Android (USB)
   
   adb devices

  ionic cordova run android --device

  🍎 Ejecutar en dispositivo o simulador iOS (solo macOS)

  ionic cordova build ios
  open platforms/ios/*.xcworkspace
  