const { Pool } = require('pg');

const PG_URI =
'postgres://rrscrbpl:isrL6N2W4N4W4Iq_gFZUg6BNI_JmY_pI@rajje.db.elephantsql.com/rrscrbpl';

const pool = new Pool({
  connectionString: PG_URI,
});

const db = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text,params, callback);
  }
};

module.exports = db;