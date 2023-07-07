const ProdutcsRepository = require('../repositories/ProductsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ProdutController {
  async index(request, response) {
    // Listar todos os produtos
    const products = await ProdutcsRepository.findAll();

    response.json(products);
  }

  async show(request, response) {
    // Obter um produtc
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid id' });
    }

    const products = await ProdutcsRepository.findById(id);

    if (!products) {
      return response.status(404).json({ error: 'Product not found' });
    }

    response.json(products);
  }

  async store(request, response) {
    // Criar novo product
    const {
      name, price, unit, category_id,
    } = request.body;

    if (!name || !category_id) {
      return response.status(400).json({ error: 'Name and category is required' });
    }

    if (!isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    if (!price) {
      response.status(400).json({ error: 'Price is required' });
    }

    // const productExixts = await ProdutcsRepository.findByName(name);
    // if (productExixts) {
    //   return response.status(400).json({ error: 'There is already a product with that name' });
    // }

    const product = await ProdutcsRepository.create({
      name,
      price,
      unit: unit || null,
      category_id,
    });

    response.status(201).json(product);
  }

  async update(request, response) {
    // Editar um product
    const { id } = request.params;
    const {
      name, price, unit, category_id,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid product id' });
    }

    if (!name || !category_id) {
      return response.status(400).json({ error: 'Name and category is required' });
    }

    if (!price) {
      return response.status(400).json({ error: 'Price is required' });
    }

    if (!isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    const productExixts = await ProdutcsRepository.findById(id);
    if (!productExixts) {
      return response.status(404).json({ error: 'Product not found' });
    }

    // const productByName = await ProdutcsRepository.findByName(name);
    // if (productByName && productByName.id !== id) {
    //   return response.status(400).json({ error: 'There is already a product with that name' });
    // }

    const product = await ProdutcsRepository.update(id, {
      name,
      price,
      unit: unit || null,
      category_id,
    });

    response.json(product);
  }

  async delete(request, response) {
    // Deletar um product
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid product id' });
    }

    await ProdutcsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ProdutController();
