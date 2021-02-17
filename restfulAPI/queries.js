const Pool = require('pg').Pool
const pool = new Pool({
    host: "postgres",
    database: "amddata",
    user: "postgres",
    password: "docker",
    port: 5432,
})

const getAllData = (request, response) => {
    pool.query('SELECT * FROM public."data" ORDER BY time ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDataByTime = (request, response) => {
    const time = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public."data" WHERE time = $1', [time], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getAllData,
    getDataByTime,
}
