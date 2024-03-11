import Video from "../models/video"

// Video.find({}, (error, videos) => {}); // 이제는 지원하지 않는 callback 함수

export const home = async (req, res) => { 
  try {
    const videos = await Video.find({});
    return  res.render("home", { pageTitle: "Home", videos: []});
  } catch(error) {
      return res.render("server-error", error)
   }
  };

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", {pageTitle: `Watching`});
}

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", {pageTitle: `Editing:`,});
}

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video`});
}
 
export const postUpload = (req, res) => {
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title: title,
    description: description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map(word=>`#${word}`),
    meta: {
      views: 0,
      rating: 0,
    }
  })
  console.log(video);
  return res.redirect("/");
}