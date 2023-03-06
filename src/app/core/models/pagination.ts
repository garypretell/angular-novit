export class Pagination {
  data: any[];
  size: any;
  numberOfElements: any;

  constructor(data: any, size: any, number: any) {
    {
      this.data = data;
      this.size = size || '';
      this.numberOfElements = number || '';
    }
  }
}
