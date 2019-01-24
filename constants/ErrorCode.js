const ErrorCode = {
  // General errorCode:
  FAIL: {
    errorCode: 0,
    name: 'FAIL',
    message: 'Thất bại'
  },
  SUCCESSFUL: {
    errorCode: 2,
    name: 'SUCCESSFUL',
    message: 'Thành Công'
  },
  INVALID_TOKEN: {
    errorCode: 3,
    name: 'INVALID_TOKEN',
    message: 'Token không hợp lê'
  },
  DB_ERROR: {
    errorCode: 4,
    name: 'DB_ERROR',
    message: 'Lỗi Database'
  },
  DATA_DOES_NOT_NULL: {
    errorCode: 5,
    name: 'DATA_DOES_NOT_NULL',
    message: 'Dữ liệu không được rỗng'
  },
  // API Login
  FIRST_LOGGING: {
    errorCode: 100,
    name: 'FIRST_LOGGING',
    message: 'Lần đầu tiên đăng nhập'
  },
  NOT_REGISTER: {
    errorCode: 101,
    name: 'NOT_REGISTER',
    message: 'Không đăng nhập được'
  },
  // API SUBMIT Login errorCode
  MISSING_NAME: {
    errorCode: 200,
    name: 'MISSING_NAME',
    message: 'Thiếu trường name'
  },
  MISSING_FIRSTNAME: {
    errorCode: 200,
    name: 'MISSING_FIRSTNAME',
    message: 'Thiếu trường firstname'
  },
  MISSING_LASTNAME: {
    errorCode: 201,
    name: 'MISSING_LASTNAME',
    message: 'Thiếu trường lastname'
  },
  MISSING_PASSWORD: {
    errorCode: 202,
    name: 'MISSING_PASSWORD',
    message: 'Thiếu trường password'
  },
  MISSING_DATEOFBIRTH: {
    errorCode: 203,
    name: 'MISSING_DATEOFBIRTH',
    message: 'Thiếu trường dateofbirth'
  },
  MISSING_EMAIL: {
    errorCode: 204,
    name: 'MISSING_EMAIL',
    message: 'Thiếu trường email'
  },
  MISSING_OLDPASSWORD: {
    errorCode: 205,
    name: 'MISSING_OLDPASSWORD',
    message: 'Thiếu trường old password'
  },
  MISSING_NEWPASSWORD: {
    errorCode: 206,
    name: 'MISSING_NEWPASSWORD',
    message: 'Thiếu trường new password'
  },
  MISSING_IDREPRESENTATION: {
    errorCode: 207,
    name: 'MISSING_IDREPRESENTATION',
    message: 'Thiếu Id của hợp tác xã'
  },
  MISSING_TAXCODE: {
    errorCode: 208,
    name: 'MISSING_TAXCODE',
    message: 'Thiếu mã số thuế'
  },
  MISSING_IDTREE: {
    errorCode: 209,
    name: 'MISSING_IDTREE',
    message: 'Thiếu mã cây xoài'
  },
  MISSING_CATEGORY: {
    errorCode: 210,
    name: 'MISSING_CATEGORY',
    message: 'Thiếu loại cây xoài'
  },
  MISSING_DESCRIPTION: {
    errorCode: 211,
    name: 'MISSING_DESCRIPTION',
    message: 'Thiếu loại mô tả cây xoài'
  },
  MISSING_TIMESTAMP: {
    errorCode: 212,
    name: 'MISSING_TIMESTAMP',
    message: 'Thiếu loại timestamp'
  },
  MISSING_IDCOOPERATIVE: {
    errorCode: 213,
    name: 'MISSING_IDCOOPERATIVE',
    message: 'Thiếu ID hợp tác xã'
  },
  MISSING_IDBUYER: {
    errorCode: 214,
    name: 'MISSING_IDBUYER',
    message: 'Thiếu ID người mua'
  },
  MISSING_FIELD: {
    errorCode: 216,
    name: 'MISSING_FIELD',
    message: 'Thiếu trường một vài trường'
  },
  PRICE_MUST_BE_THAN_ZERO: {
    errorCode: 213,
    name: 'PRICE_MUST_BE_THAN_ZERO',
    message: 'Giá sản phẩm phải lớn hơn 0'
  },
  OLDPASSWORD_DOES_NOT_SAME_NEWPASSWORD: {
    errorCode: 221,
    name: 'OLDPASSWORD_DOES_NOT_SAME_NEWPASSWORD',
    message: 'Mật khẩu mới phải khác mật khẩu cũ'
  },
  EMAIL_EXIST: {
    errorCode: 50,
    name: 'EMAIL_EXIST',
    message: 'Email đã tồn tại.'
  },
  MANGOTREE_EXIST: {
    errorCode: 59,
    name: 'MANGOTREE_EXIST',
    message: 'Mangotree đã tồn tại.'
  },
  COOPERATIVE_EXIST: {
    errorCode: 62,
    name: 'COOPERATIVE_EXIST',
    message: 'Cooperative đã tồn tại.'
  },
  CAN_NOT_UPDATE_EMAIL: {
    errorCode: 51,
    name: 'CAN_NOT_UPDATE_EMAIL',
    message: 'Khổng được quyền update trường email.'
  },
  CAN_NOT_UPDATE_COOPERATIVE: {
    errorCode: 49,
    name: 'CAN_NOT_UPDATE_COOPERATIVE',
    message: 'Khổng được quyền update trường hợp tác xã.'
  },
  ALREADY_VERIFY: {
    errorCode: 52,
    name: 'ALREADY_VERIFY',
    message: 'Tài khoản đã được xác thực.'
  },
  DID_NOT_VERIFY: {
    errorCode: 53,
    name: 'DID_NOT_VERIFY',
    message: 'Tài khoản chưa được xác thực.'
  },
  REPRESENTATION_DID_NOT_VERIFY: {
    errorCode: 54,
    name: 'REPRESENTATION_DID_NOT_VERIFY',
    message: 'Người đại diện chưa được xác thực.'
  },
  CANT_NOT_FIND_REPRESENTATION: {
    errorCode: 55,
    name: 'CANT_NOT_FIND_REPRESENTATION',
    message: 'Không tìm thấy người đại diện.'
  },
  CANT_NOT_FIND_COOPERATIVE: {
    errorCode: 56,
    name: 'CANT_NOT_FIND_COOPERATIVE',
    message: 'Không tìm thấy hợp tác xã'
  },
  CANT_NOT_FIND_BUYER: {
    errorCode: 57,
    name: 'CANT_NOT_FIND_BUYER',
    message: 'Không tìm thấy thông tin người mua'
  },
  CAN_NOT_FIND_MANGOTREE: {
    errorCode: 58,
    name: 'CAN_NOT_FIND_MANGOTREE',
    message: 'Không tìm thấy thông tin cây'
  },
  INCORRECT_PASSWORD: {
    errorCode: 60,
    name: 'INCORRECT_PASSWORD',
    message: 'Mật khẩu không đúng.'
  },
  INCORRECT_TAXCODE: {
    errorCode: 61,
    name: 'INCORRECT_TAXCODE',
    message: 'Mã số thuế không đúng.'
  },
  // API
  INVALID_ID: {
    errorCode: 399,
    name: 'INVALID_ID',
    message: 'ID không hợp lệ'
  },
  INVALID_EMAIL: {
    errorCode: 400,
    name: 'INVALID_EMAIL',
    message: 'Email không hợp lệ'
  },
  INVALID_DATEOFBIRTH: {
    errorCode: 401,
    name: 'INVALID_DATEOFBIRTH',
    message: 'Ngày sinh không hợp lệ'
  },
  INVALID_TIMESTAMP: {
    errorCode: 402,
    name: 'INVALID_TIMESTAMP',
    message: 'Timestamp không hợp lệ'
  },

  // API GET_ONE_USER
  DO_NOT_ORDER: {
    errorCode: 11,
    name: 'DO_NOT_ORDER',
    message: 'User không có giao dịch mua cây nào'
  },
  USER_DOES_NOT_EXIST: {
    errorCode: 11,
    name: 'USER_DOES_NOT_EXIST',
    message: 'User không tồn tại'
  },
  MANGOTREE_DOES_NOT_EXIST: {
    errorCode: 12,
    name: 'MANGOTREE_DOES_NOT_EXIST',
    message: 'Mangotree không tồn tại'
  },

  COOPERATIVE_DOES_NOT_EXIST: {
    errorCode: 13,
    name: 'COOPERATIVE_DOES_NOT_EXIST',
    message: 'COOPERATIVE không tồn tại'
  }
}

export default ErrorCode
