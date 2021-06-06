let url="https://accounts.spotify.com/api/token";


let llave1 = "grant_type=client_credentials"
let llave2= "client_id=24c31a5f880e4d0088efc202ca33342f"
let llave3= "client_secret=65bede7978904c9f87329b183219a434";
let token = undefined;


let peticionPost ={
    method:"POST",
    headers:{"Content-Type": 'application/x-www-form-urlencoded'},
    body:`${llave1}&${llave2}&${llave3}&`
}


fetch(url,peticionPost)
    .then(function(respuesta){

        return (respuesta.json());

    })
    .then(function(datos){

        token = `${datos.token_type} ${datos.access_token}`;
        obtenerInformacion(token);  

    })


function obtenerInformacion(tokenAuthentification){

    let urlGet = "https://api.spotify.com/v1/artists/7Ln80lUS6He07XvHI8qqHH/top-tracks?market=US"
    
    let peticionGet = {
            method: "GET",
            headers: {Authorization:token}
    }
    
    fetch(urlGet,peticionGet)
        .then(function(respuesta){
            return(respuesta.json());
        })
        .then(function(datos){
            filtradoDatos(datos);
        })
    
    }

    function filtradoDatos(datos){
        let canciones = datos.tracks;
        let datoFiltrado = canciones.map(function(pista){
            return{
                nombre:pista.name,
                audio:pista.preview_url,
                foto:pista.album.images[0].url  
            }
        })
    
        impresionDatos(datoFiltrado);
    }

    function impresionDatos(datosFiltrados){
        let contenedorPadre = document.getElementById("contenedorPadre");
    
    
        datosFiltrados.map(function(pista){
    
    
            let contenedorCard = document.createElement("div");
            contenedorCard.classList.add("card", "w-50", "align-items-center", "d-inline-block", "bg-dark");
            

    
            let imgCard = document.createElement("img");
            imgCard.classList.add("card-img-top");
            imgCard.src = pista.foto;

    
            let bodyCard = document.createElement("div");
            bodyCard.classList.add("card-body");
    

    
            let tituloCancion = document.createElement("h5");
            tituloCancion.classList.add("card-title", "text-center", "textoCard");
            tituloCancion.textContent = pista.nombre;
    

    
            let audioCancion = document.createElement("audio");
            audioCancion.controls = true;
            audioCancion.src = pista.audio;
            audioCancion.classList.add("text-center");
    
    
            bodyCard.appendChild(audioCancion);
    
            bodyCard.appendChild(tituloCancion);
    
            contenedorCard.appendChild(bodyCard);
    
            contenedorCard.appendChild(imgCard);
    
            contenedorPadre.appendChild(contenedorCard);
        })
    }
    