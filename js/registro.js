let validarRegistro = function(){
	let REGEXPNOMBRE = /^([a-zA-ZÀ-ÿ]{3,}\s*)+$/i;
	let REGEXPAPELLIDO = /^([a-zA-ZÀ-ÿ]{3,}\s[a-zA-ZÀ-ÿ]{3,})+$/i;
	let REGEXPEMAIL = /^(\w+)(@{1})(\w+)(\.{1})(\w+)$/;

	validarCampos(REGEXPNOMBRE, $("#nombre"), $("#errorNombre"));
	validarCampos(REGEXPAPELLIDO, $("#apellidos"), $("#errorApellidos"));
	validarCampos(REGEXPEMAIL, $("#email"), $("#errorEmail"));
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

let validarCampos = function(regExp, $valor, $variableError){
	if(!regExp.test($valor.val().trim())){
		$variableError.html("* Comprueba los datos.").effect("slide", 1500);
	}else{
		$variableError.text("*");
	}
}

let validarDni = function(){
	let $dni = $("#dni"), $errorDni = $("#errorDni");
	let LETRASDNI = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
	let REGEXPDNI = /^(\d{8})(\s?|\-?)([TRWAGMYFPDXBNJZSQVHLCKET])$/i;
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

let initRegistro = function(){	
	$("#registrarse").on("click", validarRegistro);
}
