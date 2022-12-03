import express from "express";
import {
  addPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from "../controller/post-controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", addPost);
router.delete("/:id", deletePostById);
router.put("/:id", updatePostById);

export default router;
