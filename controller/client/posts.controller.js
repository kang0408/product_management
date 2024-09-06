const Posts = require("../../models/post.model");

module.exports.posts = async (req, res) => {
  const posts = await Posts.find({});

  const allPostTags = [];
  const filterTags = [];
  posts.forEach((post) => allPostTags.push(post.tags));

  allPostTags.flat().forEach((tag) => {
    const newTag = tag.charAt(0).toUpperCase() + tag.slice(1);
    if (!filterTags.includes(newTag)) filterTags.push(newTag);
  });

  console.log(filterTags);

  res.render("client/pages/posts/index", {
    pageTitle: "Trang blog",
    posts: posts,
    filterTags: filterTags,
  });
};
