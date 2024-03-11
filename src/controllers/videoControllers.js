import Video from "../models/video"

// Video.find({}, (error, videos) => {}); // 이제는 지원하지 않는 callback 함수

export const home = async (req, res) => { 
  try {
    const videos = await Video.find({});
    return  res.render("home", { pageTitle: "Home", videos});
  } catch(error) {
      return res.render("server-error", error)
   }
  };

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if(video === null) {
    return res.render("404", {pageTitle: "Video not found!"});
  }
  return res.render("watch", {pageTitle: `Watching`, video: video});
}

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", {pageTitle: "Video not found!"});
  }
  return res.render("edit", {pageTitle: `Edit: ${video.title}`, video});
}

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video`});
}
 
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: hashtags.split(",").map(word=>`#${word}`),
      meta: {
        views: 0,
        rating: 0,
      }
    })
    return res.redirect("/");
  } catch(error) {
    return res.render("upload", 
    { pageTitle: "Upload Video",
      errorMessage: error._message,
    }) ;
  }
}