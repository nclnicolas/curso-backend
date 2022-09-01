const guardarProducto = async () => {

    const nombre = document.getElementById('nombre').value
    const precio = document.getElementById('precio').value
    const urlImage = document.getElementById('url').value
    document.getElementById('data').reset()

    try {
        const data = { nombre, precio, urlImage}
        const response = await fetch('/api/productos', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        })
        const result = await response.json()
        return result

    } catch (error) {
        let err = new Error(error)
        return err
    }
}