export const postData = async (url, data, method = "POST") => {
    console.log({url,data,method})
    return
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      throw new Error(error.message || "An unknown error occurred.");
    }
  };
  