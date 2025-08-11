import { SupabaseClient } from "@supabase/supabase-js";

export const uploadFile = async (
  fileName: string, 
  file: any, 
  supabase: SupabaseClient, 
  replace: boolean = false,
  maxSizeBytes: number = 50 * 1024 * 1024
): Promise<{status: boolean, message: string}> => {
  try {
    // File size validation
    if (file.buffer.length > maxSizeBytes) {
      return {
        status: false,
        message: `File exceeds maximum size of ${maxSizeBytes / 1024 / 1024}MB`
      };
    }

    // Optional file replacement
    if (replace) {
      const { error: deleteError } = await supabase.storage
        .from("ride-hailing-system")
        .remove([fileName]);

      if (deleteError) {
        console.error('File replacement failed:', deleteError);
        return {
          status: false,
          message: deleteError.message
        };
      }
    }

    // Upload file
    const { error, data } = await supabase.storage
      .from("ride-hailing-system")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true 
      });

    if (error) {
      console.error('Upload failed:', error);
      return {
        status: false,
        message: error.message
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("ride-hailing-system")
      .getPublicUrl(fileName);

    return { 
      status: true, 
      message: publicUrl 
    };

  } catch (error) {
    console.error('Unexpected upload error:', error);
    return {
      status: false,
      message: error instanceof Error ? error.message : 'Unknown upload error'
    };
  }
};


export const deleteFile = async (fileName: any, supabase: any): Promise<{status: boolean, message: string}> => {
  const { data, error } = await supabase.storage
    .from("ride-hailing-system")
    .remove([fileName])

  if (error) return {
    status: false,
    message: error.message
  };

  return { status: true, message: "file deleted successfully." };
};