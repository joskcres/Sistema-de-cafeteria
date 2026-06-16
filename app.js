class Producto {
    #nombre;
    #tipo;
    #precio;
    #descripcion;
    #inventario;
    #enlace;
    #id;
    #cantidad;
    constructor({ nombre, tipo, descripcion, precio, inventario, enlace, cantidad }) {
        this.nombre = nombre;
        this.#tipo = tipo;
        this.precio = precio
        this.#inventario = inventario;
        this.#descripcion = descripcion;
        this.#id = Date.now() + Math.floor(Math.random() * 100)
        this.#enlace = enlace
        this.#cantidad = cantidad
    }
    set cantidad(value) {
        this.#cantidad = 0
    }
    get cantidad() {
        return this.#cantidad
    }
    get id() {
        return this.#id
    }
    set enlace(value) {
        this.#enlace = value
    }

    get enlace() {
        return this.#enlace
    }

    set nombre(value) {
        this.#nombre = value
    }
    get nombre() {
        return this.#nombre
    }

    set tipo(value) {
        this.#tipo = value
    }

    get tipo() {
        return this.#tipo
    }

    set precio(value) {
        this.#precio = value
    }

    get precio() {
        return this.#precio
    }

    set inventario(value) {
        this.#inventario = value
    }

    get inventario() {
        return this.#inventario
    }
    set descripcion(value) {
        this.#descripcion = value
    }

    get descripcion() {
        return this.#descripcion
    }

    sumarProducto() {
        return this.#cantidad += 1
    }

    restarProducto() {
        return this.#cantidad -= 1
    }

    eliminarProducto() {
        this.#cantidad = 0
    }

    obtenerTotal() {
        let total = this.#cantidad * this.#precio
        return total
    }
}

class Carrrito {
    #pedido;
    #impuesto;
    #subTotal;
    #total;
    constructor(pedido) {
        this.#pedido = pedido
        this.#impuesto = this.tenerTotal() * 0.05
        this.#total = this.tenerTotal()
        this.#subTotal = this.obtenerSubtotal()
    }
    set pedido(value) {
        this.#pedido = value
    }
    get pedido() {
        return this.#pedido
    }

    get subTotal() {
        return this.#subTotal
    }

    get impuesto() {
        return this.#impuesto
    }

    get total() {
        return this.#total
    }

    obtenerSubtotal() {
        let subtotal = this.total - this.impuesto
        return subtotal
    }
    tenerTotal() {
        let sumar = 0
        this.pedido.map(item => sumar += item.obtenerTotal())
        return sumar
    }

    finalizarPedido() {
        this.pedido.forEach(item => item.eliminarProducto())
    }

}

//puse los datos en objetos par que el orden de los parametros no afectara 
let producto1 = new Producto({
    nombre: "Café Americano",
    precio: 12,
    tipo: "Bebida caliente",
    descripcion: "Café negro tradicional",
    inventario: 20,
    enlace: 'https://izzycooking.com/wp-content/uploads/2022/09/Americano-Coffee-thmbnail.jpg',
    cantidad: 0
})
let producto2 = new Producto({
    nombre: "Café Latte",
    precio: 18,
    tipo: "Bebida caliente",
    descripcion: "Café con leche espumada",
    inventario: 10,
    enlace: 'https://ts4.mm.bing.net/th?id=OIP.gbP9OJ6qeWogd7poano4XwHaHa&pid=15.1&o=7&rm=3',
    cantidad: 0
})
let producto3 = new Producto({
    nombre: "Frappe de Chocolate",
    precio: 25,
    tipo: "Bebida fría",
    descripcion: "Bebida fría con chocolate y crema",
    inventario: 10,
    enlace: 'https://dla-naturals.com/wp-content/uploads/2022/10/Dark-Chocolate-Frappe.png',
    cantidad: 0
})
let producto4 = new Producto({
    nombre: "Smoothie de Fresa",
    precio: 22,
    tipo: "Bebida fría",
    descripcion: "Batido natural de fresa",
    enlace: 'https://lasrecetasdemiabuela.recipesown.com/wp-content/uploads/2024/07/30-3-768x768.webp',
    cantidad: 0,
    inventario: 5
})
let producto5 = new Producto({
    nombre: "Muffin de Vainilla",
    precio: 15,
    tipo: "Postre",
    descripcion: "Pan dulce suave de vainilla",
    inventario: 5,
    enlace: 'https://lepasteleria.com/wp-content/uploads/media/muffins-de-vainilla/muffins-de-vainilla-imagen-destacada.jpg',
    cantidad: 0
})
let producto6 = new Producto({
    nombre: "Cheesecake",
    precio: 28,
    tipo: "Postre",
    descripcion: "Pastel frío de queso",
    inventario: 3,
    enlace: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMAmSv-Jql6zg6aW8oN2VflqC_eEtdUj7DO0Yut-wSTA&s=10',
    cantidad: 0
})
let producto7 = new Producto({
    nombre: "Sandwich de Pollo",
    precio: 30,
    tipo: "Comida",
    descripcion: "Sandwich con pollo y vegetales",
    inventario: 3,
    enlace: 'https://i.pinimg.com/originals/c8/5c/1c/c85c1caa0b4fa0735dd7462ae180256d.png',
    cantidad: 0
})
let producto8 = new Producto({
    nombre: "Bagel con Queso",
    precio: 20,
    tipo: "Comida",
    descripcion: "Bagel tostado con queso crema",
    inventario: 4,
    enlace: 'https://img.magnific.com/fotos-premium/bagel-queso-crema-desayuno_770123-7629.jpg',
    cantidad: 0
})

let contenedorProductos = document.querySelector('.productos')
let contenedorPedido = document.querySelector('.pedido-container')
let pedido = []
let containerPedido = document.querySelector('.pedido-container')
let containerTotal = document.querySelector('.total-container')
let btnFinalizar = document.querySelector('.btn-finalizar')
let productosFactura = document.querySelector('#listaProductos')
let totalPagado = document.querySelector('#totalPagado')
let carrito1 = []
let reiniciar = document.querySelector('.reinicio')
let input = document.querySelector('.buscador')
let listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]
let filtros = document.querySelector('.filtros')
let nombre = ''
let tipo = 'Todos'
const dibujarProductos = (productos) => {
    contenedorProductos.innerHTML = ''
    for (let producto of productos) {

        let html = `<div class="col-md-3">
                        <div class="card product-card">
                            <img src="${producto.enlace}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">${producto.descripcion}</p>
                                <p class="precio">Q${producto.precio}.00</p>
                                <button class="btn btn-agregar" id ="${producto.id}">Agregar</button>
                            </div>
                        </div>
                    </div>`
        contenedorProductos.innerHTML += html
        let btnAgragar = document.querySelectorAll('.btn-agregar')
        btnAgragar.forEach(item => {
            item.addEventListener('click', (event) => {
                let productoAgregar = productos.find(item => item.id == event.target.id)
                if (!pedido.some(item => item.id == event.target.id)) {
                    pedido.push(productoAgregar)
                    productoAgregar.sumarProducto()
                } else {
                    productoAgregar.sumarProducto()
                }
                DibujarCarrito(pedido)
            })
        })
    }
}


const filtrar = (name, tipo) => {
    let temporal = []
    temporal = listaProductos.filter(item => (name != '') ? item.nombre.toLowerCase().includes(name.toLowerCase()) : item)
        .filter(item => (tipo != 'Todos') ? item.tipo === tipo : item)
    dibujarProductos(temporal)
}

const DibujarCarrito = (listaPedidos = []) => {
    containerPedido.innerHTML = ''
    carrito1 = new Carrrito(listaPedidos.filter(item => item.cantidad > 0))
    actualizarCarrito(carrito1)

    carrito1.pedido.forEach(producto => {
        if (producto.cantidad > 0) {
            let html = `<div class="order-item d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <strong>${producto.nombre}</strong><br>
                        Cantidad: ${producto.cantidad} | Q${producto.precio}.00 c/u
                    </div>
                    <div class="btn-group id="botones">
                        <button id="${producto.id}" class="btn btn-sm btn-control restar">-</button>
                        <button id="${producto.id}" class="btn btn-sm btn-control sumar">+</button>
                        <button id="${producto.id}" class="btn btn-sm btn-danger eliminar">Eliminar</button>
                    </div>
                    </div>`
            containerPedido.innerHTML += html
        }

    }
    )
    let btnsAcciones = document.querySelectorAll('.btn-group')
    btnsAcciones.forEach(btnsAccion => {
        btnsAccion.addEventListener('click', (event) => {
            let productoOperar = listaPedidos.filter(item => item.id == parseInt(event.target.id))
            if (event.target.textContent == '+') {
                productoOperar[0].sumarProducto()
                productoOperar[0].obtenerTotal()
            } else if (event.target.textContent == '-') {
                productoOperar[0].restarProducto()
                productoOperar[0].obtenerTotal()
            } else {
                productoOperar[0].eliminarProducto()
                actualizarCarrito(carrito1)
            }
            DibujarCarrito(pedido)

        })

    })

}

const actualizarCarrito = (carrito1) => {

    containerTotal.innerHTML = ` <p>Subtotal: Q.${carrito1.subTotal.toFixed(2)}</p>
                <p>Impuesto: 5%</p>
                <h5>Total: Q.${carrito1.total.toFixed(2)}</h5>
                </div>`
    if (carrito1.subTotal == 0) {
        btnFinalizar.classList.add('d-none')
    } else {
        btnFinalizar.classList.remove('d-none')
    }
}


const MostrarPedido = (carrito1) => {
    productosFactura.innerHTML = ''
    let productosHTML = ''
    carrito1.pedido.forEach(producto => {
        productosHTML += `<li>${producto.nombre} x${producto.cantidad} = Q.${producto.obtenerTotal()}.00</li>`
    })
    productosFactura.innerHTML = productosHTML
    totalPagado.innerHTML = `<p id="totalPagado"><strong>Total pagado: Q.${carrito1.total.toFixed(2)}</strong></p>`
}

filtros.addEventListener('click', (event) => {
    tipo = event.target.value
    if (tipo != undefined) {
        filtrar(nombre, tipo)
    } else {
        tipo = 'Todos'
        filtrar(nombre, tipo)
    }
})

input.addEventListener('keyup', (event) => {
    nombre = event.target.value
    filtrar(nombre, tipo)
})


btnFinalizar.addEventListener('click', (event) => {
    MostrarPedido(carrito1)
    DibujarCarrito()
    carrito1.finalizarPedido()

})

dibujarProductos(listaProductos)

