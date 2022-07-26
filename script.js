class Paquete {
  constructor(destino, hotel, habitacion, noches){
    this.destino = destino
    this.hotel = hotel
    this.habitacion= habitacion
    this.noches= noches
  }
}

let paquetes= []

if(localStorage.getItem("paquetes")){
  paquetes = JSON.parse(localStorage.getItem("paquetes"))
}else{
  localStorage.setItem("paquetes", JSON.stringify("paquetes"))
}

const formPaquetes= document.getElementById("formPaquetes")
const divPaquetes= document.getElementById("divPaquetes")
const botonPaquetes = document.getElementById("botonPaquetes")

formPaquetes.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(e.target)
  let datForm = new FormData(e.target)

  let paquete = new Paquete(datForm.get("destino"), datForm.get("hotel"), datForm.get("habitacion"),datForm.get("noches") )
 paquetes.push(paquete)
 console.log(paquetes)
 localStorage.setItem('paquetes', JSON.stringify(paquetes))
  formPaquetes.reset()

})

botonPaquetes.addEventListener("click", () =>{
  let miArray = JSON.parse(localStorage.getItem("paquetes"))
  divPaquetes.innerHTML = ""
  miArray.forEach((paquete, indice) => {

    divPaquetes.innerHTML += `
    <div class="card border-secondary mb-3" id="paquete${indice}" style="max-width: 20rem; margin: 4px">
      <div class="card-header"><h2>${paquete.destino}</h2></div>
      <div class="card-body">
      <p class="card-title ">Hotel: ${paquete.hotel}</p>
      <p class="card-text ">Habitacion: ${paquete.habitacion}</p>
      <p class="card-text ">Noches: ${paquete.noches}</p>
      <button class="btn btn-primary">Eliminar</button>
      </div>
    </div>
    `
  })

  miArray.forEach((paquete, indice) =>{
    let botonCard = document.getElementById(`paquete${indice}`).lastElementChild.lastElementChild
    botonCard.addEventListener("click", () => {
      document.getElementById(`paquete${indice}`).remove()
      paquetes.splice(indice, 1)
      localStorage.setItem("paquetes", JSON.stringify(paquetes))
    console.log(`${paquete.destino} Eliminada`)
  })
})

})