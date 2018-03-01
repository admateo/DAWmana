{
	$(function(){
		$.getJSON("php/actividades.php?carteles").done(escribirEnDOM);

		$("#inicio").on("click", inicio);
		$("#registro").on("click", registro);
		$("#login").on("click", login);
		$("#ponentes").on("click", ponentes);
	});

	function escribirEnDOM(data){	
		$.each( data, function( key, value ) {
			$("section").append("<article><p><a href='"+value.cartel+"' data-lightbox='roadtrip'>"+
								"<img src='"+value.cartel+"'></a></p>"+
								"<p><span>"+value.nombre+"</span></p>"+
								"</article>");
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

	function ponentes(){
		$("body").hide("drop", 700, function(){
			$.get("ponentes.html", function(data) {
				$("body").html(data);
			});
		}).show("drop", 700);
	}
}