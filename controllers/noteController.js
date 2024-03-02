import Notes from "../models/noteModel.js"


const noteCtrl = {
    getNotes: async(req, res)=>{
        try{
            const notes = await Notes.find({user_id: req.user.id})
            res.json(notes)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createNotes: async(req, res)=>{
        try{
            const {title, content, date} = req.body
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            })
            await newNote.save()
            res.status(200).json({msg: "Note Successfully created"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteNote: async(req, res)=>{
        try{
            await Notes.findByIdAndDelete(req.params.id)
            res.json({msg: "Note Successfully deleted"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateNote: async(req, res)=>{
        try{
            const{title, content, date}=req.body;
            await Notes.findOneAndUpdate({_id: req.params.id}, {title, content, date})
            res.json({msg: "Note Successfully updated"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getNote: async(req, res)=>{
        try{
            const note = await Notes.findById(req.params.id)
            res.json(note)

        }catch(err){
            return res.status(500).json({msg: err.message})
        }

    }
}

export default noteCtrl