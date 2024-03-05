const { Pool } = require('pg');
// const config = require('../config');

const pool = new Pool({
    connectionString: 'postgres://alastor775:HjRWiCrDaVpyYliJ4vLwXmUOueWO081p@dpg-cnjkp6821fec73ajh010-a.oregon-postgres.render.com/despacho_juridico',
    ssl: true
});

async function todos(tabla) {
    try {
        const result = await pool.query(`SELECT * FROM ${tabla}`);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function uno(tabla, id) {
    try {
        const result = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`, [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function buscarPorNombre(tabla, nombre) {
    try {
        const result = await pool.query(`SELECT * FROM ${tabla} WHERE nombre = $1`, [nombre]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function agregar(tabla, data) {
    try {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data);
        const result = await pool.query(`INSERT INTO ${tabla} (${keys}) VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function actualizar(tabla, id, data) {
    try {
        const updates = Object.keys(data).map((key, index) => `${key} = $${index + 1}`);
        const values = Object.values(data);
        const result = await pool.query(`UPDATE ${tabla} SET ${updates.join(', ')} WHERE id = $${values.length + 1} RETURNING *`, [...values, id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function eliminar(tabla, id) {
    try {
        const result = await pool.query(`DELETE FROM ${tabla} WHERE id = $1`, [id]);
        return result.rowCount;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    buscarPorNombre,
    actualizar
};
