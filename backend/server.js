import express from "express"
import { connection, collectionName } from "./dbconfig.js"
import cors from "cors"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

const port = 5000;
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.post("/signup", async (req,res)=>{
    const userData = req.body;
    if(userData.email && userData.password){
        const db = await connection();
        const collection = await db.collection("users")
        const result = await collection.insertOne(userData)
        if(result.acknowledged) {
            const tokenData = { _id: result.insertedId, email: userData.email};
            jwt.sign(tokenData,"Google", {expiresIn: "5d"}, (error,token)=>{
                if(error) 
                    return res.status(500).send({ success: false, message: "jwt error"});

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 5 * 24 * 60 * 60 * 1000,
                });
                res.send({ success: true, message: "signup done"})
            })
        } else{
            res.send({ success: false, message: "signup failed"})
        }
    }
})

app.use((req, res) => {
    res.status(404).send("Not found")
})
// Start server
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
