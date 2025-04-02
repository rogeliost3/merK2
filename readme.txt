hay que instalar pug, npm install pug

crear el index.js
...
crear el router.js principal con las principales rutas
...
crear los routerDeClasesDeBD con sus rutas dependientes de /
exportamos los routerDeClasesDeBD
poner en el router principal router.use("/ruta_la_que_sea", routerDeClasesDeBD); para cada subrouter de routerDeClasesDeBD

en controllers crear un claseController.js
añadir las funciones CRUD create, remove, update, delete
    function remove(req,res) {
        res.send("Modificado");
    }

exportar funciones CRUD de la forma (no es obligatorio y puede que no funcione!)
export const functions {
    func1
    func2
    func3
}
export default functions;
para luego acceder en el otro lado con functions.func1, etc, como si fuera un objeto

ó 
export  { fun1,fun2,fun3}

en routerDeClasesDeBD importar las clases de ../controllers/routerDeClasesDeBD 

empezamos a crear vistas con pug
en la carpeta views crear layout.pug
copiar y pegar algun layout y adaptarlo:
html
    head
        title
        block styles
    body
        block content
        #footer
            p some footer content

crear navbar.pug
header
    nav
        ul
            li
                a(href="/") Home
            li
                a(href="/stand") Stands
            li
                a(href="/products") products

incluir el header en el layout.pug que quedaria asi:
html
    head
        title
        block styles
    body
        include navbar.pug //-AÑADIMOS AQUI
        block content
        #footer
            p some footer content

crear una carpeta stand para los Stands, en views
crear los create, edit , list y show.pug

abrir edit.pug por ejemplo:
extends ../layout
block content  
    h1 Stands
    ul
        li Stand 1
        li Stand 2
        li Stand 3
y asi con todos las views

en standController, en vez de enviar un mensaje, enviar la pagina

function getByID(req,res) {
    const id =req.params.id;
    res.render("stand/show",{standId:id}) <<- añadiendo standId desde el pug tenemos acceso al id
}

en app.set("views","src/views") <<- cambiarlo porque sino falla AQUI

en la vista create creamos un formulario
extends ../layout
block content
    h1 New Stand
    form(action="/stand", method="post")
        label (for="name") Name
        input(id="name", type="text", name="name")
        label(for="size") size
        select#size(name="size")
            option(value="small") Small
            option(value="medium") Medium
            option(value="large") large
        button Submit

cambiar en el router la funcion de crear el stand, que no es lo mismo que mostrar el formulario para crear el stand
para ello creamos una nuea ruta en standRouter que apunte a createForm del controlador

// crear un stand
router.get ("/new", standController.createForm) => {
    res.send("Creamos un stand");
}

y en el controlador crear el metodo createForm

luego de crear un stand si queremos que nos redirija a una lista de todos los stands o al stand creado:
function create(req,res) {
    res.redirect("/stand");
}

tambien tenemos un input y un select, para sacar esa informacion y tratarla
function create(req,res) {
    const name=req.body.name;
    const size=req.body.size;

    //alternativa a lo anterior:
    const {name,size} = req.body //desestructura el req.body, y solo cogemos el name y el size

    console.log("name: "+name+" size: "+size)

    res.redirect("/stand");
}

SQL
plugin de docker de microsoft para usar docker con SQL
el backend no esta aun en docker, la proxima semana docerizaremos el backend

instalar mysql2
npm install sql2 <<-- sisi, es "sql2"

crear capeta config dentro de src
crear archivo mysql.js
crear funcion asincrona getConnection

import mysql from 'mysql2/promise';

async function getConnection () {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '1234', <<-- o 714748
        database: 'merk2'
    });
    return connection
}

la exportamos
export {getConnection}

probar la conexion 
function testConnection
try {
    const c=await getConnection();
    log "ok"
    connection.end();
} catch {e} {
    log"error"+e
}


para descargar los cambios nuevos de daniel hacer un pull request en github del repo de daniel contra mi repo


el modelo actual es:
    mysql y bd en docker :3307
    backend en localhost:3000

hacemos un primer modelo que con esta conexion nos devuelva unos datos

import {getConnection, testConnection} from "../config/mysql2.js";

//todas las funciones asincronas

const TABLE="stand";
async function getAll(){
    const query="SELECT * FROM "+TABLE;
    const connection= await getConnection();
    const [results,]=await connection.query(query);
    console.log("result: "+results);
    console.table(results);
    connection.end();
} 

getAll();

hacer un fork y añadir todos los que faltan y luego un pull request

configurar el .env que cuelga del raiz
DB_HOST=DB_HOST;
DB_USER=DB_USER;
DB_PASSWORD=DB_PASSWORD;
DB_PORT=DB_PORT;
DB_NAME=DB_NAME;

APP_PORT=3000;

actualizar los controladores, controllers/standControllers.js, ...
modificamos cada controlador con los nuevos metodos
los ponemos async  ya que son llamadas a las bases de datos
actualizamos los pug de cada cosa

abrir edit.pug por ejemplo:
extends ../layout
block content  
    h1 Stands
    secton(class="stand-list")
        if stands
            each stand in stands
                a(href="/stand/${stand.stand_id})
                    include standCard
        else
            there is no stand for that id
