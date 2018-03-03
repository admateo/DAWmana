	let ventanaActual, $contenedor;
	let animacionCartel = function(){
    	if(sessionStorage.cartel === "true"){
    		mostrarPagina();
		}else{
			$("#contenedorCartel").removeClass("ocultarPagina");
			$("#cartel").effect("slide", 3000).toggle("explode", 1000, mostrarPagina);
		}
	}

 	let cargarPagina = function(object){
 		if(ventanaActual != object.attr("id")+".html"){
 			ventanaActual = object.attr("id")+".html";
	 		$contenedor.hide("drop", 600);
	 		setTimeout(function(){
	 			$.get(object.attr("id")+".html", function( data ) {
	  				$contenedor.html( data );
	  				cargarInit(object.attr('id'));
				});
	 			$contenedor.show("drop", 600);
	 		}, 500);
 		}
 	}

 	let cargarInit = function(pagina){
 		switch(pagina){
			case 'login':
 				return initLogin();
 			case 'inicio':
 				return initInicio();
 			case 'registro':
 				return initRegistro();
 			case 'ponentes':
 				return initPonentes();
 			case 'carteles':
 				return initCarteles();
 		}
 	}

 	let mostrarPagina = function(){
		$("header").removeClass("ocultarPagina");
		$("footer").removeClass("ocultarPagina");
		sessionStorage.cartel = "true";
		cargarPagina($("#inicio"));
	}

	$(function(){
		$contenedor = $("main");
		animacionCartel();
		$("header>ul").children().on("click", function(){
			cargarPagina($(this));
		});	
	});
