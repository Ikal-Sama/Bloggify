import jwt from 'jsonwebtoken'

export const generateToken = async(user, res) => {
    const payload = {
        id: user._id,  // Use only required fields
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    })

    return token;
}