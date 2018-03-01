{
	let $usuario;
	let $errorUsuario;
	let $contrasena;
	let $errorContrasena;
	let $errorLogin;
	const REGEXPUSUARIO = /^(\w{6,})$/;
	const REGEXPCONTRASENA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@¡#·¬=^/{}\\.+¿!\[\]%*<>_?,;:\-&])([A-Za-z\d$@¡#·<>¬=^/{}\\.+¿!\[\]%*_?,;:\-&]|[^ ]){6,}$/;
	
	$(function(){
		$("#inicio").on("click", inicio);
		$("#ponentes").on("click", ponentes);
		$("#registro").on("click", registro);
		$("#carteles").on("click", carteles);

		$usuario = $(".usuario");
		$errorUsuario = $("#errorUsuario");
		
		$contrasena = $(".password");
		$errorContrasena = $("#errorContrasena");

		$errorLogin = $("#errorLogin");
		
		$("#logearse").on("click", validarLogin);
	});

	function validarLogin(){
		let usuarioValido = validarRegExp(REGEXPUSUARIO, $usuario, $errorUsuario);
		let contrasenaValida = validarRegExp(REGEXPCONTRASENA, $contrasena, $errorContrasena);

		if(usuarioValido && contrasenaValida){
			$.getJSON("php/actividades.php?login", function(data) {
				$.each( data, function( key, value ) {
					if(value.Usuario === $usuario.val() && value.Contraseña === $contrasena.val()){
						sessionStorage.usuario = $usuario.val();
						$("body").hide("drop", 700, function(){
							$.get("ponenteLogeado.html", function(data) {
								$("body").html(data);
							});
						}).show("drop", 700);
					}
	 			});
			});
			$errorLogin.css("display", "block").effect("slide", 1000);
		}
	}

	function validarRegExp(regExp, $valor, $variableError){
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

	function inicio(){	
		$("body").hide("drop", 700, function(){
			$.get("index.html", function(data) {
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

	function carteles(){
		$("body").hide("drop", 700, function(){
			$.get("carteles.html", function(data) {
				$("body").html(data);
			});
		}).show("drop", 700);
	}
}