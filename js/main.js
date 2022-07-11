(function() {
    "use strict";

    var regalo = document.getElementById('regalo');

    document.addEventListener('DOMContentLoaded', function() {

        if (document.getElementById("mapa")) {
            var map = L.map('mapa').setView([43.183463, -2.267475], 20);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([43.183463, -2.267475]).addTo(map)
                .bindPopup('GLDWEBCAMP 2021 - Boletos ya disponibles.')
                .openPopup();
        }

        // Campos Datos usuario

        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');


        // campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        // Botones y Divs

        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var btnRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        // Extras

        var camisas = document.getElementById('camisa_evento');
        var etiquetas = document.getElementById('etiquetas');
        if (calcular) {

            email.addEventListener('click', calcularMontos);

        }

        if (pase_dia) {
            pase_dia.addEventListener('blur', mostrarDias);
        }
        if (pase_dosdias) {
            pase_dosdias.addEventListener('blur', mostrarDias);
        }
        if (pase_dia) {
            pase_completo.addEventListener('blur', mostrarDias);
        }

        if (nombre) {

            nombre.addEventListener('blur', validarCampos);

        }

        if (apellido) {

            apellido.addEventListener('blur', validarCampos);

        }

        if (email) {

            email.addEventListener('blur', validarCampos);

        }

        if (email) {

            email.addEventListener('blur', validarEmail);

        }







        function validarCampos() {
            if (this.value == '') {
                errorDiv.style.display = "block";
                errorDiv.innerHTML = "Este campo es obligatorio."
                this.style.border = '1px solid red';

            } else {
                errorDiv.style.display = "none";
                this.style.border = '1px solid #e1e1e1';
            }
        }

        function validarEmail() {
            if (this.value.indexOf("@") > -1) {
                errorDiv.style.display = "nond";

                this.style.border = '1px solid #e1e1e1';

            } else {
                errorDiv.style.display = "block";
                errorDiv.innerHTML = "Debes ingresar un Email válido."
                this.style.border = '1px solid red';
            }
        }

        function calcularMontos(event) {
            event.preventDefault();
            // console.log("Has hecho click en calcular");
            if (regalo.value === '') {
                alert("Debes elegir un regalo");
                regalo.focus();
            } else {
                // Variables que contendran la cantidad de boletos elegidos
                var boletos_dia = parseInt(pase_dia.value, 10) || 0,
                    boletos_dos_dias = parseInt(pase_dosdias.value, 10) || 0,
                    boleto_completo = parseInt(pase_completo.value, 10) || 0,
                    cantCamisas = parseInt(camisas.value, 10) || 0,
                    cantEtiquetas = parseInt(etiquetas.value, 10) || 0;


                var totalPagar = (boletos_dia * 30) + (boletos_dos_dias * 45) + (boleto_completo * 50) +
                    ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);

                var listadoProductos = [];

                if (boletos_dia >= 1) {
                    listadoProductos.push(boletos_dia + ' Pases por Día.');
                }
                if (boletos_dos_dias >= 1) {
                    listadoProductos.push(boletos_dos_dias + ' Pases por dos Días.');
                }

                if (boleto_completo >= 1) {
                    listadoProductos.push(boleto_completo + ' Pases Completos.');
                }
                if (cantCamisas > 0) {
                    listadoProductos.push(cantCamisas + ' Camisas.');
                } else {
                    if (cantCamisas == 1) {}
                    listadoProductos.push(cantCamisas + ' Camisa.');
                }
                if (cantEtiquetas >= 1) {
                    listadoProductos.push(cantEtiquetas + ' Etiquetas.');
                }
                lista_productos.style.display = "block"; //para ocultar desde CSS 
                lista_productos.innerHTML = '';
                for (var i = 0; i < listadoProductos.length; i++) {
                    lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                }

                suma.innerHTML = "$ " + totalPagar.toFixed(2);


            }


        }

        function mostrarDias() {
            var boletos_dia = parseInt(pase_dia.value, 10) || 0,
                boletos_dos_dias = parseInt(pase_dosdias.value, 10) || 0,
                boleto_completo = parseInt(pase_completo.value, 10) || 0;

            var diasElegidos = [];

            if (boletos_dia > 0) {
                diasElegidos.push('viernes');

            }

            if (boletos_dos_dias > 0) {
                diasElegidos.push('viernes', 'sabado');


            }

            if (boleto_completo > 0) {
                diasElegidos.push('viernes', 'sabado', 'domingo');
            }

            for (var daySelected of diasElegidos) {
                document.getElementById(daySelected).style.display = "block";
            }
        }

    }); // DOM CONTENT LOADED
})();

//JQUERY
$(function() {

    // LETTERING

    $('.nombre-sitio').hide();
    $('.nombre-sitio').fadeIn(5000);
    $('.nombre-sitio').lettering();

    // MENU FIJO

    var windowHeight = $(window).height();
    var barraAltura = $('.barra').innerHeight();

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > windowHeight) {
            $('.barra').addClass('fixed');
            $('body').css({ 'margin-top': barraAltura + 'px' });
        } else {
            $('.barra').removeClass('fixed');
            $('body').css({ 'margin-top': '0px' });
        }
    });

    // MENU RESPONSIVE

    $('.menu-movil').on('click', function() {
        $('.navegacion-principal').slideToggle();
    });


    //PROGRAMA DE CONFERENCIAS
    $('.programa-evento .info-curso').hide();
    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');
    $('.menu-programa a:first').addClass('colorOrange');



    $('.menu-programa a').on('click', function() {


        $('.menu-programa a').removeClass('activo');
        $('.menu-programa a').removeClass('colorOrange');
        $(this).addClass('activo');
        $(this).addClass('colorOrange');

        $('.ocultar').hide();
        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);

        return false;
    });

    // ANIMACIONES PARA LOS NUMEROS

    $('.resumen-evento li:nth-child(1) p').animateNumber({ number: 6 }, 1200);
    $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 15 }, 1200);
    $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3 }, 900);
    $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 9 }, 1500);

    // ANIMACIÓN CUENTA REGRESIVA

    $('.cuenta-regresiva .numero').countdown('2021/8/4 09:00:00', function(event) {
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });
});