import {Todo} from "../entities/todo.entity";

export interface CreateTodoDTO {
    title: string;
}

export interface TodoResponseDTO {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

export function toTodoResponseDTO(todo: Todo): TodoResponseDTO {
    return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
    }
}
