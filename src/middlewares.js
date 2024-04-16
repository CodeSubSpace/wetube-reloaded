export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const protectorMiddleware = (req, res, next) => {
    // user가 loggedIn 상태라면 요청을 계속하게 됨
    if (req.session.loggedIn) {
        next();
    // user가 loggedIn 상태가 아니라면 로그인 페이지로 redirect
    } else {
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/")
    }
}