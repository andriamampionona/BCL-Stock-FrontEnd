import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateArticle = async (articleId: string, data: any,  bearerData: string) => {
  try {
    const response = await axios.put(`${apiUrl}/article/in/${articleId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " +bearerData,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};


export const deleteArticle = async (articleId: string,  bearerData: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/article/in/${articleId}`, {
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
    throw error;
    return {"Erreur": "Erreur lors de l' accès au donnée"}

  }
};

export const addArticle = async ( data: any,  bearerData: string) => {
  try {
    const response = await axios.post(`${apiUrl}/article/in`, data, {
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
    console.error('Error adding article:', error);
    throw error;
    return {"Erreur": "Erreur lors de l' accès au donnée"}
}
};


// OUT OUT OUT OUT OUT

//Creation ..........
export const createOutArticle = async (articleId: string, data: any,  bearerData: string) => {
  try {
    const response = await axios.post(`${apiUrl}/article/out/${articleId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " +bearerData,
      },
    });
    
    
    if (response.data?.Message) {
    return response.data;
        
    }else if( response.data?.Erreur){

        return {Erreur: response.data?.Erreur};

    }

  } catch (error) {
    console.error('Error out article:', error);
    throw error;
  }
};


export const updateSelectPeriod = async (data: any, bearerData: string) => {

  try {
    
      const response = await axios.put(`${apiUrl}/periode/option`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " +bearerData,

      },
         
      });

      if (response.data?.Message) {
      return response.data;
    }

       
      } catch (error) {
        console.error("Erreur lors de la modification 'updateSelectPeriod' des données :", error);
      } 
}



export const getDataStockForChart = async (bearerData: string) => {

  try {
    
      const response = await axios.get(`${apiUrl}/article/stock/viewer-data`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " +bearerData,

      },
         
      });

      if (response.data) {
      return response.data;
    }

       
      } catch (error) {
        console.error("Erreur lors de l' accès aux données :", error);
      } 
}