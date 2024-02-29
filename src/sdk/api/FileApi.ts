import { WSAPI } from './WSApi';
export class FileApi extends WSAPI {
  getFile (id: string) {
    return this.instance.get(this.apiPath + '/FileManageMent/GetFolderInfo',
      { params: { id: id } }).then((result) => {
      return result.data;
    });
  }

  private static instance: FileApi;
  //* * 单例 */
  public static getInstance (): FileApi {
    if (FileApi.instance) { return FileApi.instance; } else {
      FileApi.instance = new FileApi();
      return FileApi.instance;
    }
  }
}
