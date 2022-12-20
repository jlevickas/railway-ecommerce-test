const socket = io();

//----------------------------------- PRODUCTOS --------------------------------

const addProductForm = document.getElementById('addProductForm')
addProductForm.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: addProductForm[ 0 ].value,
        price: addProductForm[ 1 ].value,
        thumbnail: addProductForm[ 2 ].value
    }
    socket.emit('update', producto);
    addProductForm.reset()
})

socket.on('productos', async productos => {
    addProductsToDOM(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
    const mockProducts = await fetch(`${window.location.href}api/productos-test`)
    const mockProductsJson = await mockProducts.json()

    addMockProductsToDOM(mockProductsJson).then(html => {
        document.getElementById('productos-test').innerHTML = html
    }
    )
});

async function addProductsToDOM(productos) {
    const respuesta = await fetch('plantillas/tabla-productos.hbs');
    const plantilla = await respuesta.text();
    const template = Handlebars.compile(plantilla);
    const html = template({ productos });
    return html;
}

async function addMockProductsToDOM(productos) {
    const respuesta = await fetch('plantillas/tabla-productos-test.hbs');
    const plantilla = await respuesta.text();
    const template = Handlebars.compile(plantilla);
    const html = template({ productos });
    return html;
}



//----------------------------------- MENSAJES --------------------------------

const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const schemaMensaje = new normalizr.schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })
const schemaMensajes = new normalizr.schema.Entity('posts', { mensajes: [ schemaMensaje ] }, { idAttribute: 'id' })

const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const messageForm = document.getElementById('messageForm')
messageForm.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        author: {
            email: inputUsername.value,
            nombre: document.getElementById('firstname').value,
            apellido: document.getElementById('lastname').value,
            edad: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: inputMensaje.value
    }

    socket.emit('nuevoMensaje', mensaje);
    messageForm.reset()
    inputMensaje.focus()
})

socket.on('mensajes', normalizedMessages => {

    let normalizedMessagesSize = JSON.stringify(normalizedMessages).length

    let denormalizedMessages = normalizr.denormalize(normalizedMessages.result, schemaMensajes, normalizedMessages.entities)

    let denormalizedMessagesSize = JSON.stringify(denormalizedMessages).length

    let compressionPercentage = parseInt((normalizedMessagesSize * 100) / denormalizedMessagesSize)
    document.getElementById('compression-info').innerText = compressionPercentage

    const html = writeMessageInHtml(denormalizedMessages.mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function writeMessageInHtml(mensajes) {
    return mensajes.map(mensaje => {
        return (`
        <div>
            <b style="color:blue;">${mensaje.data.author.email}</b>
            [<span style="color:brown;">${mensaje.data.fyh}</span>] :
            <i style="color:green;">${mensaje.data.text}</i>
            <img width="50" src="${mensaje.data.author.avatar}" alt=" ">
        </div>
    `)
    }).join(" ");
}

//----------------------------------- USER --------------------------------
(async () => {
    const loggedUser = await fetch(`${window.location.href}logged-user`);
    const loggedUserText = await loggedUser.text();
  
    if (!loggedUserText) return;
  
    const respuesta = await fetch("plantillas/logout-banner.hbs");
    const plantilla = await respuesta.text();
    const template = Handlebars.compile(plantilla);
    const html = template({ username: loggedUserText });
  
    document.getElementById("logout-banner").innerHTML = html;
  })();