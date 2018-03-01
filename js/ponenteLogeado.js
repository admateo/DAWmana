{
	let $nombre;
	let $errorNombre;
	let $apellidos;
	let $errorApellidos;
	let $empresa;
	let $errorEmpresa;

	let $actividad;
	let $errorActividad;
	let $descBreve;
	let $errorDescBreve;
	let $descExtensa;
	let $errorDescExtensa;
	let $imagen;
	let $errorImagen;
	let $materialPonente;
	let $materialAsistente;
	let $numAsistentes;
	let $errorNumAsistentes;

	const REGEXPNOMBRE = /^([a-zA-ZÀ-ÿ]{3,}\s*)+$/i;
	const REGEXPACTIVIDAD = /^([a-zA-ZÀ-ÿ]+\s*)+$/i;
	const REGEXPDESCBREVE = /^(.){20,40}$/i;
	const REGEXPDESCEXTENSA = /^(.){40,}$/i;
	const REGEXPAPELLIDOS = /^([a-zA-ZÀ-ÿ]{3,}\s[a-zA-ZÀ-ÿ]{3,})+$/i;
	const REGEXPNUMEROS = /^\d+$/;
	const REGEXPURLIMAGEN = /^([A-z\.\-+\d])+(\.|\-)*\.(jpg|jpeg|png)$/;

	$(function(){
		let $patrocinio = $("#patrocinio");
		let $fechaDesde = $("#fechaDesde");
		let $fechaHasta = $("#fechaHasta");
		let $observaciones = $("#observaciones");	
		$nombre = $("#nombre");
		$errorNombre = $("#errorNombre");
		$apellidos = $("#apellidos");
		$errorApellidos = $("#errorApellidos");
		$empresa = $("#empresa");
		$errorEmpresa = $("#errorEmpresa");

		$actividad = $("#actividad");
		$errorActividad = $("#errorActividad");
		$descBreve = $("#descBreve");
		$errorDescBreve = $("#errorDescBreve");
		$descExtensa = $("#descExtensa");
		$errorDescExtensa = $("#errorDescExtensa");
		$imagen = $("#imagen");
		$errorImagen = $("#errorImagen");
		$materialPonente = $("#materialPonente");
		$materialAsistente = $("#materialAsistente");
		$numAsistentes = $("#numAsistentes");
		$errorNumAsistentes = $("#errorNumAsistentes");

		$("#actualizar").on("click", validarActualizarDatos);
		$("#registrar").on("click", validarRegistroActividad);
		$("#cerrar_sesion").on("click", cerrarSesion);

		$( "#tabs" ).tabs();
		$.datepicker.setDefaults($.datepicker.regional["es"]);
		let dateFormat = "dd/mm/yy",
	  		from = $( "#fechaDesde" ).datepicker({
	        	changeMonth: true,
	        	numberOfMonths: 1,
	        	minDate: "29/01/2018",
	        	maxDate: "02/02/2018" 
	   		}).on( "change", function() {
	   			to.datepicker( "option", "minDate", getDate( this ));
	 		}),
	    	to = $( "#fechaHasta" ).datepicker({
		        changeMonth: true,
		        numberOfMonths: 1,
		        minDate: "29/01/2018",
		        maxDate: "02/02/2018" 
	  		}).on( "change", function() {
	    		from.datepicker( "option", "maxDate", getDate( this ) );
			});
			function getDate( element ) {
				let date;
				try {
					date = $.datepicker.parseDate( dateFormat, $(element).val() );
				} catch( error ) {
					date = null;
				}
				if($(element).attr("id") === "fechaDesde"){
					$fechaDesde = date;
				}else{
					$fechaHasta = date;
				}
				return date;
			}

		$.getJSON("php/actividades.php?login", function(data) {
			$.each( data, function( key, value ) {
				if(value.Usuario === sessionStorage.usuario){
					$nombre.val(value.Nombre);
					$apellidos.val(value.Apellidos);
					$empresa.val(value.Empresa);
					$patrocinio.prop("checked", value.Patrocinio);
					$patrocinio.val(value.Patrocinio);
					$fechaDesde.val(value.FechaDesde);
					$fechaHasta.val(value.FechaHasta);
					$observaciones.val(value.Observaciones);
				}
 			});
		});
	});

	function validarRegExp(regExp, $valor, $variableError){
		if(!regExp.test($valor.val().trim())){
			$variableError.html("* Comprueba los datos.").effect("slide", 1500);
		}else{
			$variableError.text("*");
		}
	}

	function validarActualizarDatos(){
		validarRegExp(REGEXPNOMBRE, $nombre, $errorNombre);
		validarRegExp(REGEXPAPELLIDOS, $apellidos, $errorApellidos);
		validarRegExp(REGEXPNOMBRE, $empresa, $errorEmpresa);
	
		if($errorNombre.text().length < 3 && $errorApellidos.text().length < 3 && $errorEmpresa.text().length < 3){
			$( "#dialog-message" ).dialog({
				modal: true,
		    	buttons: {
		    		Aceptar: function() {
		     			$( this ).dialog( "close" );
		    		}
		   		}
		  	}).effect("bounce", 500);
		}
	}

	function validarRegistroActividad(){
		validarRegExp(REGEXPACTIVIDAD, $actividad, $errorActividad);
		validarRegExp(REGEXPDESCBREVE, $descBreve, $errorDescBreve);
		validarRegExp(REGEXPDESCEXTENSA, $descExtensa, $errorDescExtensa);
		validarRegExp(REGEXPNUMEROS, $numAsistentes, $errorNumAsistentes);
		validarRegExp(REGEXPURLIMAGEN, $imagen, $errorImagen);
	
		if($errorActividad.text().length < 3 && $errorDescBreve.text().length < 3 && $errorDescExtensa.text().length < 3 && $errorNumAsistentes.text().length < 3&& $errorImagen.text().length < 3){
			$( "#dialog-message-actividad" ).dialog({
				modal: true,
		    	buttons: {
		    		Aceptar: function() {
		     			$( this ).dialog( "close" );
		    		}
		   		}
		  	}).effect("bounce", 500);
		}else{
			window.scrollTo(0,0);
		}
	}

	function cerrarSesion(){
		sessionStorage.removeItem("usuario");
		$("body").hide("drop", 700, function(){
			$.get("index.html", function(data) {
				$("body").html(data);
			});
		}).show("drop", 700);
	}
}