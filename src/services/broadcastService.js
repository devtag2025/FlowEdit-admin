import { createClient } from "@/lib/supabase/client";
export const BroadcastService = {

  async getAll() {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("broadcasts")
      .select(`
        *,
        profiles (
          first_name,
          last_name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  async getById(id) {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("broadcasts")
      .select(`
        *,
        profiles (
          first_name,
          last_name
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async create(formData) {
    const supabase = createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw new Error(authError.message);

    const payload = {
      title: formData.title,
      content: formData.content,
      audience: formData.recipients,
      priority: formData.priority,
      status: formData.isScheduled ? "scheduled" : "sent",
      scheduled_for: formData.isScheduled
        ? new Date(`${formData.scheduleDate}T${formData.scheduleTime}`).toISOString()
        : null,
      sent_at: !formData.isScheduled ? new Date().toISOString() : null,
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from("broadcasts")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, updates) {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("broadcasts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async remove(id) {
    const supabase = createClient();

    const { error } = await supabase
      .from("broadcasts")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
    return true;
  },

  async incrementViews(id) {
    const supabase = createClient();

    const { error } = await supabase.rpc("increment_broadcast_views", {
      broadcast_id: id,
    });

    if (error) throw new Error(error.message);
    return true;
  },
};