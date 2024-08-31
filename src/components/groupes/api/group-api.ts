import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateGroupe = async (groupeId: string, data: any, bearerData: string) => {
  try {
    const response = await axios.put(`${apiUrl}/groupe/${groupeId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating groupe:', error);
    throw error;
  }
};

export const getAllGroupe = async (bearerData: string) => {
  try {
    const response = await axios.get(`${apiUrl}/groupe`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });

    if (response.data) {
    
      return response.data;
        
    }else{

        return {Erreur: "Impossible ...."};

    }
} catch (error) {
    console.error('Error updating groupe:', error);
    throw error;
    return {Erreur: "Erreur lors de l' accès au donnée"}

  }

}


export const getGroupeByID = async (id: string, bearerData: string) => {
  try {
    const response = await axios.get(`${apiUrl}/groupe/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
        
      },
    });

    if (response.data) {
    
      return response.data;
        
    }else{

        return {Erreur: "Impossible ...."};

    }
} catch (error) {
    console.error('Error updating groupe:', error);
    throw error;
    return {Erreur: "Erreur lors de l' accès au donnée"}

  }

}


export const deleteGroupe = async (groupeId: string, bearerData: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/groupe/${groupeId}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });

    if (response.data?.Message) {
    return response.data;
        
    }else if(response.data?.Erreur){
      return response.data;
    }
    else {

        return {Erreur: "Impossible ...."};

    }
} catch (error) {
    console.error('Error updating groupe:', error);
    // throw error;
    return {"Erreur": "Erreur lors de l' accès au donnée"}

  }
};

export const addGroupe = async ( data: any, bearerData: string) => {
  try {
    const response = await axios.post(`${apiUrl}/groupe`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });
    if (response.data?.Message) {
    return response.data;
        
    }else{

        return {Erreur: "Impossible ...."};

    }

  } catch (error) {
    console.error('Error adding groupe:', error);
    // throw error;
    return {"Erreur": "Erreur lors de l' accès au donnée"}
}
};

