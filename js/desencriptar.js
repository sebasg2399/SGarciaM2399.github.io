let strings = "";
const inputs = document.querySelectorAll("input[type=number]");
const button = document.getElementById('f')

document.getElementById("inputfile").addEventListener("change", function () {
  var fr = new FileReader();

  fr.onload = function () {
    strings = fr.result.split(" ");
    inputs.forEach(input=>{
        input.disabled = false
    })
  };
  
  fr.readAsText(this.files[0]);
});


button.addEventListener('click',()=>{
  let key0 = document.getElementById("key0");
  let key1 = document.getElementById("key1");
  if (key1.value != "" && key0.value != "") {
    archivo_desencriptado = strings
      .map((palabra) => desencriptar(palabra, [Number(key0.value),Number(key1.value)]))
      .join(" ");
    console.log(archivo_desencriptado);
    download('output.txt',archivo_desencriptado)
  }
})

const desencriptar = (target, key) => {
  const letras = target.split("");
  return letras
    .map((letra) => {
      const cod = letra.charCodeAt(0);
      const pow = BigInt(cod) ** BigInt(key[1]);
      return String.fromCharCode(Number(pow % BigInt(key[0])));
    })
    .join("");
};

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}