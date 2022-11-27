
/**
 * Muestra todos los productos del listado pasado
 * @param {Array} Listado Listado de productos a mostrar
 */
const mostrarInventario = (Listado) => {
  var unProducto;
  var html;
  html = document.getElementById("productos");
  html.innerHTML = "";
  for (unProducto of Listado) {
    html.append(unProducto.mostrarProducto());
  }
};

/**
 * Filtra las categorias
 */
const filtrarCategoria = () => {
  var producto;
  var prodFiltrado = [];
  if (categoriaVisualizar == "Todos") {
    mostrarInventario(catalogoProductos);
  } else {
    for (producto of catalogoProductos) {
      if (producto.categoria == categoriaVisualizar) {
        prodFiltrado.push(producto);
      }
      mostrarInventario(prodFiltrado);
    }
  }
};

/**
 * Crea los botones de las categorias
 */
const creaFiltros = () => {
  var listCategorias = Producto.listCat;
  var categoria;

  var button = document.createElement("button");
  button.innerText = "Todos";
  button.setAttribute("id", "Todos");
  button.addEventListener("click", (e) => {
    var target = e.target;
    categoriaVisualizar = "Todos";
    filtrarCategoria();
  });
  html = document.getElementById("minicarrito");
  html.append(button);

  for (categoria of listCategorias) {
    button = document.createElement("button");
    button.innerText = categoria;
    button.setAttribute("id", `${categoria}`);
    button.addEventListener("click", (e) => {
      var target = e.target;
      categoriaVisualizar = target.id;
      filtrarCategoria();
    });
    html.append(button);
  }
};

/**
 * Agrega un elemento al carrito
 */
const agregarCarrito = (productoAgregado) => {
  var elemento;
  var flag = 1;
  for (elemento of carrito) {
    if (elemento.nombre == productoAgregado) {
      elemento.cantidad++;
      flag = 0;
    }
  }
  if (flag) {
    elemento = new Elemento(productoAgregado, 1);
    carrito.push(elemento);
  }

  var producto;
  for (producto of catalogoProductos) {
    if (producto.nombre == productoAgregado) {
      producto.actualizarStock("Compra");
      break;
    }
  }
  filtrarCategoria();
  elementosEnCarrito++;
  montoTotalCarrito += producto.precio;
  document.getElementById(
    "txtCarrito"
  ).firstElementChild.innerText = `Total: $ ${montoTotalCarrito}`;
  document.getElementById(
    "txtCarrito"
  ).lastElementChild.innerText = `Cantidad: ${elementosEnCarrito}`;
  document.getElementById("artCarrito").lastElementChild.setAttribute("src", "./img/carritoLleno.png");
};

/**
 * Muestra el contenido del carrito
 */
const mostrarCarrito = () => {
  //div del padre en el HTML
  var divPadre = document.getElementById("CodModal");
  //estructura del modal de bootstrap
  divPadre.innerHTML = "";
  var divLevel1 = document.createElement("div");
  divLevel1.id = "verCarrito";
  divLevel1.className = "modal fade";
  divLevel1.tabIndex = "-1";
  divLevel1.role = "dialog";
  divLevel1.setAttribute("aria-labelledby", "exampleModalLabel");
  divLevel1.ariaHidden = "true";

  var divLevel2 = document.createElement("div");
  divLevel2.className = "modal-dialog";
  divLevel2.role = "document";

  var divLevel3 = document.createElement("div");
  divLevel3.className = "modal-content";

  var divLevel4 = document.createElement("div");
  divLevel4.className = "modal-header";

  var h5 = document.createElement("h5");
  h5.className = "modal-title";
  h5.id = "exampleModalLabel";
  h5.innerText = "Carrito de compras";

  var btn1 = document.createElement("button");
  btn1.type = "button";
  btn1.className = "close";
  btn1.setAttribute("data-dismiss", "modal");
  btn1.ariaLabel = "Close";

  var span1 = document.createElement("span");
  span1.ariaHidden = "true";
  span1.innerText = "X";
  //inicio - div del body
  var divLevel5 = document.createElement("div");
  divLevel5.className = "modal-body";
  //divs para mostrar los productos del carrito

  var divLevel51 = document.createElement("div");
  divLevel51.className = "modal-cabecera";

  var h6Producto = document.createElement("h6");
  h6Producto.className = "modal-subtitle";
  h6Producto.id = "cabeceraProducto";
  h6Producto.innerText = "Producto";

  var h6Total = document.createElement("h6");
  h6Total.className = "modal-subtitle";
  h6Total.id = "cabeceraTotal";
  h6Total.innerText = "Sub-Total";

  divLevel51.append(h6Producto);
  divLevel51.append(h6Total);

  divLevel5.append(divLevel51);

  cargarProdCarrito(divLevel5);

  //fin - div del body

  var divLevel6 = document.createElement("div");
  divLevel6.className = "modal-footer";

  var divLevel61 = document.createElement("div");
  divLevel61.className = "modal-total";

  var h6TotalCompra = document.createElement("h6");
  h6TotalCompra.id = "montoTotal";
  h6TotalCompra.innerText = `Total (sin envío): $${montoTotalCarrito}`;

  divLevel61.append(h6TotalCompra);

  var divLevel62 = document.createElement("div");
  divLevel62.className = "modal-btn";

  var btn2 = document.createElement("button");
  btn2.type = "button";
  btn2.className = "btn btn-secondary";
  btn2.setAttribute("data-dismiss", "modal");
  btn2.innerText = "Continuar Compra";

  var btn3 = document.createElement("button");
  btn3.type = "button";
  btn3.className = "btn btn-primary";
  btn3.innerText = "Finalizar Compra";

  var papelera = document.createElement("img");
  papelera.className = "modal-item-imgPapelera";
  papelera.setAttribute("src", "./img/bin.png");
  papelera.setAttribute("alt", "Imagen de papelera");
  papelera.id = 'vaciarCarrito'

  var msgPapelera = document.createElement('p');
  msgPapelera.id = 'msgVaciarCarrito';
  msgPapelera.innerText = 'Vaciar carrito';

  papelera.addEventListener("click", (e) => {
    var target = e.target;
    if (carrito.length) {
      document.querySelector('.modal-body').firstChild.remove();
      var item;
      elementosEnCarrito = 0;
      montoTotalCarrito = 0;
      for (item of carrito) {
        buscarProducto(item.nombre).stock += item.cantidad;
      }
      carrito = [];
      /* for (var nodo of document.querySelector('.modal-body').childNodes)
          document.querySelector('.modal-body').removeChild(nodo); */
      var cantNodos = document.querySelector('.modal-body').childElementCount;
      for (var i = 0; i < cantNodos; i++)
        document.querySelector('.modal-body').firstChild.remove();
      carritoVacio();
    }
  });

  divLevel62.append(msgPapelera);
  divLevel62.append(papelera);
  divLevel62.append(btn2);
  divLevel62.append(btn3);

  divLevel6.append(divLevel61);
  divLevel6.append(divLevel62);

  divLevel4.append(h5);
  btn1.append(span1);
  divLevel4.append(btn1);

  divLevel3.append(divLevel4);
  divLevel3.append(divLevel5);
  divLevel3.append(divLevel6);

  divLevel2.append(divLevel3);

  divLevel1.append(divLevel2);

  divPadre.append(divLevel1);
  carrito.length == 0 ? carritoVacio() : null;
};

/**
 * Genera el listado de productos en el carrito
 * @param {Object} div Contenedor de los items del carrito
 */
const cargarProdCarrito = (divLevel5) => {
  var itemCarrito,
    cont = 1;
  for (itemCarrito of carrito) {
    var divLevel52 = document.createElement("div");
    divLevel52.className = "modal-item";
    divLevel52.id = `itemDelCarrito${cont++}`;

    var imgProd = document.createElement("img");
    imgProd.className = "modal-item-imgProd";

    imgProd.src = buscarImagen(itemCarrito.nombre);
    imgProd.setAttribute("alt", "Imagen de planta");

    var divLevel521 = document.createElement("div");
    divLevel521.id = "descPrecio";

    var nombreItem = document.createElement("p");
    nombreItem.id = "nombreItem";
    nombreItem.innerText = `${itemCarrito.nombre}`;

    var precioItem = document.createElement("p");
    precioItem.id = "precioItem";
    var importe = buscarImporte(itemCarrito.nombre);
    precioItem.innerText = `$ ${importe}`;

    var montoTotalItem = document.createElement("p");
    montoTotalItem.id = "montoTotalItem";
    var total = importe * itemCarrito.cantidad;
    montoTotalItem.innerText = `$ ${total}`;

    var papelera = document.createElement("img");
    papelera.className = "modal-item-imgPapelera";
    papelera.setAttribute("src", "./img/bin.png");
    papelera.setAttribute("alt", "Imagen de papelera");
    papelera.addEventListener("click", (e) => {
      var target = e.target;
      borrarItemCarrito(
        target,
        target.parentElement.childNodes[1].childNodes[0].innerText,
        target.parentElement.childNodes[1].childNodes[2].childNodes[1].innerText
      );
    });
    divLevel521.append(nombreItem);
    divLevel521.append(precioItem);

    var divLevel53 = document.createElement("div");
    divLevel53.className = "modal-item-cant";

    var btnMas = document.createElement("img");
    btnMas.setAttribute("src", "./img/plus.png");
    btnMas.setAttribute("alt", "Img de signo más");
    btnMas.addEventListener("click", (e) => {
      carritoActCant("+", e.target);
    });

    var producto;
    for (producto of catalogoProductos) {
      if (producto.nombre == itemCarrito.nombre && producto.stock == 0) {
        btnMas.style.visibility = "hidden";
        break;
      }
    }

    var cantItem = document.createElement("p");
    cantItem.id = "cantItem";
    cantItem.innerText = itemCarrito.cantidad;

    var btnMenos = document.createElement("img");
    btnMenos.setAttribute("src", "./img/minus.png");
    btnMenos.setAttribute("alt", "Img de signo menos");

    btnMenos.addEventListener("click", (e) => {
      carritoActCant("-", e.target);
    });

    divLevel53.append(btnMenos);
    divLevel53.append(cantItem);
    divLevel53.append(btnMas);

    divLevel521.append(divLevel53);

    divLevel52.append(imgProd);
    divLevel52.append(divLevel521);

    divLevel52.append(montoTotalItem);
    divLevel52.append(papelera);

    divLevel5.append(divLevel52);

    var hr = document.createElement("hr");
    divLevel5.append(hr);
  }
  divLevel5.lastElementChild.remove();
  return divLevel5;
};

/**
 * Actualiza la cantidad de item en el carrito
 * @param {String} operador Operador de + o -
 * @param {Object} target Elemento donde aplicar la operacion
 */
const carritoActCant = (operador, target) => {
  var producto, tipoOper;
  var total,
    flag = 1;

  for (producto of catalogoProductos) {
    if (
      producto.nombre ==
      target.parentElement.parentElement.childNodes[0].innerText
    )
      break;
  }

  if (operador == "+") {
    target.parentElement.querySelector("p").innerText =
      parseInt(target.parentElement.querySelector("p").innerText) + 1;
    tipoOper = "Compra";
    elementosEnCarrito++;
    montoTotalCarrito += producto.precio;
  } else {
    target.parentElement.querySelector("p").innerText =
      parseInt(target.parentElement.querySelector("p").innerText) - 1;
    tipoOper = "Venta";
    montoTotalCarrito -= producto.precio;

    if (!parseInt(target.parentElement.querySelector("p").innerText)) {
      flag = 0;
      carrito.forEach((valor, indice) => {
        valor.nombre == producto.nombre ? carrito.splice(indice, 1) : "";
      });
      if (
        target.parentElement.parentElement.parentElement.nextElementSibling !=
        null
      )
        target.parentElement.parentElement.parentElement.nextElementSibling.remove();
      target.parentElement.parentElement.parentElement.remove();
      producto.actualizarStock(tipoOper);
    }

    if (carrito.length === 0) {
      document.getElementById("cabeceraProducto").parentElement.remove();
      carritoVacio();
    } else {
      elementosEnCarrito--;
    }
  }

  if (flag) {
    carrito.forEach((valor, indice) => {
      valor.nombre == producto.nombre
        ? (valor.cantidad = parseInt(
          target.parentElement.querySelector("p").innerText
        ))
        : "";
    });

    producto.actualizarStock(tipoOper);
    if (producto.stock == 0) {
      target.className = "hidden";
    } else {
      operador == "-"
        ? (target.nextElementSibling.nextElementSibling.className = "visible")
        : null;
    }
    total =
      producto.precio *
      parseInt(target.parentElement.querySelector("p").innerText);
    target.parentElement.parentElement.parentElement.getElementsByTagName(
      "p"
    )[3].innerText = `$ ${total}`;
  }
  document.getElementById(
    "txtCarrito"
  ).firstElementChild.innerText = `Total: $ ${montoTotalCarrito}`;
  document.getElementById(
    "txtCarrito"
  ).lastElementChild.innerText = `Cantidad: ${elementosEnCarrito}`;
  document.getElementById('montoTotal').innerText = `Total (sin envío): $${montoTotalCarrito}`;
  filtrarCategoria();
};

/**
 * Busca el precio del producto
 * @param {String} nombreProducto Nombre del producto
 */
const buscarImporte = (nombreProducto) => {
  var producto;
  for (producto of catalogoProductos) {
    if (nombreProducto == producto.nombre) {
      return producto.precio;
    }
  }
};

/**
 * Busca un producto
 * @param {String} nombreProducto Nombre del producto
 */
const buscarProducto = (nombreProducto) => {
  var producto;
  for (producto of catalogoProductos) {
    if (nombreProducto == producto.nombre) {
      return producto;
    }
  }
};

/**
 * Busca la imagen del producto
 * @param {String} nombreProducto Nombre del producto
 */
const buscarImagen = (nombreProducto) => {
  var producto;
  for (producto of catalogoProductos) {
    if (nombreProducto == producto.nombre) {
      return producto.listImagen[0];
    }
  }
};

/**
 * Borra un producto del carrito
 * @param {Object} target Elemento a borrar
 * @param {String} nombreProducto Nombre del producto
 * @param {Number} cantidad Cantidad de elementos
 */
const borrarItemCarrito = (target, nombreProducto, cantidad) => {
  if (target.parentElement.nextElementSibling != null)
    target.parentElement.nextElementSibling.remove();
  target.parentElement.remove();
  var producto;
  for (producto of catalogoProductos) {
    if (nombreProducto == producto.nombre) {
      producto.stock += parseInt(cantidad);
      montoTotalCarrito -= producto.precio * parseInt(cantidad);
      break;
    }
  }
  carrito.forEach((valor, indice) => {
    valor.nombre == nombreProducto ? carrito.splice(indice, 1) : "";
  });
  if (carrito.length === 0) {
    carritoVacio();
    document.getElementById('cabeceraProducto').parentElement.remove(); 
  } else {
    elementosEnCarrito -= parseInt(cantidad);
  }
  document.getElementById(
    "txtCarrito"
  ).firstElementChild.innerText = `Total: $ ${montoTotalCarrito}`;
  document.getElementById(
    "txtCarrito"
  ).lastElementChild.innerText = `Cantidad: ${elementosEnCarrito}`;
  document.getElementById('montoTotal').innerText = `Total (sin envío): $${montoTotalCarrito}`;
  filtrarCategoria();
};

/**
 * Muestra el modal del carrito con la leyenda de carrito vacío
 */
const carritoVacio = () => {
  elementosEnCarrito = 0;  
  var p = document.createElement('p');
  p.id = 'vacio';
  p.innerText = 'Carrito Vacío';
  document.querySelector(".modal-body").append(p);
  document.getElementById('montoTotal').innerText = `Total (sin envío): $${montoTotalCarrito}`;
  filtrarCategoria();
  document.getElementById(
    "txtCarrito"
  ).firstElementChild.innerText = `Total: $ ${montoTotalCarrito}`;
  document.getElementById(
    "txtCarrito"
  ).lastElementChild.innerText = `Cantidad: ${elementosEnCarrito}`;  
  document.getElementById("artCarrito").lastElementChild.setAttribute("src", "./img/carritoVacio.png");
}


/**
 * Muestra el modal de la descripción del producto
 * @param {String} Producto Elemento a mostrar la descripción
 */
const mostrarDescripcion = (producto) => {
  //div del padre en el HTML  
  var divPadre = document.getElementById("ModalDesc");
  divPadre.innerHTML='';
  var divL1 = document.createElement('div');
  divL1.className = "modal fade";
  divL1.id = "CodModalDescripcion";
  divL1.tabIndex = '-1';
  divL1.role = "dialog";
  divL1.setAttribute('aria-labelledby' ,"exampleModalLabel");
  divL1.ariaHidden = "true";

  var divL2 = document.createElement('div');
  divL2.className = "modal-dialog";
  divL2.role = "document";

  var divL3 = document.createElement('div');
  divL3.className = "modal-content";

  var divL4 = document.createElement('div');
  divL4.className = "modal-header";

  var h5 = document.createElement('h5');
  h5.className = "modal-title";
  h5.id = "exampleModalLabel";
  h5.innerText = `Descripción de ${producto}`;

  var button = document.createElement('button');
  button.className = "close";
  button.type = "button";
  button.setAttribute('data-dismiss', "modal");
  button.ariaLabel = "Close";

  var span = document.createElement('span');
  span.ariaHidden = "true";
  span.innerText = 'X'

  divL4.append(h5);
  button.append(span);
  divL4.append(button);
 
  var divL5 = document.createElement('div');
  divL5.className = "modal-body";

  var prodDesc=document.createElement('p');
  var descripcionProd=buscarProducto(producto).descLarga;  
  prodDesc.innerText=  descripcionProd;    
  divL5.append(prodDesc);
  
  var divL6 = document.createElement('div');
  divL6.className = "modal-footer";

  var btn1 = document.createElement('button');
  btn1.className = "btn btn-primary";
  btn1.type = "button";
  btn1.setAttribute('data-dismiss', "modal");
  btn1.innerText = "Volver";

  divL6.append(btn1);

  divL3.append(divL4);
  divL3.append(divL5);
  divL3.append(divL6);

  divL2.append(divL3);

  divL1.append(divL2);

  divPadre.append(divL1); 

};
