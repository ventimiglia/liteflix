export const uploadMovie = async ({ image, title }: { image: File, title: string }): Promise<string> => {
  try {

    const formData = new FormData();
    formData.append('file', image);
    formData.append('public_id', title)
    
    const response = await fetch("/api/movies", {
      method: "POST",
      body: formData,
    })
 
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (e: any) {
    console.error(e.message);
    return "";
  }
};