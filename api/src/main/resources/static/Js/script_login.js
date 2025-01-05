const usuario = document.getElementById('usuario');
const contraseña = document.getElementById('contraseña');
const loginButton = document.getElementById('login-button');

if (loginButton){
    loginButton.addEventListener('click',(e) => {
        e.preventDefault();


        const logindata = {
            usuario: usuario.value, 
            contraseña: contraseña.value
        };

        console.log("Datos login",logindata);

    });
}