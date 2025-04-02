import {getConnection, testConnection} from "../config/mysql2.js";

//todas las funciones asincronas

const TABLE="stand";
async function getAll() {
    const query="SELECT * FROM "+TABLE;
    const connection= await getConnection();
    const [results,]=await connection.query(query);
    console.log("result: "+results);
    console.table(results);
    connection.end();
}

async function getByID(id) {

    //IMPORTANTE: id=? evita inyecciones de codigo
    const query="SELECT * FROM "+TABLE+" WHERE stand_id=?"; 
    const connection= await getConnection();
    const [results,]=await connection.query(query,[id]);
    console.log("result: "+results);
    console.table(results);
    connection.end();
}

async function remove(id) {
    const query="DELETE FROM "+TABLE+" WHERE stand_id=?"; 
    const connection= await getConnection();
    const [results,]=await connection.query(query,[id]);
    console.log("result: "+results);
    console.table(results);
    connection.end();
}

async function create(name,size,creation_date,category_id) {
    const query="INSERT INTO "+TABLE+" (name,size,creation_date,stand_category_id) VALUES (?,?,?,?)"; 
    const connection= await getConnection();
    const results=await connection.query(query,[name,size,creation_date,category_id]);
    console.log("result: "+results);
    console.table(results);
    connection.end();
}

async function update (name,size,creation_date,category_id,id) {
    const query="UPDATE "+TABLE+" SET name=?, size=?, creation_date=?, stand_category_id=? WHERE stand_id=?"
    const connection= await getConnection();
    const results=await connection.query(query,[name,size,creation_date,category_id,id]);
    console.log("result: "+results);
    console.table(results);
    connection.end();
}
//create("stand 55","small","2025-01-3",3);

// update("no stand aqui","medium","2025-03-01",1,2);

testConnection();

export {
    getAll,
    getByID,
    remove,
    create,
    update
}

