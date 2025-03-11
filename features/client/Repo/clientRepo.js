import { ClientModel } from "../schema/clientSchema.js";
export const registerClient = async (client) => {
  try {
    const newClient = new ClientModel({
      name: client.name,
      email: client.email,
      phone: client.phone,
      qualification: client.qualification,
      message: client.message,
    });

    const clientSave = await newClient.save();

    return { message: "registration successful", client: clientSave };
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error code
      const duplicateKey = Object.keys(error.keyValue)[0];
      return { error: `${duplicateKey} already exists` };
    }
    console.error("Error adding document: ", error.message);
    return { error: "registration unsuccessful" };
  }
};

export const GetClients = async () => {
  console.log("in repo - get data");

  try {
    const clients = await ClientModel.find();
    return clients;
  } catch (error) {
    console.error("Error retrieving clients: ", error);
  }
};
