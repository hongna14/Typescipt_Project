const { Client } = require('pg')
 
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "coffeeshop_management",
    password: "postgres",
    port: 5436,
})


client.connect((err:any) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})


export async function executeQuery(sqlQuery: string, params: any[]) {
  const query = await client.query(sqlQuery, params);
  console.log("Executed query successfully!")
  };

export  async function getMany(sqlQuery: string) {
  try{
    const query= await client.query(sqlQuery)
    return query.rows;
  }
  catch(e){
    console.log("Query fail: ",e)
    return []
  }
};

export async function getOne(sqlQuery: string,params: any[]) {
  try{
    const query= await client.query(sqlQuery,params)
    return query.rows[0];
  }
  catch(e){
    console.log("Query fail: ",e)
  }
};