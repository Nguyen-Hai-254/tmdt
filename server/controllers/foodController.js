import Food from "../Models/FoodModel.js";

class FoodController {
    static handleCreateFood = async (req, res) => {
        try {
            const { name, image, description, time, ingredient, processing, make, kind, isFree } = req.body;
            if (!name || !image || !ingredient || !processing || !make) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }

            const food = await Food.create({
                name: name, image, description, time, ingredient, processing, make, kind, user: req.user._id, isFree
            });
            await food.save()
            
            return res.status(200).json({
                message: 'Post a successful dish',
                data: {
                    _id: food._id,
                    name: name,
                    image: image
                }
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleGetAllFoodByChef = async (req, res) => {
        try {
            const findAllFood = await Food.find({
                user: req.user._id,
                active: true
            }).sort({ updatedAt: -1 })

            return res.status(200).json({
                message: 'OK',
                data: findAllFood
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleGetFoodByChef = async (req, res) => {
        try {
            if (!req.query._id) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }
            const findFood = await Food.findById(req.query._id)

            return res.status(200).json({
                message: 'OK',
                data: findFood
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleGetFoodById = async (req, res) => {
        try {
            if (!req.query._id) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }
            const findFood = await Food.findOne({
                _id: req.query._id,
                active: true
            })

            return res.status(200).json({
                message: 'OK',
                data: findFood
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleEditFoodByChef = async (req, res) => {
        try {
            const foodId = req.query._id
            const { name, image, description, time, ingredient, processing, make, kind, isFree } = req.body;
            if (!foodId || !name || !image || !ingredient || !processing || !make) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }

            const findFood = await Food.findById(foodId)

            if (!findFood) {
                return res.status(404).json({
                    message: 'Food is not exits!'
                })
            }

            findFood.name = name
            findFood.image = image
            if (description) findFood.description = description
            if (time) findFood.time = time
            findFood.ingredient = ingredient
            findFood.processing = processing
            findFood.make = make
            if (kind) findFood.kind = kind
            findFood.isFree = isFree

            await findFood.save()

            return res.status(200).json({
                message: 'Update food successful!',
                data: findFood
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleSearchFoodByChef = async (req, res) => {
        try {
            const keyword = req.query.keyword

            if (keyword) {
                const findFood = await Food.find({
                    name: { $regex: new RegExp(keyword, "i") },
                    user: req.user._id
                }).limit(4).select('_id name image kind')

                return res.status(200).json({
                    message: 'OK',
                    data: findFood
                })
            }
            else {
                const findFood = await Food.find({ user: req.user._id }).limit(4).select('_id name image kind')

                return res.status(200).json({
                    message: 'OK',
                    data: findFood
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }
}

export default FoodController