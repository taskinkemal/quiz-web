export interface User {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly pictureUrl: string;
    readonly isVerified: boolean;
  }