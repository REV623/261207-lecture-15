import { readUsersDB } from '../../../backendLibs/dbLib'
import jwt from 'jsonwebtoken'

export default function login(req, res) {
    if(req.method === "POST"){
        const {username,password} = req.body;
        if(typeof username !== "string" || username.length === 0 || typeof password !== "string" || password.length === 0)
        return res.status(400).json({ok: false, message: "Username or password cannot be empty"})

        const users = readUsersDB()
        const foundUser = users.find((x) => x.username === username && x.password === password)
        if(!foundUser) return res.status(400).json({ok: false, message: "Invalid Username or Password"})

        const secret = process.env.JWT_SECRET
        const token = jwt.sign({username: foundUser}, secret, {expiresIn: "1800s"})

        return res.json({ok: true, token})
    }
}
