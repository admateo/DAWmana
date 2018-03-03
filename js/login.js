let validarLogin = function(){
	let REGEXPUSUARIO = /^(\w{6,})$/;
	let REGEXPCONTRASENA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@¡#·¬=^/{}\\.+¿!\[\]%*<>_?,;:\-&])([A-Za-z\d$@¡#·<>¬=^/{}\\.+¿!\[\]%*_?,;:\-&]|[^ ]){6,}$/;
	let $usuario = $(".usuario");		
	let $contrasena = $(".password");

	let usuarioValido = validarLoginRegExp(REGEXPUSUARIO, $usuario, $("#errorUsuario"));
	let contrasenaValida = validarLoginRegExp(REGEXPCONTRASENA, $contrasena, $("#errorContrasena"));

	if(usuarioValido && contrasenaValida){
		$.getJSON("php/actividades.php?login", function(data) {
			$.each( data, function( key, value ) {
				if(value.Usuario === $usuario.val() && value.Contraseña === $contrasena.val()){
					sessionStorage.usuario = $usuario.val();
					$contenedor.hide("drop", 700, function(){
						$.get("ponenteLogeado.html", function(data) {
							$contenedor.html(data);
							initPonenteLogueado();
						});
						
					}).show("drop", 700);
				}
 			});
		});
		$("#errorLogin").css("display", "block").effect("slide", 1000);
	}
}

let validarLoginRegExp = function(regExp, $valor, $variableError){
	if($valor.val() !== undefined){
		if(!regExp.test($valor.val().trim())){
			$variableError.html("* Comprueba los datos.").effect("slide", 1500);
			return false;
		}else{
			$variableError.text("*");
			return true;
		}	
	}else{
		$variableError.html("* Comprueba los datos.").effect("slide", 1500);
		return false;
	}	
}

let initLogin = function(){	
	$("#loguearse").on("click", validarLogin);
}
