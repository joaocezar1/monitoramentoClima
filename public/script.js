
const apiFlagsURL= 'https://flagsapi.com/'//url parcial, após a barra vem 2 letras com o país e depois fecha com "/flat/64.png"
//tags
const cidadeInput = document.querySelector("#input-cidade")
const btn = document.querySelector("#pesquisar") 
const dadosClima = document.querySelector('.dados-clima')
const cidade = document.querySelector("#cidade")
const pais = document.querySelector("#pais")
const temp = document.querySelector("#temp")
const condicoes = document.querySelector("#condicoes")
const iconeTempo = document.querySelector("#icone-tempo")
const umidade = document.querySelector("#umidade span")
const velVentos = document.querySelector("#velVentos span")

//func
const puxarDadosClima = async (cidadePesq) => {
    const res = await fetch(`/clima/${cidadePesq}`);
    const data = await res.json();
    console.log(data);
    return data
};

const mostrarDiv = async (cidadePesq)=>{
    
    dadosClima.style.display="block"
    const data = await puxarDadosClima(cidadePesq)
    cidade.innerHTML = data.name
    temp.innerHTML = Math.round(data.main.temp);
    const condicoesApi = data.weather[0].description
    condicoes.innerHTML = (condicoesApi.charAt(0).toUpperCase() + condicoesApi.slice(1)) //Deixa a primeira letra maiúscula  
    pais.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
    iconeTempo.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    umidade.innerHTML=(data.main.humidity +'%')
    velVentos.innerHTML=(data.wind.speed+ 'km/h')
}

//eventos
btn.addEventListener("click", (e)=>{
    e.preventDefault()
    cidadePesq = cidadeInput.value
    mostrarDiv(cidadePesq)
})

