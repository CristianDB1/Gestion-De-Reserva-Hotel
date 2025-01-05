document.addEventListener('DOMContentLoaded', () => {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const Contraseña2 = document.getElementById('Contraseña2');
    const registerButton = document.getElementById('register-button');

    if (registerButton) {
        registerButton.addEventListener('click', (e) => {
            e.preventDefault();

            const registerData = {
                nombre: nombre.value,
                email: email.value,
                Contraseña2: Contraseña2.value
            };

            console.log("Datos del Registro:", registerData);

        });
    }
});
