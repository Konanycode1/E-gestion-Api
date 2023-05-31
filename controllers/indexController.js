class IndexController {
    static async dashboard(req, res){
        await res.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <title>form</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <form action="http://localhost:3000/api/login" method="post">
            <label for="email">
                <input type="email" name="email" id="email" value="abrahamkonan@gmail.com">
            </label>
            <label for="password">
                <input type="password" name="password" id="password" value="admin1">
            </label>
            <input type="submit" value="send">
        </form>
    </body>
</html>`);
    }
}

module.exports = IndexController;