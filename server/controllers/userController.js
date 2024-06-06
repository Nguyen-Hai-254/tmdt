import User from "../Models/UserModel.js";
import { userRole } from "../utils/enum.js";
import generateToken from "../utils/generateToken.js";
import { errorReponse, reponseFunction } from "../utils/reponse.js"


class UserController {
    static handleRegister = async (req, res) => {
        try {
            const { name, username, email, password, telephone, sex, role, description, certification } = req.body;
            console.log('this', certification)
            if (!name || !username || !email || !password || !telephone) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }

            const findUsername = await User.findOne({ username });
            if (findUsername) {
                return res.status(400).json('Username already exists!');
            }

            const user = await User.create({
                name, username, email, password, telephone, sex, role
            });
            
            if (role === userRole.chef) {
                user.isChef = { description, certification }
            }
            await user.save()

            return res.status(200).json({
                message: 'Account registered successfully',
                data: {
                    _id: user._id,
                    role: user.role,
                    token: generateToken(user._id)
                }
            })
            // return reponseFunction('OK', 200, data)`
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }
}

export default UserController;