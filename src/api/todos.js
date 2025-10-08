import { supabase } from "./supabase-client";

export const fetchTodos = async (email) => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("email", email)
    .is("deleted_at", null)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
};

export const deleteTodo = async (id) => {
  const timestamp = new Date().toISOString();

  const { error } = await supabase
    .from("todos")
    .update({ deleted_at: timestamp })
    .eq("id", id);

  if (error) throw error;
  return id;
};

export const editTodo = async (todo) => {
  const { id, text, is_completed, description, image_url } = todo;
  // Build update object only with provided fields
  const updatePayload = { };
  if (text !== undefined) updatePayload.text = text;
  if (is_completed !== undefined) updatePayload.is_completed = is_completed;
  if (description !== undefined) updatePayload.description = description;
  if (image_url !== undefined) updatePayload.image_url = image_url;

  const { data, error } = await supabase
    .from("todos")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export const insertTodo = async (newTodo) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([{ ...newTodo, is_completed: false }])
    .select()
    .single();
  if (error) throw error;
  return data;
}