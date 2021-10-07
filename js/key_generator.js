const is_Primo = (number) => {
  for (let i = 2; i < number; i++) if (number % i === 0) return false;
  return number > 1;
};
const mcd = (x, y) => {
  while (y != 0) {
    [x, y] = [y, x % y];
  }
  return x;
};
const is_coprime = (x, y) => {
  return mcd(x, y) == 1;
};
const public_key = (n, phi) => {
    const listofpossiblekeys = []
  for (let i = 2; i < phi; i++) {
    if (is_coprime(i, n) && is_coprime(i, phi)) {
      listofpossiblekeys.push(i)
    }
  }
  const randindex = Math.floor(Math.random()*listofpossiblekeys.length)
  return listofpossiblekeys[randindex]
};
function ExtendedEuclidAlgo(a, b)
{
     
    if (a == 0)
    {
        return [b, 0, 1];
    }
    else
    {
         
        let x1 = 1, y1 = 1;
        let gcdy = ExtendedEuclidAlgo(b % a, a);
        let gcd = gcdy[0];
        x1 = gcdy[1];
        y1 = gcdy[2];
 
        let y = x1;
        let x = y1 - Math.floor(b / a) * x1;
 
        return [gcd, x, y];
    }
}
 
function linearCongruence(A, B, N)
{
    A = A % N;
    B = B % N;
     
    let u = 0, v = 0;
 
    let person = ExtendedEuclidAlgo(A, N);
    let d = person[0];
    u = person[1];
    v = person[2];
 
    if (B % d != 0)
    {
        console.error('No se encontro respuestas')
        return;
    }
 
    let x0 = (u * (B / d)) % N;
    if (x0 < 0)
        x0 += N;
    const listofanswers = []
    for(let i = 0; i <= d - 1; i++)
    {
        let an = (x0 + i * (N / d)) % N;
        listofanswers.push(an)
    }
    const randindex = Math.floor(Math.random()*listofanswers.length)
    return listofanswers[randindex]
}
 


const p_number = document.getElementById("p");
const q_number = document.getElementById("q");
const n_number = document.getElementById("n_number");
const phi_euler = document.getElementById("phi_euler");
const public_key_html = document.getElementById("public_key")
const private_key_html = document.getElementById("private_key")
const verify_button = document.getElementById("verify");
verify_button.addEventListener("click", (e) => {
  const p = Number(p_number.value);
  const q = Number(q_number.value);
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  if (is_Primo(p) && is_Primo(q)) {
    alert("Numeros correctos.. Generando");
    n_number.innerText = `El numero N para estos numeros es igual a ${n}`;
    phi_euler.innerText = `El numero phi de euler para estos numeros es igual a ${phi}`;
    const e = public_key(n,phi)
    let d = e
    while(e==d){
        d = linearCongruence(e,1,phi)
    }
    public_key_html.innerText = `La llave publica es (${n} , ${e})`
    private_key_html.innerText = `La llave privada es (${n} , ${d})`
  } else {
    alert("Numeros incorrectos.. Ingresar numeros primos diferentes!");
  }
});
  