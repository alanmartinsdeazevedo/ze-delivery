/**
 * Contem as fun es de controle da API de Rota de Entregas.
 * 
 * @author Alan Martins de Azevedo
 * @version 1.0.0
 */
let pedidos = []; // Pedidos cadastrados
let rotas = []; // Rotas cadastradas

/**
 * Retorna a lista de pedidos cadastrados
 * 
 * @param {Object} req - Requisicao
 * @param {Object} res - Resposta
 */
function getPedidos(req, res) {
    res.json(pedidos);
}

/**
 * Cria um novo pedido
 * 
 * @param {Object} req - Requisicao
 * @param {Object} res - Resposta
 */
function createPedido(req, res) {
    // Extrai do corpo da Requisica os dados do pedido
    const { endereco, produto, quantidade } = req.body;
    
    // Cria um novo pedido com os dados recebidos
    pedidos.push({ endereco, produto, quantidade });
    
    // Retorna uma mensagem de sucesso com o status 201
    res.status(201).json({ message: 'Pedido criado com sucesso' });
}

/**
 * Retorna a lista de rotas cadastradas
 * 
 * @param {Object} req - Requisicao
 * @param {Object} res - Resposta
 */
function getRotas(req, res) {
    res.json(rotas);
}

/**
 * Cria uma nova rota
 * 
 * @param {Object} req - Requisicao
 * @param {Object} res - Resposta
 */
function createRota(req, res) {
    // Extrai do corpo da Requisica os dados da rota
    const { latitude, longitude } = req.body;
    
    // Cria uma nova rota com os dados recebidos
    const novaRota = { id: rotas.length + 1, latitude, longitude };
    
    // Adiciona a rota  lista de rotas
    rotas.push(novaRota);
    
    // Retorna uma mensagem de sucesso com o status 201
    res.status(201).json({ message: 'Rota criada com sucesso', rota: novaRota });
}

/**
 * Verifica qual a melhor rota de entrega para os pedidos baseando-se na rota
 * cadastrada especificada pelo id.
 * 
 * @param {Object} req - Requisicao
 * @param {Object} res - Resposta
 */
function verificarMelhorRota(req, res) {
    // Extrai o id da rota da Requisicao
    const rotaId = parseInt(req.params.id);
    
    // Encontra a rota pela id
    const rota = rotas.find(r => r.id === rotaId);
    
    // Caso nao encontre a rota, retorna um erro 404
    if (!rota) {
        return res.status(404).json({ message: 'Rota n o encontrada' });
    }

    // Verifica qual a melhor rota de entrega
    const melhorRota = verificarMelhorRotaFunc(pedidos, rotas);
    
    // Retorna a melhor rota
    res.json(melhorRota);
}

/**
 * Verifica qual a melhor rota de entrega para os pedidos.
 * 
 * @param {Array} pedidos - Pedidos cadastrados
 * @param {Array} rotas - Rotas cadastradas
 * @returns {Object} A melhor rota
 */
function verificarMelhorRotaFunc(pedidos, rotas) {
    let melhorRota = null;
    let menorDistancia = Infinity;

    // Percorre todas as rotas
    rotas.forEach(rota => {
        let distanciaTotal = 0;
        
        // Percorre todos os pedidos
        pedidos.forEach(pedido => {
            // Calcula a distancia entre o pedido e a rota
            distanciaTotal += calcularDistancia(pedido.endereco, rota);
        });

        // Verifica se a distancia total da rota atual e menor que a menor distancia
        if (distanciaTotal < menorDistancia) {
            // Atualiza a menor distancia e a melhor rota
            menorDistancia = distanciaTotal;
            melhorRota = rota;
        }
    });

    // Retorna a melhor rota
    return melhorRota;
}

/**
 * Calcula a distancia entre dois enderecos.
 * 
 * @param {Object} endereco1 - Primeiro endereco
 * @param {Object} endereco2 - Segundo endereco
 * @returns {Number} A distancia entre os dois enderecos
 */
function calcularDistancia(endereco1, endereco2) {
    // Calcula a distancia entre os dois enderecos
    return Math.sqrt(
        Math.pow(endereco1.latitude - endereco2.latitude, 2) + 
        Math.pow(endereco1.longitude - endereco2.longitude, 2));
}

// Exporta as funcoes como modulo
module.exports = {
    getPedidos,
    createPedido,
    getRotas,
    createRota,
    verificarMelhorRota
};
