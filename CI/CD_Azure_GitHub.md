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

        nombre:  CI básico  en: push: ramas: [ "main" ] pull_request: ramas: [ "main" ] trabajos: build: se ejecuta en: ubuntu-latest pasos: - usa: actions/checkout@v3 - nombre: Configurar Node.js usa: actions/setup-node@v3 con: node-version: '18.x' # O la versión de Node.js que desee - nombre: Instalar dependencias ejecutar: npm install - nombre: Ejecutar pruebas ejecutar: npm test


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

> Confirma y sube el archivo nombre.yml a tu repositorio de GitHub.
> GitHub Actions activará automáticamente el flujo de trabajo con cada solicitud de envío o extracción a la rama principal.
> Puedes ver el progreso y los resultados del flujo de trabajo en la pestaña "Acciones" de tu repositorio de GitHub.


# Ahora, agreguemos la entrega continua para implementar automáticamente su código en Azure App Service.

# Conectando GitHub con Azure:

> Cree un Azure App Service.
> En el portal de Azure, cree un nuevo Servicio de aplicaciones (aplicación web). Elija un nombre único, la pila de tiempo de ejecución deseada (por ejemplo, Node.js) y una región.
> Anota el nombre del servicio de aplicaciones y el grupo de recursos. Los necesitarás más adelante.

# Crear una entidad de servicio:

> Una entidad de servicio es una identidad de seguridad que permite a GitHub Actions autenticarse con Azure. Abra su Azure Cloud Shell:

    - az ad sp create-for-rbac --name "github-actions-sp" --role contributor --scopes /subscriptions/<TU_ID_DE_SUSCRIPCIÓN>/resourceGroups/<TU_GRUPO_DE_RECURSO> --sdk-auth

    - Reemplace <YOUR_SUBSCRIPTION_ID> con su ID de suscripción de Azure. Puede encontrarlo en el portal de Azure.
    - Reemplace <YOUR_RESOURCE_GROUP> con el nombre del grupo de recursos que contiene su App Service.
    - El comando generará un objeto JSON con las credenciales. Copie y guarde este objeto JSON con cuidado. Contiene el clientId, clientSecret, subscriptionId y tenantId. Esta información es muy confidencial, así que manténgala segura.

    "az ad sp create-for-rbac --name "github-actions-sp" --role contributor --scopes /subscriptions/106013ee-d5d2-492e-9aa4-c0f28c92dac5/resourceGroups/pruebaCiCdGithub --sdk-auth"


# Almacenar credenciales de Azure en secretos de GitHub:

    - En tu repositorio de GitHub, ve a “Configuración” -> “Secretos” -> “Acciones”.
    - Añade los siguientes secretos:
    - AZURE_CREDENTIALS: Pegue el objeto JSON completo que guardó al crear la entidad de servicio.


- necesidades: compilación: La tarea de despliegue depende de la tarea de compilación y solo se ejecutará si la tarea de compilación se completa con éxito.
- Entorno: Define un entorno para el despliegue. Esto es opcional, pero útil para realizar un seguimiento de los despliegues en GitHub.
- azure/login@v1: Inicia sesión en Azure utilizando las credenciales almacenadas en el secreto AZURE_CREDENTIALS.
- azure/webapps-deploy@v2: Implementa el código en el Servicio de aplicaciones de Azure especificado por app-name. El paquete: . especifica que se implementa todo el repositorio.