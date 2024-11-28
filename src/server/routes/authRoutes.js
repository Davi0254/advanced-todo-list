import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool, JWT_SECRET } from '../config/config.js';
// import { TaskModel } from './models';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    const existingUser = await pool.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );

    if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Usuario já existe' });
    }

    try {
        const password_hash = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, password_hash]
        )

        res.json({
            message: 'Usuario registrado com sucesso',
            redirectTo: '/login',
        });


    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Erro ao registrar usuario' });
    };
})

router.post('/login', async (req, res) => {
    try {
        const { user, password } = req.body;
        console.log(req.body);

        const result = await pool.query(
            'SELECT username, password_hash FROM users WHERE username = ?',
            [user]);

        const { username, password_hash } = result[0];

        if (!username || username === 0) {
            return res.status(400).json({ error: 'Usuario nao encontrado' });
        }

        // if (!password || password === 0) {
        //     return res.status(400).json({ error: 'Forneça uma senha valida' });
        // }

        const isMatch = await bcrypt.compare(password, password_hash);

        if (!isMatch) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '10m' })
        console.log(username, token)
        res.status(200).json({ message: 'Login bem-sucedido', user: username, token });

    } catch (error) {
        console.error('Erro bo login:', error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
})

router.post('/addtask', async (req, res) => {
    const { username, description, completed } = req.body;

    try {
        const userQuery = await pool.query('SELECT id FROM users WHERE username = ?', [username]);

        if (userQuery.length === 0) {
            return res.status(404).json({ error: 'Usuario nao encontrado' });
        }

        const user_id = userQuery[0].id;

        const taskQuery = await pool.query(
            'INSERT INTO tasks (user_id, description, completed) VALUES (?, ?, ?)',
            [user_id, description, completed || false]
        );

        res.status(201).json({
            message: 'Tarefa adicionada com sucesso',
            taskID: taskQuery.insertId.toString(),
        });

    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        res.status(500).json({ error: 'Erro ao adicionar tarefa' });
    }
});

router.get('/tasks', async (req, res) => {
    const { username } = req.query;
    // console.log(username)

    if (!username) {
        return res.status(400).json({ error: 'Nome de usuario nao fornecido' })
    }

    try {
        const userQuery = await pool.query('SELECT id FROM users WHERE username = ?', [username]);

        if (userQuery.length === 0) {
            return res.status(404).json({ error: 'Usuario nao encontrado' });
        }

        const user_id = userQuery[0].id.toString();

        const tasksQuery = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [user_id]);

        if (tasksQuery.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa encontrada' });
        }

        const bgIntTask = tasksQuery.map(task => {
            const taskCopy = { ...task };
            for (const key in taskCopy) {
                if (typeof taskCopy[key] === 'bigint') {
                    taskCopy[key] = taskCopy[key].toString();
                }
            }
            return taskCopy;
        })

        res.status(200).json({
            tasks: bgIntTask,
        })

    } catch (error) {
        console.error('Erro ao obter tarefa:', error);
        res.status(500).json({ error: 'Erro ao obter tarefas' });
    }
});

router.delete('/delete', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'id nao encontrado' });
    }

    try {
        const results = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Internal server eror', error)
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.put('/updatetask/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    console.log(req.body);

    try {
        const result = await pool.execute(
           'UPDATE tasks SET description = ? WHERE id = ?',
           [description, id]
        );
        console.log(result);

        if (result === 0 || !result) {
            return res.status(404).json({ error: 'Tarefa nao encontrada' });
        }

        return res.status(200).json({ message: 'tarefa atualizada'});

       
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

export { router };
