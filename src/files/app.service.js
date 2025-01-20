import fs from 'node:fs';
import path from 'node:path';

class FilesService {
    constructor() {
        // Obtener la URL del archivo actual (index.js)
        const __filename = new URL(import.meta.url).pathname;

        // Obtener el directorio actual
        const __dirname = path.dirname(__filename);

        /**
         * Subir 3 niveles desde `app.service.js` 
         * hasta llegar al Directorio donde esta carousel-app  
         */
        //dev
        const rutaDirectorio = path.posix.join(__dirname, '..', '..', '..', 'carousel-app', 'dist');
        //prod
        //const rutaDirectorio = path.posix.join(__dirname, '..', '..', '..', 'carrusel');
        const rutaDecodificada = decodeURIComponent(rutaDirectorio).slice(1);
        //this.directoryPath = 'C:/Users/Cris H/Documents/viteProjects/carousel-app/public';
        this.directoryPath = `${rutaDecodificada}`;
        console.log(rutaDecodificada)
    }

    async getFiles() {
        try {
            let filesCarousel = [];
            const files = await fs.promises.readdir(this.directoryPath);

            // const mediaFiles = files.filter(file =>
            //     /\.(jpg|jpeg|png|gif|mp4|mov|avi|mkv)$/i.test(file)
            // );

            files.forEach(file => {
                const extension = path.extname(file);
                if (/\.(jpg|jpeg|png)$/i.test(extension)) {
                    filesCarousel.push({
                        type: 'image',
                        src: `/${file}`,
                    })
                } else if (/\.(mp4|mov|avi|mkv)$/i.test(extension)) {
                    filesCarousel.push({
                        type: 'video',
                        src: `/${file}`,
                    })
                }
            })
            return filesCarousel;
        } catch (error) {
            console.error('Error al leer la carpeta:', err.message);
            throw new Error('No se pudieron obtener los archivos');
        }
    }
}

export default FilesService;