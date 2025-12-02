# 🧩 Indicaciones

1. **Instalar Volta (si no lo tienen):**  
   - Si tienen Chocolatey (opción más sencilla):  
     ```bash
     choco install volta -y
     ```
   - También pueden ver otras opciones en [https://volta.sh](https://volta.sh)

2. **Clonar el repositorio y entrar al proyecto:**
   ```bash
   git clone https://github.com/sebastianeyraud/TecnoWebSlytherin.git
   cd TecnoWebSlytherin
   ```

3. Instalar dependencias
    ```bash
    npm install
    ```

4. Y ejectuar cuando quieran
    ```bash
    npm start
    ```

⚠️ Importante

Asegúrense de estar dentro de la carpeta del proyecto antes de usar ng.
De otra forma, su sistema podría tomar el Angular global que tengan instalado y causar errores.

En este proyecto se usa Angular CLI 15 local, ya incluido en node_modules.

Si necesitan usar comandos como generar componentes, utilicen el ng local.
Con:

npx ng version

o

.\node_modules\\.bin\ng version

(el version puede ser cualquier cosa)

---