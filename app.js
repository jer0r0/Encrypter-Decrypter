//funcion para cambiar el titulo de la pagina cada vez que el usuario se mueva de ella 
window.addEventListener("focus",()=>{
    document.title = " Encrypter & Decrypter"
})
let docTittle = document.title;  
window.addEventListener("blur",()=>{
    document.title = "Encr & Decr / Come back :("
})
  


//funcion para mostrar que el texto esta vacio.
function mostrarAviso(mensaje,duracion) {
    var aviso = document.getElementById("aviso");
    aviso.textContent=mensaje;
    aviso.style.display = "block";

    setTimeout(function(){
      aviso.style.display = "none";
    }, duracion);
  }


  function mostrarAviso2(mensaje,duracion) {
    var aviso = document.getElementById("aviso2");
    aviso.textContent=mensaje;
    aviso.style.display = "block";

    setTimeout(function(){
      aviso.style.display = "none";
    }, duracion);
  }
console.log(screen.width)
//establecer condiciones iniciales 
if(screen.width > 1100){
document.getElementById('outputText').style.background='no-repeat center/80% url(images/buscando.png)';
}

//cambiar los placeholders 

document.getElementById("outputText").placeholder = "Ningún mensaje fue encontrado";
document.getElementById("inputText").placeholder = "Ingrese el texto aquí";

//cambiar valor alerta de minusculas y mayusculas 
document.getElementById("alertaChar").textContent = 'Solo letras minusculas. Sin acentos y/o caracteres especiales.';

//Listener del boton de encriptar

document.getElementById('encryptButton').addEventListener('click', function () {
    var inputText = document.getElementById('inputText').value;
    validateText(inputText);
    if(inputText == ''){
        mostrarAviso('Por favor, ingresa texto antes de encriptar.',800);
        var encryptedText = encryptText(inputText);
        document.getElementById('copyButton').style.visibility='hidden';
        document.getElementById('outputText').placeholder = "Ningún mensaje fue encontrado";
        if(screen.width > 1100){
            document.getElementById('outputText').style.background='no-repeat center/80% url(images/buscando.png)';
        }else{
            document.getElementById('outputText').style.background='white';
        }
    }else{
        document.getElementById('copyButton').style.visibility='visible';
        document.getElementById('outputText').style.background='white';
    }
    
    var encryptedText = encryptText(inputText);
    document.getElementById('outputText').value = encryptedText;
});

//Listener del keypress del input text de encriptar

document.getElementById('inputText').addEventListener('keyup', function () {
    var inputText = document.getElementById('inputText').value;
    validateText(inputText);
    if(inputText == ''){
        //mostrarAviso('Por favor, ingresa texto antes de encriptar.',800);
        var encryptedText = encryptText(inputText);
        document.getElementById('copyButton').style.visibility='hidden';
        document.getElementById('outputText').placeholder = "Ningún mensaje fue encontrado";
        if(screen.width > 1100){
            document.getElementById('outputText').style.background='no-repeat center/80% url(images/buscando.png)';
        }else{
            document.getElementById('outputText').style.background='white';
        }
    }else{
        document.getElementById('copyButton').style.visibility='visible';
        document.getElementById('outputText').style.background='white';
    }
    
    var encryptedText = encryptText(inputText);
    document.getElementById('outputText').value = encryptedText;
});





//Listener del boton de desencriptar 

document.getElementById('decryptButton').addEventListener('click', function () {
    var encryptedText = document.getElementById('inputText').value;
    validateText(encryptedText);
    if(encryptedText == ''){
        mostrarAviso('Por favor, ingresa texto encriptado antes de desencriptar.',800);
        var decryptedText = decryptText(encryptedText);
        document.getElementById('copyButton').style.visibility='hidden';
        document.getElementById('outputText').placeholder = "Ningún mensaje fue encontrado";
        if(screen.width > 1100){
            document.getElementById('outputText').style.background='no-repeat center/80% url(images/buscando.png)';
        }else{
            document.getElementById('outputText').style.background='white';
        }
    }else{
        document.getElementById('copyButton').style.visibility='visible';
        document.getElementById('outputText').style.background='white';
    }
    var decryptedText = decryptText(encryptedText);
    document.getElementById('outputText').value = decryptedText;
});

//Listener del boton de copiar

document.getElementById('copyButton').addEventListener('click', function () {
    var outputText = document.getElementById('outputText').value.trim();
    if (outputText === '') {
        mostrarAviso('No hay texto para copiar.', 800); // 3000 milisegundos (3 segundos)
        return;
    }
    

    // Seleccionar el texto en el área de texto
    document.getElementById('outputText').select();
    document.getElementById('outputText').setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copiar el texto al portapapeles
    document.execCommand('copy');

    mostrarAviso2('Texto copiado al portapapeles.',800);
});

function containsSpecialCharacters(text) {
    const resulta = /[áéíóúüñÁÉÍÓÚÜÑ!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-=]/.test(text);
    return resulta;
}




function validateText(text){
    const containsUpperCase = /[A-Z]/.test(text);
    const containsSpecialChars = /[^\w\s]/g.test(text);
    if(containsSpecialChars || containsSpecialCharacters(text)){
        console.log('No se permiten acentos ni caracteres especiales.');
        mostrarAviso('El texto tiene caracteres especiales ', 2000);
        document.getElementById('outputText').placeholder = "El texto suministrado no cumple con las especificaciones";
        document.getElementById('copyButton').style.visibility='hidden';
        if(screen.width > 1100){
            document.getElementById('outputText').style.background='no-repeat center/80% url(images/SenorError.png)';
        }else{
            document.getElementById('outputText').style.background='white';
        }
        /*
        setTimeout(() => {
            document.getElementById("outputText").placeholder = "Ningún mensaje fue encontrado";
            document.getElementById('outputText').style.background='no-repeat center/80% url(images/buscando.png)';
            //document.getElementById('inputText').value = "";
        }, 2000);*/
        return false;
    }else if(containsUpperCase){
        console.log('No se permiten letras Mayusculas.');
        mostrarAviso('El texto contiene letras Mayusculas.', 2000);
        document.getElementById('copyButton').style.visibility='hidden';
        document.getElementById('outputText').style.background='no-repeat center/80% url(images/SenorError.png)';
        if(screen.width > 1100){
            document.getElementById('outputText').style.background='no-repeat center/80% url(images/SenorError.png)';
        }else{
            document.getElementById('outputText').style.background='white';
        }
        /*
        setTimeout(() => {
            document.getElementById('outputText').placeholder = "Ningún mensaje fue encontrado";
            document.getElementById('outputText').style.background='no-repeat center/80% url(images/buscando.png)';
            //document.getElementById('inputText').value = "";
        }, 2000);
        */
        return false;
    }else{
        //console.log("No los contiene");
        return true;
    }

}


function encryptText(text) {
    
    if(validateText(text)){
        const result = finallyEncrypt(text);
        return result;
    }else{
        return '';
    }
    /* return btoa(text)*/
}
function finallyEncrypt(inputText){
    const result = inputText
    .replace(/e/g,'enter')
    .replace(/i/g,'imes')
    .replace(/a/g,'ai')
    .replace(/o/g,'ober')
    .replace(/u/g,'ufat')
    ;

    return result;
}

function finallyDecrypt(inputText){
    let finalText = "";
    let vowels = {
        "a": 1,
        "e": 4,
        "i": 3,
        "o": 3,
        "u": 3
    }
    for (let i = 0; i < inputText.length; i++) {
        let skipCount = vowels[inputText[i]];
        
        let currentCharacter = inputText[i];
        console.log(currentCharacter)
        if (/^[a-z]$/.test(currentCharacter)) {    
            if (skipCount !== undefined) {
                finalText += currentCharacter;
                i += skipCount;
            } else {
                finalText += currentCharacter;
            }
        }
    }
    return finalText;
}
function decryptText(encryptedText) {
    if(validateText(encryptedText)){
        const result = finallyDecrypt(encryptedText);
        return result;
    }else{
        return '';
    }
    /*return atob(encryptedText);*/
}

