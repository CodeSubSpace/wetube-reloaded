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
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");

}

export const startGithubLogin = (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl)
}

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
        user = await User.create({
          name: userData.name,
          username: userData.login,
          avatarUrl: userData.avatar_url,
          email: emailObj.email,
          password: "",
          socialOnly: true,
          location: userData.location,
    });
  }
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
}

export  const getEdit = (req, res) => {
  return res.render("edit-profile", {pageTitle : "Edit Profile"})
}

export const postEdit = async (req, res) => {
  // 아래는 const id = req.session.user.id와 같은 구문
  const {
    session: {
      user: { _id },
    },
    body: {name, email, username, location}, file
  } = req;
  console.log(file)
  const updateUser = await User.findByIdAndUpdate(
    _id, 
    { 
      avatarUrl: file ? file.path : avatarUrl,
      name, 
      email,
      username, 
      location, 
    },
    { new: true },
);
  
  req.session.user = updateUser;
  return res.redirect("/users/edit")
}

export const getChangePassword = (req, res) => {
  if(req.session.user.socialOnly == true ) {
    return redirect("/")}

  return res.render("user/change-password", { pageTitle: "Change Password" })
}

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: {oldPassword, newPassword, newPasswordConfirmation },
  } = req;

  const ok = await bcrypt.compare(oldPassword, password);
  if (!ok) {
    //status(400)을 통해 비번이 틀린 경우에는 브라우저가 알아서 비번을 저장하지 못하도록 설정
    return res.status(400).render("user/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect!"
    })
  }

  if (newPassword !== newPasswordConfirmation) {
    //status(400)을 통해 비번이 틀린 경우에는 브라우저가 알아서 비번을 저장하지 못하도록 설정
    return res.status(400).render("user/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The Password does not match the confirmation"
    })
  }
  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save()

  // send notification : 비밀번호 변경 시 logout 설정
  req.session.user.password = user.password;
  return res.redirect("/users/logout")
}

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).render("404", {pageTitle: "User not found"});
  }
  return res.render("user/profile", { 
    pageTitle : `${user.name}`, 
    user 
  });
}