'use server'

import { revalidatePath } from 'next/cache';

interface UpdateTaskStatusParams {
  taskId: number;
  statusId: number;
}

export async function updateTaskStatus({ taskId, statusId }: UpdateTaskStatusParams) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
      body: JSON.stringify({ status_id: statusId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update task status');
    }

    revalidatePath('/');
    revalidatePath(`/tasks/${taskId}`);

  } catch (error) {
    console.error('Error updating task status:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
}