import fs from 'node:fs';
import path from 'node:path';

class FilesService {
    constructor() {
        this.directoryPath = 'C:/Users/Cris H/Documents/viteProjects/carousel-app/public';
    }

    async getFiles() {
        try {
            let filesCarousel = [];
            const files = await fs.promises.readdir(this.directoryPath);

            const mediaFiles = files.filter(file =>
                /\.(jpg|jpeg|png|gif|mp4|mov|avi|mkv)$/i.test(file)
            );

            mediaFiles.forEach(file => {
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