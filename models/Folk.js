

import mongoose from 'mongoose'

const FolkSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
        text: true
    },
    image: {
        type: "string",
        required: true
    },
    votes: {
        type: "number",
        required: true
    }
})
FolkSchema.index({ name: 'text' })
export default mongoose.models.Folk || mongoose.model('Folk', FolkSchema)

