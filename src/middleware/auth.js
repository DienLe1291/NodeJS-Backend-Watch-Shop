import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Không tìm thấy mã truy cập'
        }) 
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.userId = decoded.userId;
        req.roleId = decoded.roleId;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({
            success: false,
            message: 'Mã truy cập không hợp lệ'
        })
    }
}

const verifyAdmin = (req, res, next) => {
    if (req.roleId === 0) {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: 'Người dùng không có quyền thực hiện chức năng này'
        })
    }
}

export { verifyToken, verifyAdmin };