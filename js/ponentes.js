let escribirPonentesDOM = function(data){	
	$.each( data, function( key, value ) {
		$("section").append("<article><p><a href='"+value.Imagen+"' data-lightbox='roadtrip'><img src='"+value.Imagen+"'></a></p>"+
							"<p><span>Ponente:</span> "+value.Ponente+".</p>"+
							"<p><span>Empresa:</span> "+value.Empresa+".</p></article>");
	});	
}

let initPonentes = function(){
	$.getJSON("php/actividades.php?ponentes").done(escribirPonentesDOM);
}