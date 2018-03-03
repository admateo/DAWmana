let obtenerDato = function(){
	//Recogemos el id del tab pulsado que es el día del que vamos a mostrar la información
	let dia = this.id;

	switch (dia) {
		case "Martes":
			escribirDatos($("#martes"), dia);
			break;
		case "Miercoles":
			escribirDatos($("#miercoles"), dia);
			break;
		case "Jueves":
			escribirDatos($("#jueves"), dia);
			break;
		case "Viernes":
			escribirDatos($("#viernes"), dia);
			break;		
	}
}

let escribirDatos = function($div, dia){
	$.getJSON("php/actividades.php?dia="+dia, function(data) {

		$.each( data, function( key, value ) {
				$div.append("<article>"+
								"<img src='"+value.Imagen+"'>"+
								"<div><p><h2>"+value.Nombre+"</h2></p>"+
								"<p><span>Ü</span> "+value.Ponente+"</p>"+
								"<p><span>[</span> "+value.Hora+"</p>"+
								"<p><span>Ý</span> "+value.Empresa+"</p></div>"+
							"</article>");
		});
 	});
}

let initInicio = function(){
	escribirDatos($("#lunes"), "Lunes");

	$( "#tabs" ).tabs();
	$( document ).tooltip();

    $("#tabs ul li").one("click", obtenerDato);
}

