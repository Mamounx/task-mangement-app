import { Schema, model, Document, NumberSchemaDefinition } from 'mongoose';
import { TaskDto } from '../dto/task.dto';

export const TaskSchema = new Schema<TaskDto>(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        description: {
            type: String,
            required: true,
            unique: false,
        },
        status: {
            type: String,
            required: true,
            unique: false,
        },
        createdAt: {
            type: Number,
            required: false,
            unique: true,
        },
        updatedAt: {
            type: Number,
            required: false,
            unique: true,
        },
    }    
 )

//  TaskSchema.pre('save', async (next: any) => {
//     const thisObj = this as any;
//     console.log(thisObj)
//     try {
//         if (!thisObj.isModified()) thisObj.updatedAt = Date.now();
//     } catch (e) {
//         return next(e)
//     }   
//  })

 const TaskModel = model<TaskDto>('tasks', TaskSchema);

 export default TaskModel;