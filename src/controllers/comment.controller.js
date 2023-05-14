import CommentService from '../services/comment.service';

// @route GET /api/comment/:id
// @desc get comment by id
// @access private
exports.getComment = async (req, res) => {
    try {
        const data = await CommentService.findById(req.params.id);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route GET /api/comment
// @desc get all comments or by watch
// @access public
exports.getAllComments = async (req, res) => {
    try {
        const watchId = req.body.watchId;
        const data = await CommentService.findAll(watchId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route POST /api/comment
// @desc create a new comment
// @access private
exports.create = async (req, res) => {
    if (!req.body.content || !req.body.rate) {
        return res.status(400).json({
            success: false,
            message: 'Không tìm thấy nội dung bình luận và đánh giá sản phẩm'
        })
    }

    if (!req.body.watchId){
        return res.status(400).json({
            success: false,
            message: 'Không tìm thấy sản phẩm'
        })
    }

    try {
        const payload = {
            content: req.body.content,
            rate: req.body.rate,
            image: req.file?.path,
            watchId: req.body.watchId,
            userId: req.userId
        }
        const data = await CommentService.create(payload);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route PUT /api/comment/:id
// @desc update comment
// @access private
exports.update = async (req, res) => {
    try {
        const payload = {
            content: req.body.content,
            rate: req.body.rate,
            image: req.file?.path
        }
        const data = await CommentService.update(payload, req.params.id, req.userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route DELETE /api/comment/:id
// @desc delete comment
// @access private
exports.delete = async (req, res) => {
    try {
        const data = await CommentService.delete(req.params.id, req.userId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}
