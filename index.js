import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let blogPosts = [
  { 
      id: 1, 
      title: "The Rise of Artificial Intelligence in Healthcare", 
      content: "Artificial intelligence (AI) is revolutionizing healthcare by providing new tools, insights, and solutions to improve patient care, streamline operations, and enhance research. From predictive analytics to robotic surgery, AI is transforming every aspect of the healthcare industry."
  },
  {
      id: 2,
      title: "The Future of Work: How Automation is Shaping Industries",
      content: "Automation and robotics are reshaping industries and redefining the future of work. With advancements in artificial intelligence, machine learning, and robotics, tasks that were once performed by humans are now being automated, leading to increased efficiency, productivity, and innovation.",
  },
  {
      id: 3,
      title: "Cybersecurity Trends: Emerging Threats and Solutions",
      content: "As technology continues to evolve, so do cybersecurity threats. From ransomware attacks to data breaches, organizations are facing increasingly sophisticated cyber threats. To combat these challenges, cybersecurity professionals are adopting new strategies, tools, and technologies to safeguard data and protect against cyber attacks.",
  }
];


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/blog/:id", (req, res) => {
  const postId = parseInt(req.params.id); 
  const post = blogPosts.find((post) => post.id === postId); 

  res.render("blog.ejs", { post});
});

// Render the blog page
app.get("/blog", (req, res) => {
  res.render("blog", { blogPosts });
});

// Delete post
app.post("/delete-post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  blogPosts = blogPosts.filter((post) => post.id !== postId);
  res.redirect("/blog");
});

// Render edit form
app.get("/edit-post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find(post => post.id === postId);
  res.render("edit", { post });
});

// Handle edit post request
app.post("/edit-post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const postIndex = blogPosts.findIndex(post => post.id === postId);
  blogPosts[postIndex] = { id: postId, title, content };
  res.redirect("/blog");
});



app.get("/back", (req, res) => {
  res.render("home", { blogPosts });
});

// Create new post
app.post("/create-post", (req, res)=>{
   const{ title, content} = req.body;
   const newPostId = blogPosts.length + 1;
   blogPosts.push({ id: newPostId, title, content});
   res.redirect("/");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
