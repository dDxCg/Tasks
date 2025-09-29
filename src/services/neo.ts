import neo4j from "neo4j-driver";

const uri = process.env.NEO4J_URI || "bolt://localhost:7687";
const user = process.env.NEO4J_USER || "neo4j";
const password = process.env.NEO4J_PASSWORD || "password";
const db_name = process.env.NEO4J_DATABASE || "neo4j";

export const driver = neo4j.driver(uri!, neo4j.auth.basic(user!, password!));

export const getSession = (database: string = db_name) => {
  return driver.session({ database });
};
