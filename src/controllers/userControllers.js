import User from "../models/User"
import bcrypt from "bcrypt"

export const getJoin = (req, res) => res.render(
    "join", 
    {pageTitle: "Join"}
);

export const postJoin = async(req, res) => {
    const {name, email, username, password1, password2, location} = req.body;
    const exists = await User.exists({ $or: [{ username }, { email }]});
    const pageTitle = "Join"
    if (exists) {
        return res.statue(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken."
        });
    }
    
    if(password1 !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match",
        })
    }
    try {

        await User.create({ //이 중괄호를 쓰지 않으면 인자와 관련된 오류가 발생함.
            name, 
            email, 
            username, 
            password: password1, 
            location,
        })
        res.redirect("/login");
    } catch(error) { 
        console.log(error)
        return res.status(400).render("join", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        })
    }
}
;

export const edit = (req, res) => res.send("Edit user")
export const remove = (req, res) => res.send("Delete user")

export const getLogin = (req, res) => res.render("login", {
    pageTitle: "Login"
})

export const postLogin = async(req, res) => {
    const {username, password1} = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({username});
    if(!user) {
        return res.status(400).render("login", {
            pageTitle: pageTitle,
            errorMessage: "An account with this username does not exists."
        })
    }
    const ok = await bcrypt.compare(password1, user.password);
    if(!ok) {
        return res.status(400).render("login", {
            pageTitle: pageTitle,
            errorMessage: "Wrong password."
    });
    }
    return res.redirect("/");

}

export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("see");