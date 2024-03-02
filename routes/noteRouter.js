import express from "express";

import auth from "../middleware/auth.js";
import noteCtrl from "../controllers/noteController.js";

const router = express.Router()

router.route("/")
.get(auth, noteCtrl.getNotes)
.post(auth, noteCtrl.createNotes)

router.route("/:id")
.get(auth, noteCtrl.getNote)
.put(auth, noteCtrl.updateNote)
.delete(auth, noteCtrl.deleteNote)

export default router