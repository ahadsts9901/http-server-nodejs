// database
const todos = []

// server
export const app = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    switch (req.url) {

        case '/api/v1/todo':

            switch (req.method) {

                case "GET":

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(
                        {
                            message: 'hello world',
                            todos: todos
                        }));

                    break;

                case "POST":

                    let body = '';

                    req.on('data', (chunk) => {
                        body += chunk.toString(); // convert buffer to string
                    });

                    req.on('end', () => {

                        const { todo } = JSON.parse(body);

                        todos.unshift(todo)

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(
                            {
                                message: 'todo added',
                                todos: todos
                            }));

                    });
                    break;

                default:
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'route not found' }));
                    break;
            }

            break;

        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'route not found' }));
            break;

    }

}
