var UrlGetSocios = 'http://localhost:80/G7_19/controller/ma_socios_negocio.php?op=GetAll';
var UrlPostSocios = 'http://localhost:80/G7_19/controller/ma_socios_negocio.php?op=Insert';
var UrlGetIDSocios = 'http://localhost:80/G7_19/controller/ma_socios_negocio.php?op=GetID';
var UrlUpdateSocios = 'http://localhost:80/G7_19/controller/ma_socios_negocio.php?op=Update';
var UrlDeleteSocios = 'http://localhost:80/G7_19/controller/ma_socios_negocio.php?op=Delete';


$(document).ready(function(){
    CargarSocios();
});

//Mostrar todos los Registros
function CargarSocios(){
    $.ajax({
        url: UrlGetSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores = '';

            for(i = 0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID+'</td>'+
                '<td>'+ MiItems[i].NOMBRE+'</td>'+
                '<td>'+ MiItems[i].RAZON_SOCIAL+'</td>'+
                '<td>'+ MiItems[i].DIRECCION+'</td>'+
                '<td>'+ MiItems[i].TIPO_SOCIO+'</td>'+
                '<td>'+ MiItems[i].CONTACTO+'</td>'+
                '<td>'+ MiItems[i].EMAIL+'</td>'+
                '<td>'+ MiItems[i].FECHA_CREADO+'</td>'+
                '<td>'+ MiItems[i].ESTADO+'</td>'+
                '<td>'+ MiItems[i].TELEFONO+'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarSocio('+MiItems[i].ID+')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarSocio('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.socios_negocio').html(Valores);
            }
        }
    })
}

//Insertar un nuevo Socio
function AgregarSocio(){
    var datosSocios = {
       NOMBRE:$('#nombre').val(),
       RAZON_SOCIAL:$('#razon_social').val(),
       DIRECCION:$('#direccion').val(),
       TIPO_SOCIO:$('#tipo_socio').val(),
       CONTACTO:$('#contacto').val(),
       EMAIL:$('#email').val(),
       FECHA_CREADO:$('#fecha_creado').val(),
       ESTADO:$('#estado').val(),
       TELEFONO:$('#telefono').val()
   };

   var datosSociosJson = JSON.stringify(datosSocios);

   $.ajax({
       url: UrlPostSocios,
       type: 'POST',
       data: datosSociosJson,
       datatype: 'JSON',
       contentType: 'application/json',
       success: function(response){
           console.log(response);
       }

   });
alert("Socio Agregado");
}

//Mostrar un Socio por ID
function CargarSocio(idSocio){
    var datosSocio = {
        ID: idSocio
    };

    var datosSocioJson = JSON.stringify(datosSocio);

    $.ajax({
        url: UrlGetIDSocios,
        type: 'POST',
        data: datosSocioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#nombre').val(MiItems[0].NOMBRE);
            $('#razon_social').val(MiItems[0].RAZON_SOCIAL);
            $('#direccion').val(MiItems[0].DIRECCION);
            $('#tipo_socio').val(MiItems[0].TIPO_SOCIO);
            $('#contacto').val(MiItems[0].CONTACTO);
            $('#email').val(MiItems[0].EMAIL);
            $('#fecha_creado').val(MiItems[0].FECHA_CREADO);
            $('#estado').val(MiItems[0].ESTADO);
            $('#telefono').val(MiItems[0].TELEFONO);

            var btnActualizar =
                '<input type="submit" id="btnActualizar" onclick="ActualizarSocio(' +
                MiItems[0].ID +
                ')" value="Actualizar Socio" class="btn btn-primary"></input>';

            $('.button').html(btnActualizar);
        }
    });
}

//Actualizar un Socio
function ActualizarSocio(idSocio){
    var datosSocios = {
        ID: idSocio,
        NOMBRE:$('#nombre').val(),
        RAZON_SOCIAL:$('#razon_social').val(),
        DIRECCION:$('#direccion').val(),
        TIPO_SOCIO:$('#tipo_socio').val(),
        CONTACTO:$('#contacto').val(),
        EMAIL:$('#email').val(),
        FECHA_CREADO:$('#fecha_creado').val(),
        ESTADO:$('#estado').val(),
        TELEFONO:$('#telefono').val()
    };
 
    var datosSociosJson = JSON.stringify(datosSocios);
 
    $.ajax({
        url: UrlUpdateSocios,
        type: 'PUT',
        data: datosSociosJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
 
    });
 alert("Socio Actualizado");
 
}

//Eliminar un Socio
function EliminarSocio(idSocio){
    var datosSocio = {
        ID: idSocio
    };

    var datosSocioJson = JSON.stringify(datosSocio);

    $.ajax({
        url: UrlDeleteSocios,
        type: 'DELETE',
        data: datosSocioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
 
    });
 alert("Socio Eliminado");
 CargarSocios();
}