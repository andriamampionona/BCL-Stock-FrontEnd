import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const getAllUser = async (bearerData: string) => {
  try {
    const response = await axios.get(`${apiUrl}/utilisateur`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });

    // console.log("RESPNSE "+response)
    if (response.data) {

      // console.log(response.data)///
      
      return response.data;
        
    }else{

        return {Erreur: "Impossible ...."};

    }
} catch (error) {
    console.error('Error loading users:', error);
  }

}


export const getUserByID = async (id: string, bearerData: string) => {
  try {
    const response = await axios.get(`${apiUrl}/utilisateur/id/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });

    if (response.data) {
    
      return response.data;
        
    }else{

        return null;

    }
} catch (error) {
    console.error('Error updating user:', error);
    throw error;
    
    //return {Erreur: "Erreur lors de l' accès au donnée"}

  }

}

export const updateUser = async (userId: string, data: any, bearerData: string) => {
  try {
    const response = await axios.put(`${apiUrl}/modification/${userId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string, bearerData: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/suprimer/${userId}`, {
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
    console.error('Error updating user:', error);
    // throw error;
    return {"Erreur": "Erreur lors de l' accès au donnée"}

  }
};

export const addUser = async ( data: any, bearerData: string) => {
  try {
    const response = await axios.post(`${apiUrl}/inscription`, data, {
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
    console.error('Error adding user:', error);
    // throw error;
    return {"Erreur": "Erreur lors de l' accès au donnée"}
}
};

