const createSessionCookie = (res, token, refreshToken) => {
    res.cookie('access', token, {
        httpOnly: true,
        secure: false,
        maxAge: 10 * 60 * 1000, // 10 minutes
        sameSite: 'Lax',
    });
    if (refreshToken) {
        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'Lax',
        });
    }
}
module.exports = {
    createSessionCookie
}