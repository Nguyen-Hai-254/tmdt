import Course from "../Models/CourseModel.js";


class CourseController {
    static handleCreateCourse = async (req, res) => {
        try {
            const { name, image, time, description, price, benefit, commitment, category } = req.body;
            if (!name || !image || !category) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }

            const course = await Course.create({
                name, image, time, description, price, benefit, commitment, category, user: req.user._id
            });
            await course.save()

            return res.status(200).json({
                message: 'Post a successful course',
                data: {
                    _id: course._id,
                    name: name,
                    image: image,
                    price: course.price
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

    static handleGetAllCourseByChef = async (req, res) => {
        try {
            const findAllCourse = await Course.find({
                user: req.user._id,
                active: true
            }).sort({ updatedAt: -1 })

            return res.status(200).json({
                message: 'Post a successful course',
                data: findAllCourse
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleGetCourseByChef = async (req, res) => {
        try {
            if (!req.query._id) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }
            const findCourse = await Course.findById(req.query._id).populate({ path: 'foodList' })

            return res.status(200).json({
                message: 'OK',
                data: findCourse
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleGetCourseById = async (req, res) => {
        try {
            if (!req.query._id) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }
            const findCourse = await Course.findOne({
                _id: req.query._id,
                active: true
            }).populate({ path: 'user', select: '_id name' })
                .populate({ path: 'foodList' })

            return res.status(200).json({
                message: 'OK',
                data: findCourse
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleEditCourseByChef = async (req, res) => {
        console.log(req.query);
        try {
            const courseId = req.query._id
            const { name, image, time, description, price, benefit, commitment, category } = req.body;
            if (!courseId || !name || !image || !category) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }

            const findCourse = await Course.findById(courseId)

            if (!findCourse) {
                return res.status(404).json({
                    message: 'Food is not exits!'
                })
            }

            findCourse.name = name
            findCourse.image = image
            if (description) findCourse.description = description
            if (time) findCourse.time = time
            if (price) findCourse.price = price
            if (benefit) findCourse.benefit = benefit
            if (commitment) findCourse.commitment = commitment
            findCourse.category = category

            await findCourse.save()

            return res.status(200).json({
                message: 'Update course successful!',
                data: findCourse
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleGetCourseByCategory = async (req, res) => {
        try {
            if (!req.body.category) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }
            const num = req.body.num ?? 3
            const page = req.body.page ?? 1

            const findCourse = await Course.find({
                category: req.body.category,
                active: true
            }).skip(num * (page - 1)).limit(num)
                .sort({ view: -1, updatedAt: -1 })
                .populate({ path: 'user', select: '_id name' })
                .select('-description -benefit -commitment')

            const count = await Course.countDocuments({
                category: req.body.category,
                active: true
            })

            return res.status(200).json({
                message: 'OK',
                data: {
                    data: findCourse,
                    page: Math.ceil(count / num)
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
    static handleGetAllCourse = async (req, res) => {
        try {
            const findCourse = await Course.find({
                active: true
            })

            const count = await Course.countDocuments({
                active: true
            })

            return res.status(200).json({
                message: 'OK',
                data: {
                    data: findCourse
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
    static handleAddFoodToCourse = async (req, res) => {
        try {
            if (!req.query._id || !req.body.foodList) {
                return res.status(404).json({
                    message: 'Missing input parameter!'
                })
            }

            const findCourse = await Course.findById(req.query._id);

            if (!findCourse) {
                return res.status(404).json({
                    message: 'Course is not exist!'
                })
            }

            findCourse.foodList = req.body.foodList;
            await findCourse.save()

            return res.status(200).json({
                message: 'You have successfully added the dish to the course',
                data: findCourse
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }

    static handleGetAllCourseByAdmin = async (req, res) => {
        try {
            const findAll = await Course.find({}).sort({ creatAt: -1 }).populate({ path: 'user', select: '_id name email telephone' })

            return res.status(200).json({
                message: 'OK',
                data: findAll
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    }
}

export default CourseController