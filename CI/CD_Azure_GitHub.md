# Integración y entrega continua (CI/CD) con GitHub y Azure

    > Es una de las prácticas fundamentales de DevOps para auntomatizar el pricesamiento y lanzamiento de software

    > **Integración continua (CI):**
    
        - La práctica de integrar frecuentemente los cambios de código de varios desarrolladores en un   repositorio compartido.
        - Cada integración activa compilaciones y pruebas autometizadas para detectar rápidamente los errores de integración.

    -> **Entrega continua (CD):**

        - Amplía la integración continua (CI) meidante el despliegue automático de los cambios de código en un entorno de preproducción o producción tras una prueba exitosa.


# Configuración del entorno de desarrollo

    > Cuenta de Azure
    > Cuenta de GitHub
    > Interfaz de línea de comenados de Azure (Azure CLI) - https://learn.microsoft.com/en-us/cli/azure/install/
    > Node.js y npm
    > CLI de bíceps - https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/install
    

# Nivel principiante: Integración continua básica con GitHub Actions

> Creación de un flujo de trabajo sencillo:

    - En tu repositorio de GitHub, crea un directorio llamado .github/workflows.
    - Dentro del directorio workflows, cree un archivo YAML (por ejemplo, ci.yml).
    - Agregue el siguiente código al archivo ci.yml:
        _> nombre:  CI básico  en: push: ramas: [ "main" ] pull_request: ramas: [ "main" ] trabajos: build: se ejecuta en: ubuntu-latest pasos: - usa: actions/checkout@v3 - nombre: Configurar Node.js usa: actions/setup-node@v3 con: node-version: '18.x' # O la versión de Node.js que desee - nombre: Instalar dependencias ejecutar: npm install - nombre: Ejecutar pruebas ejecutar: npm test


# Explicación:

> nombre: El nombre del flujo de trabajo.
> on: Especifica los eventos que activan el flujo de trabajo (envío a la rama principal y solicitudes de extracción contra la rama principal).
> trabajos: Define las tareas que se van a ejecutar. En este caso, tenemos un único trabajo de compilación.
> runs-on: Especifica el entorno de máquina virtual en el que se ejecutará la tarea (Ubuntu en este caso).
> pasos: Una secuencia de tareas que deben realizarse.
> acciones/checkout@v3: Extrae el código del repositorio.
> acciones/setup-node@v3: Configura Node.js.
> npm install: Instala las dependencias del proyecto.
> npm test: Ejecuta las pruebas (siempre que tengas las pruebas definidas en tu package.json).


# Creación y prueba de su código:


