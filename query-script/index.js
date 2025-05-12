const { default: axios } = require("axios");
const fs = require('fs')

const { POSTGRES_PASSWORD_FILE } = process.env;
const dbPassword = fs.readFileSync(POSTGRES_PASSWORD_FILE, { encoding: 'utf8' }).trim();

let api = "http://jsonplaceholder.typicode.com/users/1"

const getData = async () => {
    let res = await axios.get(api)
    const data = res.data;
    console.log(data)
    console.log(process.env)
    const knex = require('knex')({
        client: 'pg',
        connection: {
            host: process.env.Db_HOST,
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: dbPassword
        }
    })
    try {
        await knex('userdata').insert({
            id: data.id,
            phone: data.phone,
            name: data.name,
            email: data.email
        })
        console.log('add succesfull')
    } catch (err) {
        console.log("errr", err)
    }
    knex.destroy()
}

getData()



console.log('test', "sssssssss")