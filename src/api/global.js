import { nanoid } from 'nanoid';
import { supabase } from '../api/supabase-client';

export const uploadImageAndGetPublicUrl = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${nanoid()}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from('todo_images')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.log('Upload Error:', uploadError); 
    throw uploadError 
  };

  const { data, error } = supabase.storage
    .from('todo_images')
    .getPublicUrl(filePath);

  if (error) throw error;
  console.log('Public URL Data:', data);
  return data.publicUrl;
};
