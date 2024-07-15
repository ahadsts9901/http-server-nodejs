// database
const todos: string[] = [];

// server
export const app = (req: any, res: any) => {

    res.setHeader('Content-Type', 'application/json');

    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1];
    const route = `${urlParts[0]}/${urlParts[1]}/${urlParts[2]}/${urlParts[3]}`

    switch (route) {
        case '/api/v1/todo':
            switch (req.method) {

                // get

                case "GET":

                    res.writeHead(200, { 'Content-Type': 'application/json' });

                    res.end(
                        JSON.stringify({
                            message: 'hello world',
                            todos: todos
                        })
                    );

                    break;

                // post
                case "POST":

                    let postBody: any = '';

                    req.on('data', (chunk: any) => {
                        postBody += chunk.toString(); // convert buffer to string
                    });

                    req.on('end', () => {

                        const { todo } = JSON.parse(postBody);

                        todos.unshift(todo);

                        res.writeHead(200, { 'Content-Type': 'application/json' });

                        res.end(
                            JSON.stringify({
                                message: 'todo added',
                                todos: todos
                            })
                        );

                    });

                    break;

                // put
                case "PUT":

                    let putBody = '';

                    req.on('data', (chunk: any) => {
                        putBody += chunk.toString(); // convert buffer to string
                    });

                    req.on('end', () => {

                        const { todo } = JSON.parse(putBody);

                        if (id !== -1) {

                            todos[id] = todo;

                            res.writeHead(200, { 'Content-Type': 'application/json' });

                            res.end(
                                JSON.stringify({
                                    message: 'todo updated',
                                    todos: todos
                                })
                            );

                        } else {
                            res.writeHead(404, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'todo not found' }));
                        }

                    });

                    break;

                // delete
                case "DELETE":

                    if (id !== -1) {

                        todos.splice(id, 1);

                        res.writeHead(200, { 'Content-Type': 'application/json' });

                        res.end(
                            JSON.stringify({
                                message: 'todo deleted',
                                todos: todos
                            })
                        );

                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'todo not found' }));
                    }

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
};