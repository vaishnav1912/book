import commonAPI from "./commenAPI"
import serverURL from "./severURL"
//upload book details
export const saveBookAPI = async(bookDetails) => {
        return await commonAPI("POST", `${serverURL}/uploadBooks`, bookDetails)
    }
    //getapi

export const getAllBookAPI = async() => {
    return await commonAPI("GET", `${serverURL}/uploadBooks`, "")
}

//delet api
export const removeBookAPI = async(id) => {
    return await commonAPI("DELETE", `${serverURL}/uploadBooks/${id}`, {})
}

// updateapi
export const updateBookAPI = async(id, updatedDetails) => {
    return await commonAPI("PUT", `${serverURL}/uploadBooks/${id}`, updatedDetails);
};