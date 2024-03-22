import User from "../models/User"

export const getJoin = (req, res) => res.render(
    "join", 
    {pageTitle: "Join"}
);

export const postJoin = async(req, res) => {
    const {name, email, username, password1, password2, location} = req.body;
    const exists = await User.exists({ $or: [{ username }, { email }]});
    if (exists) {
        return res.render("join", {
            pageTitle: "join",
            errorMessage: "This username/email is already taken."
        });
    }
    
    if(password1 !== password2) {
        return res.render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match",
        })
    }

    await User.create({ //이 중괄호를 쓰지 않으면 인자와 관련된 오류가 발생함.
        name, 
        email, 
        username, 
        password1, 
        location,
    })
    res.redirect("/login");
};

export const edit = (req, res) => res.send("Edit user")
export const remove = (req, res) => res.send("Delete user")
export const login = (req, res) => res.send("Login")
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("see");