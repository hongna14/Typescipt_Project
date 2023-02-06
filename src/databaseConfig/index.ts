// import { Pool } from "pg";

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "coffeeshop_management",
//   password: "postgres",
//   port: 5436,
//   // connectionString:
//   //   "postgres://lpsibgqv:w6iHc94AolqhTnHw0TBGKRkI9y04M3la@satao.elephantsql.com/lpsibgqv",
// });

// pool
//   .connect()
//   .then(() => {
//     console.log("✅ Successfully connect to PostgreSQL");
//   })
//   .catch((err) => {
//     console.log("Connect to PostgreSQL failed: ", err);
//   });

// // Code của doc
// // pool.query("SELECT NOW()", (err, res) => {
// //   console.log(err, res);
// //   pool.end();
// // });

// // custom cái hàm thực thi query để khỏi viết lại nhìu lần



// // export async function executeQuery(sqlQuery: string, params: any[]) {
// //   try{
// //     const query = await pool.query(sqlQuery, params);
// //     console.log("Executed query successfully!")
// //   }
// //   catch(e){
// //     console.log("Executed fail: ",e)
// //   }
// // };


// export  async function getMany(sqlQuery: string) {
//   try{
//     const query= await pool.query(sqlQuery)
//     return query.rows;
//   }
//   catch(e){
//     console.log("Query fail: ",e)
//     return []
//   }
// };

// export async function getOne(sqlQuery: string) {
//   try{
//     const query= await pool.query(sqlQuery)
//     return query.rows[0];
//   }
//   catch(e){
//     console.log("Query fail: ",e)
//   }
// };
