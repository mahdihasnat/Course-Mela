import axios from "axios";
import { IMAGE_EXTENSION } from "../../shared/StringConstant";
import { FILE_SERVER_URL } from "../../shared/urls";
import { LOG_CAUGHT_ERR, LOG_RESPONSE } from "../../shared/utils";
import joinUrl from "../../utils/url";
import { fileAuthorizedHeader } from "../../shared/Header";

class fileService {
  getFile(location) {
    return axios.get(joinUrl(FILE_SERVER_URL, location));
  }

  saveFile(file, fileId, fileExtension = IMAGE_EXTENSION) {
    const formData = new FormData();
    const fileName = fileId + "." + fileExtension;
    formData.append("file", file);
    formData.append("fileName", fileName);
    return axios.post(joinUrl(FILE_SERVER_URL, "uploadFile"), formData, {
      headers: fileAuthorizedHeader(),
    });
  }
}

export default new fileService();
