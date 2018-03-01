{
	$(function(){
		$.getJSON("php/actividades.php?ponentes").done(escribirEnDOM);

		$("#inicio").on("click", inicio);
		$("#registro").on("click", registro);
		$("#login").on("click", login);
		$("#carteles").on("click", carteles);
	});

	function escribirEnDOM(data){	
		$.each( data, function( key, value ) {
			$("section").append("<article><p><a href='"+value.Imagen+"' data-lightbox='roadtrip'><img src='"+value.Imagen+"'></a></p>"+
								"<p><span>Ponente:</span> "+value.Ponente+".</p>"+
								"<p><span>Empresa:</span> "+value.Empresa+".</p></article>");
		});
		
	}

	function inicio(){	
		$("body").hide("drop", 700, function(){
			$.get("index.html", function(data) {
				$("body").html(data);
			});
		}).show("drop", 700);	
	}

	function login(){
		$("body").hide("drop", 700, function(){
			$.get("login.html", function(data) {
				$("body").html(data);
			});
		}).show("drop", 700);
	}

	function registro(){
		$("body").hide("drop", 700, function(){
			$.get("registro.html", function(data) {
				$("body").html(data);
			});
		}).show("drop", 700);
	}

	function carteles(){
		$("body").hide("drop", 700, function(){
			$.get("carteles.html", function(data) {
				$("body").html(data);
			});
		}).show("drop", 700);
	}

}