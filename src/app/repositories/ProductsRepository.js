const db = require('../../database');

class ProdutcsRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT products.*, categories.name AS category_name
    FROM products
    JOIN categories ON categories.id = products.category_id
    ORDER BY products.price DESC
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
     SELECT products.*, categories.name AS category_name
     FROM products
     JOIN categories ON categories.id = products.category_id
     WHERE products.id = $1
    `, [id]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query('SELECT * FROM products WHERE name = $1', [name]);
    return row;
  }

  async create({
    name, price, unit, category_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO products(name, price, unit, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, price, unit, category_id]);

    return row;
  }

  async update(id, {
    name, price, unit, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE products
      SET name = $1, price = $2, unit = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, price, unit, category_id, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM products WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ProdutcsRepository();
