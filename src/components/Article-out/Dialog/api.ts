import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateOutArticle = async (articleId: string, data: any, bearerData: string) => {
  try {
    const response = await axios.put(`${apiUrl}/article/out/${articleId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " +bearerData,
      },
    });

    console.log(response)
    if (response.data) {
        return response.data;
        
    }else{

        return {Erreur: "Impossible frontend...."};

    }
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};



export const deleteOutArticle = async (articleId: string ,bearerData: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/article/out/${articleId}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " +bearerData,
      },
    });

    if (response.data?.Message) {
    return response.data;
        
    }else{

        return {Erreur: "Impossible ...."};

    }
} catch (error) {
    console.error('Error updating article:', error);
    // throw error;
    return {"Erreur": "Erreur lors de l' accès au donnée"}

  }
};
