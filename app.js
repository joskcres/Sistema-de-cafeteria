class Producto {
    #nombre;
    #tipo;
    #precio;
    #descripcion;
    #inventario;
    #enlace;
    #id;
    #cantidad;
    constructor({ nombre, tipo, descripcion, precio, inventario, enlace }) {
        this.nombre = nombre;
        this.#tipo = tipo;
        this.precio = precio
        this.#inventario = inventario;
        this.#descripcion = descripcion;
        this.#id = Date.now() + Math.floor(Math.random() * 100)
        this.#enlace = enlace
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

    SumarProducto() {
        this.#cantidad++
    }

    obtenerTotal() {
        return this.#precio * this.#cantidad
    }
}

class Carrrito {
    #pedido;
    #impuesto;
    #subTotal;
    #total;
    constructor(pedido) {
        this.#pedido = pedido
        this.#impuesto = impuesto
        this.#subTotal = subTotal
        this.#total = total
    }
    set pedido(value) {
        this.#pedido = value
    }
    get pedido() {
        return this.#pedido
    }

    set subTotal(value) {
        let total = 0
        this.#subTotal = this.pedido.map(producto => total += producto.precio)
    }
    get subTotal(){
        return this.#subTotal
    }
    set impuesto(value) {
        this.#impuesto = (this.subTotal * 12) / 100
    }

    get impuesto(){
        return this.#impuesto
    }

    set total(value) {
        this.#total =  this.subTotal - this.impuesto
    }

    get total(){
        return this.#total
    }

}

let producto1 = new Producto({
    nombre: "Café Americano",
    precio: 12,
    categoria: "Bebida caliente",
    descripcion: "Café negro tradicional",
    inventario: 20,
    enlace: 'https://izzycooking.com/wp-content/uploads/2022/09/Americano-Coffee-thmbnail.jpg'
})
let producto2 = new Producto({
    nombre: "Café Latte",
    precio: 18,
    categoria: "Bebida caliente",
    descripcion: "Café con leche espumada",
    inventario: 10,
    enlace: 'https://ts4.mm.bing.net/th?id=OIP.gbP9OJ6qeWogd7poano4XwHaHa&pid=15.1&o=7&rm=3'
})
let producto3 = new Producto({
    nombre: "Frappe de Chocolate",
    precio: 25,
    categoria: "Bebida fría",
    descripcion: "Bebida fría con chocolate y crema",
    inventario: 10,
    enlace: 'https://dla-naturals.com/wp-content/uploads/2022/10/Dark-Chocolate-Frappe.png'
})
let producto4 = new Producto({
    nombre: "Smoothie de Fresa",
    precio: 22,
    categoria: "Bebida fría",
    descripcion: "Batido natural de fresa",
    enlace: 'https://lasrecetasdemiabuela.recipesown.com/wp-content/uploads/2024/07/30-3-768x768.webp',
    inventario: 5
})
let producto5 = new Producto({
    nombre: "Muffin de Vainilla",
    precio: 15,
    categoria: "Postre",
    descripcion: "Pan dulce suave de vainilla",
    inventario: 5,
    enlace: 'https://lasrecetasdemiabuela.recipesown.com/wp-content/uploads/2024/07/30-3-768x768.webp'
})
let producto6 = new Producto({
    nombre: "Cheesecake",
    precio: 28,
    categoria: "Postre",
    descripcion: "Pastel frío de queso",
    inventario: 3,
    enlace: 'https://lepasteleria.com/wp-content/uploads/media/muffins-de-vainilla/muffins-de-vainilla-imagen-destacada.jpg'
})
let producto7 = new Producto({
    nombre: "Sandwich de Pollo",
    precio: 30,
    categoria: "Comida",
    descripcion: "Sandwich con pollo y vegetales",
    inventario: 3,
    enlace: 'https://i.pinimg.com/originals/c8/5c/1c/c85c1caa0b4fa0735dd7462ae180256d.png'
})
let producto8 = new Producto({
    nombre: "Bagel con Queso",
    precio: 20,
    categoria: "Comida",
    descripcion: "Bagel tostado con queso crema",
    inventario: 4,
    enlace: 'https://img.magnific.com/fotos-premium/bagel-queso-crema-desayuno_770123-7629.jpg'
})

let contenedorProductos = document.querySelector('.productos')
let contenedorPedido = document.querySelector('.pedido-container')
let pedido = []
let containerPedido = document.querySelector('.pedido-container')
let listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]
let accionesCarrito = document.querySelectorAll('.btn-group')

for (let producto of listaProductos) {
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
}


let btnsAgregar = document.querySelectorAll('.btn-agregar')
btnsAgregar.forEach(btn => {
    btn.addEventListener('click', (event) => {
        let productoAgregar = listaProductos.find(item => item.id == event.target.id)
        if (!pedido.some(item => item.id == event.target.id)) {
            pedido.push(productoAgregar)
            productoAgregar.SumarProducto()
        } else {
            productoAgregar.SumarProducto()
        }
        DibujarCarrito(pedido)
        // productoAgregar.AgregarAlCArrito(productoAgregar)
    })
})
const DibujarCarrito = (listaPedidos) => {
    containerPedido.innerHTML = ''
    listaPedidos.forEach(producto => {
        let html = `<div class="order-item d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <strong>${producto.nombre}</strong><br>
                        Cantidad: ${producto.cantidad} | Q${producto.precio}.00 c/u
                    </div>
                    <div class="btn-group" id="${producto.id}">
                        <button class="btn btn-sm btn-control restar">-</button>
                        <button class="btn btn-sm btn-control sumar">+</button>
                        <button class="btn btn-sm btn-danger eliminar">Eliminar</button>
                    </div>
                    </div>`
        containerPedido.innerHTML += html
    })
}

let sumar = document.querySelectorAll('.sumar')
sumar.forEach(btnSuma=>btnSuma.addEventListener('click',(event)=>{
    console.log('hola')
}))