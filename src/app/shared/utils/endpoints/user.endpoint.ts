import { PATH_SERVICE } from "@core/constants/constants";
import { environment } from "src/environments/environment";

export class UserEndpoint {
  public static GetUsers= `${environment.supabaseUrl}${PATH_SERVICE.userList}`;
  public static GetUsersPagination= `${environment.supabaseUrl}${PATH_SERVICE.userListPagination}`;
  public static GetUserbyId = `${environment.supabaseUrl}${PATH_SERVICE.userId}{userId}`;
  public static AddUser = `${environment.supabaseUrl}${PATH_SERVICE.userAdd}`;  
  public static UpdateUser = `${environment.supabaseUrl}users/{userId}`; // verificar endpoint
  public static DeleteUser = `${environment.supabaseUrl}users/{userId}`; // verificar endpoint
}
