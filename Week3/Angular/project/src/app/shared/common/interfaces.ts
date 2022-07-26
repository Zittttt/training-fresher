export interface SubmitLoginDto {
  username: string;
  password: string;
}

export interface ResponseBodyDto<D> {
  statusCode: number;
  message: string;
  content: D;
  dateTime: string;
  messageConstants?: any;
}

export interface LoginDto {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  accessToken: string;
}
