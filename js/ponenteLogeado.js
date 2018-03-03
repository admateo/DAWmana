	function validarRegExp(regExp, $valor, $variableError){
		if(!regExp.test($valor.val().trim())){
			$variableError.html("* Comprueba los datos.").effect("slide", 1500);
		}else{
			$variableError.text("*");
		}
	}

	function validarActualizarDatos(){
		let $errorNombre = $("#errorNombre");
		let $errorApellidos = $("#errorApellidos");
		let $errorEmpresa = $("#errorEmpresa");
		let REGEXPNOMBRE = /^([a-zA-ZÀ-ÿ]{3,}\s*)+$/i;
		let REGEXPAPELLIDOS = /^([a-zA-ZÀ-ÿ]{3,}\s[a-zA-ZÀ-ÿ]{3,})+$/i;

		validarRegExp(REGEXPNOMBRE, $("#nombre"), $errorNombre);
		validarRegExp(REGEXPAPELLIDOS, $("#apellidos"), $errorApellidos);
		validarRegExp(REGEXPNOMBRE, $("#empresa"), $errorEmpresa);
	
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
		let REGEXPACTIVIDAD = /^([a-zA-ZÀ-ÿ]+\s*)+$/i;
		let REGEXPDESCBREVE = /^(.){20,40}$/i;
		let REGEXPDESCEXTENSA = /^(.){40,}$/i;
		let REGEXPNUMEROS = /^\d+$/;
		let REGEXPURLIMAGEN = /^([A-z\.\-+\d])+(\.|\-)*\.(jpg|jpeg|png)$/;

		$errorActividad = $("#errorActividad");
		$errorDescBreve = $("#errorDescBreve");
		$errorDescExtensa = $("#errorDescExtensa");
		$errorNumAsistentes = $("#errorNumAsistentes");
		$errorImagen = $("#errorImagen");
		
		validarRegExp(REGEXPACTIVIDAD, $("#actividad"), $errorActividad);
		validarRegExp(REGEXPDESCBREVE, $("#descBreve"), $errorDescBreve);
		validarRegExp(REGEXPDESCEXTENSA, $("#descExtensa"), $errorDescExtensa);
		validarRegExp(REGEXPNUMEROS, $("#numAsistentes"), $errorNumAsistentes);
		validarRegExp(REGEXPURLIMAGEN, $("#imagen"), $errorImagen);
	
		if($errorActividad.text().length < 3 && $errorDescBreve.text().length < 3 && $errorDescExtensa.text().length < 3 && $errorNumAsistentes.text().length < 3&& $errorImagen.text().length < 3){
			$( "#dialog-message-actividad" ).dialog({
				modal: true,
		    	buttons: {
		    		Aceptar: function() {
		     			$( this ).dialog( "close" );
		    		}
		   		}
		  	}).effect("bounce", 500);
		}
	}

	let initPonenteLogueado = function(){
		$( "#tabs2" ).tabs();
		$("#actualizar").on("click", validarActualizarDatos);
		$("#registrar").on("click", validarRegistroActividad);

		$.datepicker.setDefaults($.datepicker.regional["es"]);
		let dateFormat = "dd/mm/yy",
	  		from = $( "#fechaDesde" ).datepicker({
	  			showAnim: "drop",
	        	changeMonth: true,
	        	numberOfMonths: 1,
	        	minDate: "29/01/2018",
	        	maxDate: "02/02/2018" 
	   		}).on( "change", function() {
	   			to.datepicker( "option", "minDate", $.datepicker.parseDate( dateFormat, $(this).val() ));
	 		}),
	    	to = $( "#fechaHasta" ).datepicker({
	    		showAnim: "drop",
		        changeMonth: true,
		        numberOfMonths: 1,
		        minDate: "29/01/2018",
		        maxDate: "02/02/2018" 
	  		}).on( "change", function() {
	    		from.datepicker( "option", "maxDate", $.datepicker.parseDate( dateFormat, $(this).val() ));
			});

		$.getJSON("php/actividades.php?login", function(data) {
			$.each( data, function( key, value ) {
				if(value.Usuario === sessionStorage.usuario){
					$("#nombre").val(value.Nombre);
					$("#apellidos").val(value.Apellidos);
					$("#empresa").val(value.Empresa);
					$("#patrocinio").prop("checked", value.Patrocinio);
					$("#fechaDesde").val(value.FechaDesde);
					$("#fechaHasta").val(value.FechaHasta);
					$("#observaciones").val(value.Observaciones);
				}
 			});
		});
	}
