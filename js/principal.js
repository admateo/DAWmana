{
	$(function(){
		if(sessionStorage.cartel === "true"){
			mostrarPagina();
			$("#cartel").addClass("ocultarPagina");
		}else{
			$("#cartel").effect("slide", 3000).toggle("explode", 1000, mostrarPagina);
		}
		
		escribirEnDOM($("#lunes"), "Lunes");

		$( "#tabs" ).tabs();

	    $("#tabs ul li").one("click", obtenerDato);

		$("#ponentes").on("click", ponentes);
		$("#registro").on("click", registro);
		$("#login").on("click", login);
		$("#carteles").on("click", carteles);

	});

	function obtenerDato(){
		//Recogemos el id del tab pulsado que es el día del que vamos a mostrar la información
		let dia = this.id;

		switch (dia) {
			case "Martes":
				escribirEnDOM($("#martes"), dia);
				break;
			case "Miercoles":
				escribirEnDOM($("#miercoles"), dia);
				break;
			case "Jueves":
				escribirEnDOM($("#jueves"), dia);
				break;
			case "Viernes":
				escribirEnDOM($("#viernes"), dia);
				break;		
		}
	}

	function escribirEnDOM($div, dia){
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

	function ponentes(){
		$("body").hide("drop", 700, function(){
			$.get("ponentes.html", function(data) {
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

	function mostrarPagina(){
		$("header").removeClass("ocultarPagina");
		$("#tabs").removeClass("ocultarPagina");
		$("footer").removeClass("ocultarPagina");
		sessionStorage.cartel = "true";
	}

}
