class IndexController {
    static async dashboard(req, res){
        await res.send('Bienvenue chez Pros-Petro');
    }
}

module.exports = IndexController;