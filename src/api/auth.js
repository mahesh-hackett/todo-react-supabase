import { supabase } from "./supabase-client";

export const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    console.log(data.user)
    return data.user;
};

export const signIn = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        console.log(data, error);
        if (error) throw error;
        return data.user;
    } catch (error) {
        throw error;
    }

};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
};
