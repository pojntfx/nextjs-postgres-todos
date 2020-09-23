import postgres from "postgres";

const query = async (...queryString) => {
  const sql = postgres({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const result = await sql(...queryString);

  await sql.end();

  return result;
};

export default query;
