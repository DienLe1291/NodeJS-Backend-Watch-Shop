import BrandService from '../services/brand.service';

// @route GET /api/brand/:id
// @desc get a brand by id
// @access public
exports.getBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const data = await BrandService.findById(brandId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route GET /api/brand
// @desc get all brands
// @access public
exports.getAllBrands = async (req, res) => {
    try {
        const data = await BrandService.findAll();

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route POST /api/brand
// @desc create a new brand
// @access protected (admin)
exports.create = async (req, res) => {
    if (!req.body.name || !req.file) {
        return res.status(400).json({
            success: false,
            message: 'Tên thương hiệu và hình ảnh không thể bỏ trống'
        })
    }

    try {
        const name = req.body.name;
        const image = req.file.path;
        const data = await BrandService.create(name, image);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route PUT /api/brand/:id
// @desc update a brand
// @access protected (admin)
exports.update = async (req, res) => {
    try {
        const name = req.body.name;
        const image = req.file?.path;
        const brandId = req.params.id;
        
        const data = await BrandService.update(name, image, brandId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}

// @route DELETE /api/brand/:id
// @desc delete a brand by id
// @access protected (admin)
exports.delete = async (req, res) => {
    try {
        const brandId = req.params.id;
        
        const data = await BrandService.delete(brandId);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ'
        })
    }
}