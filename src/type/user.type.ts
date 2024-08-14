type TUser = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isDeleted: boolean;
  isVerified: boolean;
  verificationCode: number;
  verificationExpires: number;
  passwordHistory: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
