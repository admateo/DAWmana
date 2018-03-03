let escribirEnDOM = function(data){	
	$.each( data, function( key, value ) {
		$("section").append("<article class='carteles'><p><a href='"+value.cartel+"' data-lightbox='roadtrip'>"+
							"<img src='"+value.cartel+"'></a></p>"+
							"<p><span>"+value.nombre+"</span></p>"+
							"</article>");
	});
}

let initCarteles = function(){
	$.getJSON("php/actividades.php?carteles").done(escribirEnDOM);
}