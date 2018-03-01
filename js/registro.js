{
	let $nombre;
	let $errorNombre;
	let $apellido;
	let $errorApellido;
	let $dni;
	let $errorDni;
	let $email;
	let $errorEmail;
	const REGEXPNOMBRE = /^([a-zA-ZÀ-ÿ]{3,}\s*)+$/i;
	const REGEXPAPELLIDO = /^([a-zA-ZÀ-ÿ]{3,}\s[a-zA-ZÀ-ÿ]{3,})+$/i;
	const REGEXPEMAIL = /^(\w+)(@{1})(\w+)(\.{1})(\w+)$/;
	const REGEXPDNI = /^(\d{8})(\s?|\-?)([TRWAGMYFPDXBNJZSQVHLCKET])$/i;
	const LETRASDNI = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];

	$(function(){
		$("#inicio").on("click", inicio);
		$("#ponentes").on("click", ponentes);
		$("#login").on("click", login);
		$("#carteles").on("click", carteles);

		$nombre = $("#nombre");
		$errorNombre = $("#errorNombre");
		
		$apellidos = $("#apellidos");
		$errorApellidos = $("#errorApellidos");
		
		$dni = $("#dni");
		$errorDni = $("#errorDni");

		$email = $("#email");
		$errorEmail = $("#errorEmail");
		
		$("#registrarse").on("click", validarRegistro);
	});

	function validarRegistro(){
		validarRegExp(REGEXPNOMBRE, $nombre, $errorNombre);
		validarRegExp(REGEXPAPELLIDO, $apellidos, $errorApellidos);
		validarRegExp(REGEXPEMAIL, $email, $errorEmail);
		validarDni();

		if($("#formulario>div>i").text() === "****"){
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

	function validarRegExp(regExp, $valor, $variableError){
		if(!regExp.test($valor.val().trim())){
			$variableError.html("* Comprueba los datos.").effect("slide", 1500);
		}else{
			$variableError.text("*");
		}
	}

	function validarDni(){
		if(REGEXPDNI.test($dni.val().trim())){
			let grupos = $dni.val().trim().match(REGEXPDNI);
			let numero = grupos[1];
			let letra = grupos[3];

			if (letra.toUpperCase() === LETRASDNI[numero%23]) {
				$errorDni.text("*");
			}else{
				$errorDni.text("* Letra incorrecta.").effect("slide", 1500);
			}
		}else{
			$errorDni.text("* DNI invalido.").effect("slide", 1500);
		}
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

	function carteles(){
		$("body").hide("drop", 700, function(){
			$.get("carteles.html", function(data) {
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