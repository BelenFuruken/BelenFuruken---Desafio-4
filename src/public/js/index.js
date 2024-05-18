//ESTE ARCHIVO REPRESENTA EL LADO DEL CLIENTE, LO QUE ÉL VE Y CON LO QUE ÉL INTERACTÚA
const socket = io()

function cargarProducto(){
    const nameP = document.getElementById("name").value
    const priceP = document.getElementById("price").value

    console.log(nameP, priceP)
    socket.emit("nuevoProducto",{producto: nameP, precio: priceP})
}


const boton = document.getElementById("btn-cargar")
boton.addEventListener('click', ()=>{
    console.log("Click en botón")
})

socket.on( "nuevoProducto", (data)=>{
    console.log(data)
    let lista = document.getElementById("todos-los-productos")
    lista.innerHTML=''
    data.forEach(element => {
        let nuevoItem = document.createElement('li')
        nuevoItem.textContent = `${element.producto} $${element.precio}`   
        lista.appendChild(nuevoItem)
    })
})