import { Error } from './error';
import { Content } from './content';

export interface BaseResponse {
  success: boolean;
  error: Error;
  result: Content;
}
