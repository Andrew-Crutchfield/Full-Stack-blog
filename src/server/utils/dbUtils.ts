import pool from '../config/db'; 

export async function executeSelectQuery(sql: string, params?: Array<string | number>): Promise<any[]> {
    try {
        const [results] = await pool.query(sql, params);
        return results as any[];
    } catch (error) {
        console.error('Error executing query:', error);
        throw error; 
    }
}

export async function executeModifyQuery(sql: string, params?: Array<string | number>): Promise<any> {
    try {
        const [result] = await pool.query(sql, params);
        return result; 
    } catch (error) {
        console.error('Error executing query:', error);
        throw error; 
    }
}