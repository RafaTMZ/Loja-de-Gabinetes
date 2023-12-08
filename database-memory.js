import { randomUUID } from "crypto"

export class DatabaseMemory{
#gabinetes = new Map()

list(search){
    return Array.from(this.#gabinetes.entries()).map((gabinetesArray) =>{
    // acessando primeira posição
        const id = gabinetesArray[0]
        const data = gabinetesArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(gabinete => {
        if (search){
            return gabinete.modelo.includes(search)
        }
        return true
    })
}
create(gabinete){
    const gabineteId = randomUUID()
    this.#gabinetes.set(gabineteId, gabinete)
}
update(id, gabinete){
    this.#gabinetes.set(id, gabinete)
}
delete(id, gabinete){
    this.#gabinetes.delete(id, gabinete)
}
}