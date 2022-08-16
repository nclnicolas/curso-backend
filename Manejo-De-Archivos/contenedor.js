const fs = require('fs');

class Contenedor {
    constructor(fileName){
        this.fileName = fileName;
    }

    async createIfNotExist(){
        try{
            await fs.promises.access(this.fileName)
        }catch(err){
            await fs.promises.writeFile(this.fileName, '[]', 'utf8');
        }
    }

    async getAll(){
        try {
            return JSON.parse(await fs.promises.readFile(this.fileName, 'utf8'));
        } catch (error) {
            throw new Error(error);
        }
    }

    async save(content){
        try {
            const data = await this.getAll();
            content.id = (data[data.length - 1]?.id || 0) + 1;
            data.push(content);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            if(error.message.includes('ENOENT')){
                await this.createIfNotExist();
                return this.save(content);
            } else {
                throw new Error(error);
            }
        }
    }

    async getById(id){
        try {
            const data = await this.getAll();
            return data.find(item => item.id == id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id){
        try {
            const data = await this.getAll();
            const newData = data.filter(item => item.id != id);
            await fs.promises.writeFile(this.fileName, JSON.stringify(newData, null, 2), 'utf8');
        } catch(error){
            throw new Error(error);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.fileName, '[]', 'utf8');
        } catch(error){
            throw new Error(error);
        }
    }
}
module.exports = {Contenedor};