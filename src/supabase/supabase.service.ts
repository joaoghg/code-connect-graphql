import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: ReturnType<typeof createClient>;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('SUPABASE_URL ou SUPABASE_KEY não definidos');
    }

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async createSignedUploadUrl(slug: string) {
    const { data, error } = await this.client.storage.from('videos').createSignedUploadUrl(slug);

    if (error) {
      throw new Error(`Falha ao gerar URL de upload: ${error.message}`);
    }

    return data;
  }

  createPublicUrl(slug: string) {
    const { data } = this.client.storage.from('videos').getPublicUrl(slug);
    return data.publicUrl;
  }
}
