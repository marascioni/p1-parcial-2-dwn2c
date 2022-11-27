/*
 *  APELLIDOS
 *  Saurrales, Carolina
 *  Rascioni, Miguel
 */
/* document.addEventListener("DOMContentLoaded",() => {}); */


'use strict';

var codigoGlobal=0;
var catalogoProductos = [];
var carrito=[];
var categoriaVisualizar='Todos';
var elementosEnCarrito=0;
var montoTotalCarrito=0;


cargaInicia();
mostrarInventario(catalogoProductos);
creaFiltros();

document.getElementById('imgCarritoCompra').addEventListener ('click',mostrarCarrito);