import WatchService from '../services/watch.service';

// @route GET /api/watch/:id
// @desc get all watches
// @access public
exports.getWatch = async (req, res) => {
    try {
        const data = await WatchService.findById(req.params.id);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route GET /api/watch
// @desc get all watches
// @access public
exports.getAllWatches = async (req, res) => {
    try {
        const data = await WatchService.findAll();

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route GET /api/watch/brand/:id
// @desc get watches have same brand
// @access public
exports.getWatchByBrand = async (req, res) => {
    try {
        const data = await WatchService.findByBrand(req.params.id);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}


// @route POST /api/watch
// @desc create a new watch
// @access protected (admin)
exports.create = async (req, res) => {
    if (!req.body.name || !req.file) {
        return res.status(400).json({
            success: false,
            message: 'Tên sản phẩm và hình ảnh không thể bỏ trống'
        })
    }

    if (!req.body.brandId) {
        return res.status(400).json({
            success: false,
            message: 'Không tìm thấy thương hiệu của sản phẩm'
        })
    }

    try {
        const payload = {
            name: req.body.name,
            image: req.file.path,
            price: req.body.price,
            description: req.body.description,
            brandId: req.body.brandId
        }
        const data = await WatchService.create(payload);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route PUT /api/watch/:id
// @desc update watch
// @access protected (admin)
exports.update = async (req, res) => {
    try {
        const payload = {
            name: req.body.name,
            currentQuantity: req.body.currentQuantity,
            image: req.file?.path,
            price: req.body.price,
            description: req.body.description,
            brandId: req.body.brandId
        }
        const data = await WatchService.update(payload, req.params.id);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route DELETE /api/watch/:id
// @desc delete watch
// @access protected (admin)
exports.delete = async (req, res) => {
    try {
        const data = await WatchService.delete(req.params.id);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}
