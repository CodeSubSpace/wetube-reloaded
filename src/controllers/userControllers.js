export const getJoin = (req, res) => res.render(
    "join", 
    {pageTitle: "Join"}
);

export const postJoin = (req, res) => res.render(
    console.log(req.body),
    res.end()
);

export const edit = (req, res) => res.send("Edit user")
export const remove = (req, res) => res.send("Delete user")
export const login = (req, res) => res.send("Login")
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("see");