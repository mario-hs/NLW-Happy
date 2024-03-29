//create map
const map = L.map('mapid').setView([-27.2058303,-49.6232161], 15);

// create and add titleLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

// create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
})

let marker;

// CREATE AND MARKER
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remover icon
    marker && map.removeLayer(marker)


    // add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

// adicionar o campo de fotos
function addPhotoField(){
    // pegar o container de fotos #images
    const container = document.querySelector('#images')
    // pegar o container para duplicar .new-images
    const fieldsContainer = document.querySelectorAll('.new-upload')
    // realizar o clone da última imagem adicionanda
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    // verificar se o campo está vazio, se sim , não adicionar ao container de imagens
    const input = newFieldContainer.children[0]

    if(input.value == ""){
        return
    }

    // limpar o campos antes de adicionar ao container de imagens
    input.value = ""
    
    // adicionar o clono ao container de #images
    container.appendChild(newFieldContainer)
}

function deleteField(event){
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')
    
    if(fieldsContainer.length < 2){
        // limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // deletar o campo
    span.parentNode.remove();

}

// troca do sim e não
function toggleSelect(event){
    // retirar a class .active (dos botões)
    document.querySelectorAll('.button-select button')
    .forEach( function(button) {
        button.classList.remove('active')
    })
    // colocar a class .active nesse botão clicado 
    const button = event.currentTarget
    button.classList.add('active')

    console.log()

    // atualizar o meu input hidden com o valor selecionado 
    const input = document.querySelector('[name="open_on_weekends"]')
    
    input.value = button.dataset.value

    console.log(input.value)
}

function validate(event){
    // tem que fazer a validação de needsLatAndLng para trocar quando for verdadeiro ou falso
    const needsLatAndLng = false;
    if(needsLatAndLng){
        event.preventDefault()
        alert('Selecione um ponto no mapa')
    }
    
}